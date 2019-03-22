///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="TouchManager.ts" />


module demo {

	/**
	 * Cover Flow サンプル (Away3D TypeScript版)
	 * @author Yasunobu Ikeda
	 * @class demo.CoverFlowApp
	 */
	export class App extends away.containers.View {

		private URL_OBJ = "../assets/2000.awd";
		private URL_SKYBOX:string = '../assets/hourglass_texture.cube';
		private _raf:away.utils.RequestAnimationFrame;
		private _cameraController:away.controllers.HoverController;
		private _light:away.entities.DirectionalLight;
		private _lightPicker:away.materials.StaticLightPicker;
		private _lastPanAngle:number = 0;
		private _lastTiltAngle:number = 0;
		private _lastMouseX:number = 0;
		private _lastMouseY:number = 0;
		private _move:boolean = false;
		private _torusMaterial;

		constructor() {
			super(new away.render.DefaultRenderer());

			// イベントの無効化
			var touchManager = new utils.TouchManager();
			touchManager.enableTouch();
			touchManager.addListener(document.body);

			away.library.AssetLibrary.enableParser(away.parsers.Max3DSParser);
			away.library.AssetLibrary.enableParser(away.parsers.AWDParser);
			away.library.AssetLibrary.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, (event) => {
				this.onAssetComplete(event)
			});
			away.library.AssetLibrary.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, (event) => {
				this.onResourceComplete(event)
			});
			away.library.AssetLibrary.load(new away.net.URLRequest(this.URL_OBJ));
			away.library.AssetLibrary.load(new away.net.URLRequest(this.URL_SKYBOX));

			this.initLights();
			this.initCamera();
			this.initMaterials();


			this._raf = new away.utils.RequestAnimationFrame(this.onEnterFrame, this);
			this._raf.start();

			window.addEventListener("resize", (event) => {
				this.onResize(event);
			});
			this.onResize();

			document.addEventListener("mousedown", (event) => {
				this.onMouseDown(event);
			});
			document.addEventListener("mouseup", (event)=> {
				this.onMouseUp(event);
			});
			document.addEventListener("mousemove", (event)=> {
				this.onMouseMove(event);
			});
			document.addEventListener("mousewheel", (event) => {
				this.onMouseWheel(event);
			});
		}

		private initLights() {
			//create the light for the scene
			this._light = new away.entities.DirectionalLight();
			this._light.color = 0x683019;
			this._light.direction = new away.geom.Vector3D(1, 0, 0);
			this._light.ambient = 0.5;
			this._light.ambientColor = 0x30353b;
			this._light.diffuse = 2.8;
			this._light.specular = 2.8;
			this.scene.addChild(this._light);

			//create the lightppicker for the material
			this._lightPicker = new away.materials.StaticLightPicker([this._light]);
		}

		/**
		 * Initialise the materials
		 */
		private initMaterials():void {
			//setup the torus material
			this._torusMaterial = new away.materials.TriangleMethodMaterial(0x00000, 1);

		}

		private initCamera() {
			//setup controller to be used on the camera
			this._cameraController = new away.controllers.HoverController(this.camera);
			this._cameraController.distance = 200;
			this._cameraController.minTiltAngle = -90;
			this._cameraController.maxTiltAngle = 90;
			this._cameraController.panAngle = -10;
			this._cameraController.tiltAngle = -20;

			this.camera.projection = new away.projections.PerspectiveProjection(110);
			this.camera.projection.near = 10;
			this.camera.projection.far = 10000;
		}


		private onAssetComplete(event) {
			var asset = event.asset;

			switch (asset.assetType) {
				case away.library.AssetType.MESH:
					var mesh = <away.entities.Mesh>asset;
					mesh.transform.scale = new away.geom.Vector3D(1200, 1200, 1200);
					mesh.material = this._torusMaterial;
					mesh.rotationX = -90;
					mesh.rotationY = 180;
					this.scene.addChild(mesh);
					break;

				case away.library.AssetType.MATERIAL:
					var material = asset;
					material.lightPicker = this._lightPicker;
					break;
			}
		}

		private onResourceComplete(event:away.events.LoaderEvent) {
			switch (event.url) {
				case this.URL_SKYBOX:
					var cubeTexture = <away.textures.ImageCubeTexture> event.assets[0];

					var skyBox = new away.entities.Skybox(new away.materials.SkyboxMaterial(cubeTexture));
					this.scene.addChild(skyBox);
					var method = new away.materials.EffectEnvMapMethod(cubeTexture, 1);
					this._torusMaterial.addEffectMethod(method);
					break;
			}
		}


		private onEnterFrame(dt) {
			this.render();
		}

		private onResize(event = null) {
			this.y = 0;
			this.x = 0;

			// 実験的に解像度対応をしてみる
			var ratio = window.devicePixelRatio || 1.0;

			this.width = window.innerWidth * ratio;
			this.height = window.innerHeight * ratio;

			this.render();


			this.htmlElement.style.width = window.innerWidth + "px";
			this.htmlElement.style.height = window.innerHeight + "px";

			// 超強引に調整する (バッドノウハウ)
			var canvas = document.getElementsByTagName("canvas");
			canvas[0].style.width = window.innerWidth + "px";
			canvas[0].style.height = window.innerHeight + "px";
		}


		/**
		 * Mouse down listener for navigation
		 */
		private onMouseDown(event) {
			this._lastPanAngle = this._cameraController.panAngle;
			this._lastTiltAngle = this._cameraController.tiltAngle;
			this._lastMouseX = event.clientX;
			this._lastMouseY = event.clientY;
			this._move = true;
		}

		/**
		 * Mouse up listener for navigation
		 */
		private onMouseUp(event) {
			this._move = false;
		}

		private onMouseMove(event) {
			if (this._move) {
				this._cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
				this._cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
			}
		}

		private onMouseWheel(event) {
			event.preventDefault();
		}
	}

}


// ページが読み込まれてから実行します
window.addEventListener("load", function () {
	new demo.App();
});