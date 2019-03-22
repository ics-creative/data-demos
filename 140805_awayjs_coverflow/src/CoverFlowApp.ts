///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="../libs/tweenjs/tweenjs.d.ts" />
///<reference path="../libs/easeljs/easeljs.d.ts" />
///<reference path="TouchManager.ts" />


module demo {
	import BitmapData = away.base.BitmapData;
	import BitmapDataChannel = away.base.BitmapDataChannel;
	import Rectangle = away.geom.Rectangle;
	import Point = away.geom.Point;
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
	import ImageTexture = away.textures.ImageTexture;
	import RequestAnimationFrame = away.utils.RequestAnimationFrame;
	import DisplayObject = away.base.DisplayObject;
	import DisplayObjectContainer = away.containers.DisplayObjectContainer;
	import Mesh = away.entities.Mesh;
	import AssetLibrary = away.library.AssetLibrary;
	import LoaderEvent = away.events.LoaderEvent;
	import URLRequest = away.net.URLRequest;

	/**
	 * Cover Flow サンプル (Away3D TypeScript版)
	 * @author Yasunobu Ikeda
	 * @class demo.CoverFlowApp
	 */
	export class CoverFlowApp extends View {

		private URL_GRADATION:string = "../imgs/gradation.png";
		private URL_BG:string = "../imgs/bg.png";

		/** 平面の横幅 */
		private ITEM_W:number = 256;
		/** スライドの個数 */
		private MAX_SLIDE:number = 44;
		/** 平面の縦幅 */
		private ITEM_H:number = 256;
		/** 読み込む素材の最大値 */
		private LOAD_MAX:number = 46;
		/** 現在のスライドID */
		private currentPage:number = 0;
		/** 平面のX座標の間隔 */
		private MARGIN_X:number = 80;

		/** 平面を格納する配列 */
		private _cardList:Card[] = [];
		private _urlList:string[] = [];
		private _inputElement:HTMLInputElement;
		private _loadedCount = 0;

		constructor() {
			super(new DefaultRenderer());

			// イベントの無効化
			var touchManager = new utils.TouchManager();
			if(touchManager.isSupportedTouch){
				document.getElementById("rangeSliderContainer").classList.add("touch");
			}

			(<DefaultRenderer>this.renderer).antiAlias = 4;

			// Import Assets
			AssetLibrary.addEventListener(
				LoaderEvent.RESOURCE_COMPLETE,
				(e)=> this.onResourceComplete(e));

			for (var i = 0; i < this.MAX_SLIDE; i++) {
				var url = "../imgs/" + i + ".jpg";
				AssetLibrary.load(new URLRequest(url));
				this._urlList[i] = url;
			}

			// 他のパーツ
			AssetLibrary.load(new URLRequest(this.URL_GRADATION));
			AssetLibrary.load(new URLRequest(this.URL_BG));
		}


		private onResourceComplete(event:LoaderEvent) {
			this._loadedCount++;
			if (this._loadedCount < this.LOAD_MAX)
				return;

			document.body.style.display = "block";
			this.initialize3D();
		}

		//----------------------------------------------------------
		//
		//   Function
		//
		//----------------------------------------------------------

		/** 読み込み完了後 */
		private initialize3D():void {

			// カード用ライト
			var light1 = new away.entities.PointLight();
			light1.diffuse = 1.2;
			light1.specular = 0.0;
			light1.ambient = 0.0;
			light1.radius = 600;
			light1.fallOff = 800;
			light1.z = - 200;
			var lightPicker1 = new StaticLightPicker([light1]);

			// 背景用ライト
			var light2 = new DirectionalLight();
			light2.diffuse = 0.0;
			light2.specular = 0.0;
			light2.ambient = 1.0;
			var lightPicker2 = new StaticLightPicker([light2]);



			// グラデーションマスク
			var imageGradation = <ImageTexture> AssetLibrary.getAsset(this.URL_GRADATION);
			var bmdGradation = new BitmapData(256, 256, true, 0x0);
			bmdGradation.draw(imageGradation.htmlImageElement);

			var ZERO = new Point();
			// 平面の作成
			var prefab = new PrimitivePlanePrefab(this.ITEM_W, this.ITEM_H, 2, 2, false, true);

			// Planeの作成
			for (var i = 0; i < this.MAX_SLIDE; i++) {

				var texture = <ImageTexture> AssetLibrary.getAsset(this._urlList[ i ]);
				var bmdBase = new BitmapData(256, 256, true, 0x0);
				bmdBase.draw(texture.htmlImageElement);

				// 反射面の作成
				var bmdReflection:BitmapData = new BitmapData(256, 256, true, 0x0);
				bmdReflection.draw(bmdBase);
				bmdReflection.copyChannel(bmdGradation,
					bmdGradation.rect,
					ZERO,
					BitmapDataChannel.ALPHA,
					BitmapDataChannel.ALPHA)

				var textureOpt:BitmapTexture = new BitmapTexture(bmdReflection);

				// マテリアルの作成
				var material = new TriangleMethodMaterial(texture);
				var materialOpt = new TriangleMethodMaterial(textureOpt);
				materialOpt.alphaBlending = true;
				materialOpt.alpha = 0.2;
				material.lightPicker = lightPicker1;
				materialOpt.lightPicker = lightPicker1;
				material.smooth = true;
				materialOpt.smooth = true;

				// カード
				var containerCard = new Card();

				// 上面
				var planeTop:Mesh = <Mesh> prefab.getNewObject();
				planeTop.material = material;
				containerCard.addChild(planeTop);

				// 反射面
				var planeBottom:Mesh = <Mesh> prefab.getNewObject();
				planeBottom.material = materialOpt;
				planeBottom.rotationZ = 180;
				planeBottom.rotationY = 180;
				planeBottom.y = -this.ITEM_H - 1;
				containerCard.addChild(planeBottom);

				// 3Dシーンに追加
				this.scene.addChild(containerCard);

				// 配列に参照の保存
				this._cardList[ i ] = containerCard;
			}
			//  カメラの位置
			this.camera.z = -700;

			// 背景の生成
			var textureBg = <ImageTexture> AssetLibrary.getAsset(this.URL_BG);
			var prefabBg = new PrimitivePlanePrefab(3000, 1000, 1, 1, false);
			prefabBg.material = new TriangleMethodMaterial(textureBg);
			prefabBg.material.lightPicker = lightPicker2;
			var meshBg = prefabBg.getNewObject();
			meshBg.z = 500;
			this.scene.addChild(meshBg);


			// 初期のページ表示
			this.moveSlide(this.MAX_SLIDE / 2);

			// レンダリング
			var raf = new RequestAnimationFrame(this.enterFrameHandler, this);
			raf.start();

			// リサイズ制御
			window.addEventListener("resize", (event) => this.resizeHandler(event));
			this.resizeHandler(null); // サイズをウインドウにフィットさせる


			// インプット要素の制御
			this._inputElement = <HTMLInputElement> document.getElementById("rangeSlider");
			this._inputElement.onchange = (event) => this.scrollbar_changeHandler(event);
			this._inputElement.oninput = (event) => this.scrollbar_changeHandler(event);

			// CreateJSのセットアップ(60fpsで稼働するように)
			createjs.Ticker.setFPS(60);
			createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		}

		/**
		 * スクロールが動いたときのイベント
		 */
		private scrollbar_changeHandler(event):void {
			var val:number = Number(this._inputElement.value);
			// スクロールバーの値からページIDの計算
			var nextId = Math.round(val * (this.MAX_SLIDE - 1));
			// ページ遷移
			this.moveSlide(nextId);
		}

		/**
		 * スライドを移動
		 * @param id    スライドのID
		 */
		private moveSlide(id:number):void {
			// 遷移先が現在のスライド番号と同じであれば処理を終了
			if (this.currentPage == id)
				return;

			var array:any[] = [];

			for (var i = 0; i < this.MAX_SLIDE; i++) {
				// 移動値を初期化
				var targetX:number = 0;
				var targetZ:number = 0;
				var targetRot:number = 0;

				// X座標の計算
				targetX = this.MARGIN_X * (i - id);

				// 中央のスライド画像より左側のもの
				if (i < id) {
					targetX -= this.ITEM_W * 0.6;
					targetZ = this.ITEM_W + 10 * (id - i);
					targetRot = -45;
				}
				// 中央のスライド画像より右側のもの
				else if (i > id) {
					targetX += this.ITEM_W * 0.6;
					targetZ = this.ITEM_W - 10 * (id - i);
					targetRot = +45;
				}
				// 中央のスライド画像
				else {
					targetX += 0;
					targetZ = 0;
					targetRot = 0;
				}

				// 対象のPlaneの参照をpに格納
				var p:Card = this._cardList[ i ];

				// ちょっと強引に実装
				if (p.timeline)
					p.timeline.setPaused(true);

				var timeline = new createjs.Timeline([
					createjs.Tween
						.get(p)
						.to({rotationY: targetRot}, 900, createjs.Ease.cubicOut),
					createjs.Tween
						.get(p)
						.to({x: targetX, z: targetZ}, 1800, createjs.Ease.cubicOut)
				], {}, {});
				timeline.gotoAndPlay(0);
				p.timeline = timeline;
			}

			this.currentPage = id;
		}

		/** レイアウト処理(リサイズ対応も兼ねる) */
		private resizeHandler(event):void {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		}

		/** エンターフレームイベント */
		private enterFrameHandler(e = null):void {
			this.render();
		}
	}

	/**
	 * カバーフローのカード
	 * @class demo.Card
	 */
	class Card extends DisplayObjectContainer {
		public timeline:createjs.Timeline;
	}
}


// 初期化のコードは各種HTMLに記述しています