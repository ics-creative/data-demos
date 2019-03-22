///<reference path="../libs/three.d.ts" />
///<reference path="../libs/tweenjs/tweenjs.d.ts" />
///<reference path="../libs/easeljs/easeljs.d.ts" />

module demo {

	/**
	 * Cover Flow サンプル (Three.js版)
	 * @author Yasunobu Ikeda
	 * @class demo.CoverFlowApp
	 */
	export class CoverFlowApp {

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
		private _inputElement:HTMLInputElement;

		private camera:THREE.PerspectiveCamera;
		private scene:THREE.Scene;
		private renderer:THREE.WebGLRenderer;

		constructor() {
			this.initMobile();
			this.init3D();
			this.initialize3D();
		}

		initMobile(){
			// イベントの無効化
			var touchManager = new utils.TouchManager();
			if(touchManager.isSupportedTouch){
				document.getElementById("rangeSliderContainer").classList.add("touch");
			}
		}

		init3D() {
			// 3D空間を作成
			this.scene = new THREE.Scene();

			// カメラを作成
			this.camera = new THREE.PerspectiveCamera();
			this.scene.add(this.camera);

			// レンダラーを作成
			this.renderer = new THREE.WebGLRenderer({antialias: true});

			// エレメントを追加
			document.getElementById('container').appendChild(this.renderer.domElement);
		}

		/** 読み込み完了後 */
		private initialize3D():void {

			// カード用ライト
			var pointLight = new THREE.PointLight(0xFFFFFF); // Set the color of the light source (white).
			pointLight.position.set(0, 0, +500); // Position the light source at (x, y, z).
			pointLight.distance = 1000;
			pointLight.intensity = 2.5;
			this.scene.add(pointLight); // Add the light source to the scene.

			// Planeの作成
			for (var i = 0; i < this.MAX_SLIDE; i++) {

				var texture = THREE.ImageUtils.loadTexture('../imgs/' + i + '.jpg');

				// 反射面の作成
				var textureOpt:THREE.Texture = THREE.ImageUtils.loadTexture('../imgs/' + i + '.jpg');

				// マテリアルの作成
				var material = new THREE.MeshLambertMaterial({
					map: texture,
					side: THREE.DoubleSide
				});
				var materialOpt = new THREE.MeshLambertMaterial({
					map: textureOpt,
					transparent: true,
					side: THREE.DoubleSide
				});
				materialOpt.opacity = 0.2;

				// カード
				var containerCard = new Card();

				// 上面
				var planeTop = new THREE.Mesh(new THREE.PlaneGeometry(this.ITEM_W, this.ITEM_H, 1, 1), material);
				containerCard.add(planeTop);

				// 反射面
				var planeBottom = new THREE.Mesh(new THREE.PlaneGeometry(this.ITEM_W, this.ITEM_H, 1, 1), materialOpt);
				planeBottom.rotation.y = 180 * (Math.PI / 180);
				planeBottom.rotation.z = 180 * (Math.PI / 180);
				planeBottom.position.y = -this.ITEM_H - 1;
				containerCard.add(planeBottom);

				// 3Dシーンに追加
				this.scene.add(containerCard);

				// 配列に参照の保存
				this._cardList[ i ] = containerCard;
			}
			//  カメラの位置
			this.camera.position.z = 900;
			this.camera.lookAt(new THREE.Vector3(0, 0, 0));

			// 背景の生成
			var textureBg = THREE.ImageUtils.loadTexture(this.URL_BG);
			var meshBg = new THREE.Mesh(new THREE.PlaneGeometry(3000, 1000), new THREE.MeshBasicMaterial({
				map: textureBg,
				transparent: true,
				side: THREE.DoubleSide
			}));
			meshBg.position.z = -500;
			this.scene.add(meshBg);


			// 初期のページ表示
			this.moveSlide(this.MAX_SLIDE / 2);


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

			// レンダリング
			createjs.Ticker.addEventListener("tick", ()=> this.enterFrameHandler());
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
					targetRot = +45 * (Math.PI / 180);
				}
				// 中央のスライド画像より右側のもの
				else if (i > id) {
					targetX += this.ITEM_W * 0.6;
					targetZ = this.ITEM_W - 10 * (id - i);
					targetRot = -45 * (Math.PI / 180);
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
						.get(p.rotation)
						.to({y: targetRot}, 900, createjs.Ease.cubicOut),
					createjs.Tween
						.get(p.position)
						.to({x: targetX, z: -1 * targetZ}, 1800, createjs.Ease.cubicOut)
				], {}, {});
				timeline.gotoAndPlay(0);
				p.timeline = timeline;
			}

			this.currentPage = id;
		}

		/** レイアウト処理(リサイズ対応も兼ねる) */
		private resizeHandler(event):void {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		}

		/** エンターフレームイベント */
		private enterFrameHandler():void {
			// レンダリング
			this.renderer.render(this.scene, this.camera);
		}
	}

	/**
	 * カバーフローのカード
	 * @class demo.Card
	 */
	class Card extends THREE.Object3D {
		public timeline:createjs.Timeline;
	}
}


// 初期化のコードは各種HTMLに記述しています