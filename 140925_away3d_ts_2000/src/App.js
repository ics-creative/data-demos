///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="TouchManager.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var demo;
(function (demo) {
    /**
     * Cover Flow サンプル (Away3D TypeScript版)
     * @author Yasunobu Ikeda
     * @class demo.CoverFlowApp
     */
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = this;
            _super.call(this, new away.render.DefaultRenderer());
            this.URL_OBJ = "../assets/2000.awd";
            this.URL_SKYBOX = '../assets/hourglass_texture.cube';
            this._lastPanAngle = 0;
            this._lastTiltAngle = 0;
            this._lastMouseX = 0;
            this._lastMouseY = 0;
            this._move = false;
            // イベントの無効化
            var touchManager = new utils.TouchManager();
            touchManager.enableTouch();
            touchManager.addListener(document.body);
            away.library.AssetLibrary.enableParser(away.parsers.Max3DSParser);
            away.library.AssetLibrary.enableParser(away.parsers.AWDParser);
            away.library.AssetLibrary.addEventListener(away.events.AssetEvent.ASSET_COMPLETE, function (event) {
                _this.onAssetComplete(event);
            });
            away.library.AssetLibrary.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, function (event) {
                _this.onResourceComplete(event);
            });
            away.library.AssetLibrary.load(new away.net.URLRequest(this.URL_OBJ));
            away.library.AssetLibrary.load(new away.net.URLRequest(this.URL_SKYBOX));
            this.initLights();
            this.initCamera();
            this.initMaterials();
            this._raf = new away.utils.RequestAnimationFrame(this.onEnterFrame, this);
            this._raf.start();
            window.addEventListener("resize", function (event) {
                _this.onResize(event);
            });
            this.onResize();
            document.addEventListener("mousedown", function (event) {
                _this.onMouseDown(event);
            });
            document.addEventListener("mouseup", function (event) {
                _this.onMouseUp(event);
            });
            document.addEventListener("mousemove", function (event) {
                _this.onMouseMove(event);
            });
            document.addEventListener("mousewheel", function (event) {
                _this.onMouseWheel(event);
            });
        }
        App.prototype.initLights = function () {
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
        };
        /**
         * Initialise the materials
         */
        App.prototype.initMaterials = function () {
            //setup the torus material
            this._torusMaterial = new away.materials.TriangleMethodMaterial(0x00000, 1);
        };
        App.prototype.initCamera = function () {
            //setup controller to be used on the camera
            this._cameraController = new away.controllers.HoverController(this.camera);
            this._cameraController.distance = 200;
            this._cameraController.minTiltAngle = -90;
            this._cameraController.maxTiltAngle = 90;
            this._cameraController.panAngle = -10;
            this._cameraController.tiltAngle = -20;
            this._cameraController.steps = 30;
            this.camera.projection = new away.projections.PerspectiveProjection(110);
            this.camera.projection.near = 10;
            this.camera.projection.far = 10000;
        };
        App.prototype.onAssetComplete = function (event) {
            var asset = event.asset;
            switch (asset.assetType) {
                case away.library.AssetType.MESH:
                    var mesh = asset;
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
        };
        App.prototype.onResourceComplete = function (event) {
            switch (event.url) {
                case this.URL_SKYBOX:
                    var cubeTexture = event.assets[0];
                    var skyBox = new away.entities.Skybox(new away.materials.SkyboxMaterial(cubeTexture));
                    this.scene.addChild(skyBox);
                    var method = new away.materials.EffectEnvMapMethod(cubeTexture, 1);
                    this._torusMaterial.addEffectMethod(method);
                    break;
            }
        };
        App.prototype.onEnterFrame = function (dt) {
            this.render();
        };
        App.prototype.onResize = function (event) {
            if (event === void 0) { event = null; }
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
        };
        /**
         * Mouse down listener for navigation
         */
        App.prototype.onMouseDown = function (event) {
            this._lastPanAngle = this._cameraController.panAngle;
            this._lastTiltAngle = this._cameraController.tiltAngle;
            this._lastMouseX = event.clientX;
            this._lastMouseY = event.clientY;
            this._move = true;
        };
        /**
         * Mouse up listener for navigation
         */
        App.prototype.onMouseUp = function (event) {
            this._move = false;
        };
        App.prototype.onMouseMove = function (event) {
            if (this._move) {
                this._cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
                this._cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
            }
        };
        App.prototype.onMouseWheel = function (event) {
            event.preventDefault();
        };
        return App;
    })(away.containers.View);
    demo.App = App;
})(demo || (demo = {}));
// ページが読み込まれてから実行します
window.addEventListener("load", function () {
    new demo.App();
});
