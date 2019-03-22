///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="TouchManager.ts" />

module demo {
	import BitmapData = away.base.BitmapData;
	import BitmapDataChannel = away.base.BitmapDataChannel;
	import Rectangle = away.geom.Rectangle;
	import Point = away.geom.Point;

	/**
	 * RGBを分解するためのクラスです。
	 * @class demo.RgbDecomposer
	 */
	export class RgbDecomposer extends away.events.EventDispatcher {

		private _result:BitmapData[];
		private _originalImage:HTMLImageElement;

		/**
		 * 画像を読み込みます。
		 * @method load
		 */
		load(url:string) {
			// <img>タグのImageオブジェクトを作って画像読み込み
			this._originalImage = new Image();
			this._originalImage.onload = () => this.onLoadImage();
			this._originalImage.src = url;
		}

		private onLoadImage() {
			// RGBに分解
			this.createRGBChannel(this._originalImage);

			// イベントを発行
			this.dispatchEvent(new Event(Event.COMPLETE));
		}

		private createRGBChannel(image:HTMLImageElement):void {
			// 変数
			var w:number = image.width;
			var h:number = image.height;
			var p:Point = new Point(0, 0);
			var rect = new Rectangle(0, 0, w, h);

			// ImageエレメントをBitmapDataに転写
			var bmd = new BitmapData(w, h);
			bmd.draw(image);

			// 保存先を準備
			var r = new BitmapData(w, h, true, 0xFF000000);
			var g = new BitmapData(w, h, true, 0xFF000000);
			var b = new BitmapData(w, h, true, 0xFF000000);

			// 各チェンネルをコピー
			b.copyChannel(bmd, rect, p, BitmapDataChannel.BLUE, BitmapDataChannel.BLUE);
			r.copyChannel(bmd, rect, p, BitmapDataChannel.RED, BitmapDataChannel.RED);
			g.copyChannel(bmd, rect, p, BitmapDataChannel.GREEN, BitmapDataChannel.GREEN);

			this._result = [r, g, b];
		}

		/**
		 * 分解された結果を受け取ります。
		 * @method getResult
		 */
		public getResult():BitmapData[] {
			return this._result;
		}
	}


	import MouseEvent = away.events.MouseEvent;
	import Event = away.events.Event;
	import BlendMode = away.base.BlendMode;
	import DefaultRenderer = away.render.DefaultRenderer;
	import View = away.containers.View;
	import PrimitivePlanePrefab = away.prefabs.PrimitivePlanePrefab;
	import DirectionalLight = away.entities.DirectionalLight;
	import StaticLightPicker = away.materials.StaticLightPicker;
	import TriangleMethodMaterial = away.materials.TriangleMethodMaterial;
	import BitmapTexture = away.textures.BitmapTexture;
	import RequestAnimationFrame =  away.utils.RequestAnimationFrame;
	import OrthographicProjection = away.projections.OrthographicProjection;
	import ContextGLProfile = away.stagegl.ContextGLProfile;

	/**
	 * 分解されたRGBを表示するクラスです。
	 * @class demo.World
	 */
	export class World extends View {

		private CAMERA_DISTANCE:number = 5000;
		private CAMERA_SPEED:number = 0.1;

		private _isMouseDown:boolean = false;
		private _lastMouseX:number;
		private _lastMouseY:number;
		private _lastPanAngle:number;
		private _lastTiltAngle:number;
		private _anglePan:number = 180;
		private _angleTilt:number = 0;
		private currentMouseX:number = 0;
		private currentMouseY:number = 0;

		/**
		 * コンストラクタ
		 * @param bitmapDataList {Array} BitmapData クラスが格納された配列
		 * @param mode {String} レンダリング方式を選択します。
		 * @constructor
		 */
		constructor(bitmapDataList:BitmapData[], mode = "auto") {

			super(new away.render.DefaultRenderer(false, ContextGLProfile.BASELINE, mode));

			// 平行投影を利用
			var projection = new OrthographicProjection();
			projection.far = 60000;
			projection.projectionHeight = 1500;
			this.camera.projection = projection;

			// イベント登録
			var touchManager = new utils.TouchManager();
			touchManager.enableTouch();
			touchManager.addListener(document);

			document.addEventListener("mousedown", (e) => this.onMouseDown(e));
			document.addEventListener("mouseup", (e) => this.onMouseUp(e));
			document.addEventListener("mousemove", (e) => this.onMouseMove(e));
			window.addEventListener("resize", (e) => this.onResize(e));
			this.onResize(null); // サイズをウインドウにフィットさせる


			// 平面のプレハブ(テンプレート)を作成
			var prefab = new PrimitivePlanePrefab(1024, 512, 1, 1, false, true);

			// ライトを作成します

			var light1 = new DirectionalLight();
			light1.ambient = 1.0;
			light1.specular = 0.0;
			light1.diffuse = 0.0;
			var lightPicker = new StaticLightPicker([light1]);


			var max = bitmapDataList.length;
			for (var i = 0; i < max; i++) {
				var bmpData:BitmapData = bitmapDataList[i];

				// テクスチャに変換
				var texture = new BitmapTexture(bmpData);
				// マテリアルを作成
				var material = new TriangleMethodMaterial(texture);
				material.lightPicker = lightPicker;// マテリアルにライトを適用します

				// 平面を作成
				var obj = <away.entities.Mesh> prefab.getNewObject();
				obj.material = material;
				obj.z = 500 * (i - (max - 1) / 2);
				this.scene.addChild(obj);

				// 加算で重ねる
				material.blendMode = BlendMode.ADD;
			}

			var raf = new RequestAnimationFrame(this.onEnterFrame, this);
			raf.start();
		}

		/** RequestAnimationFrame のイベントハンドラーです。 */
		private onEnterFrame(time:number):void {


			// マウスが押されてるかどうかでカメラの座標を動かす
			if (this._isMouseDown) {
				this._anglePan += ((this.currentMouseX - this._lastMouseX) / this.width * 180 + this._lastPanAngle - this._anglePan) * this.CAMERA_SPEED;
				this._angleTilt += ((this.currentMouseY - this._lastMouseY) / this.height * 180 + this._lastTiltAngle - this._angleTilt) * this.CAMERA_SPEED;
			}
			else {
				this._anglePan += (180 - this._anglePan) * this.CAMERA_SPEED;
				this._angleTilt += (0 - this._angleTilt) * this.CAMERA_SPEED;
			}

			// カメラを配置
			this.camera.x = Math.sin(this._anglePan * Math.PI / 180) * this.CAMERA_DISTANCE;
			this.camera.z = Math.cos(this._anglePan * Math.PI / 180) * this.CAMERA_DISTANCE;
			this.camera.y = Math.sin(this._angleTilt * Math.PI / 180) * this.CAMERA_DISTANCE;

			// カメラを原点に向ける
			this.camera.lookAt(new away.geom.Vector3D(0, 0, 0));

			this.render();
		}


		/** マウスを押したタイミングのイベントハンドラーです。 */
		private onMouseDown(event):void {
			this._lastPanAngle = this._anglePan;
			this._lastTiltAngle = this._angleTilt;
			this._lastMouseX = event.clientX;
			this._lastMouseY = event.clientY;
			this._isMouseDown = true;
		}

		/** マウスを動かしたタイミングのイベントハンドラーです。 */
		private onMouseMove(event):void {
			this.currentMouseX = event.clientX;
			this.currentMouseY = event.clientY;
		}

		/** マウスを離したタイミングのイベントハンドラーです。 */
		private onMouseUp(event):void {
			this._isMouseDown = false;
		}

		/** サイズをフィットさせる */
		private onResize(event:UIEvent) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		}
	}


}




// 初期化のコードは各種HTMLに記述しています