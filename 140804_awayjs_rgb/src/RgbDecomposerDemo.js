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
    var BitmapData = away.base.BitmapData;
    var BitmapDataChannel = away.base.BitmapDataChannel;
    var Rectangle = away.geom.Rectangle;
    var Point = away.geom.Point;
    /**
     * RGBを分解するためのクラスです。
     * @class demo.RgbDecomposer
     */
    var RgbDecomposer = (function (_super) {
        __extends(RgbDecomposer, _super);
        function RgbDecomposer() {
            _super.apply(this, arguments);
        }
        /**
         * 画像を読み込みます。
         * @method load
         */
        RgbDecomposer.prototype.load = function (url) {
            var _this = this;
            // <img>タグのImageオブジェクトを作って画像読み込み
            this._originalImage = new Image();
            this._originalImage.onload = function () { return _this.onLoadImage(); };
            this._originalImage.src = url;
        };
        RgbDecomposer.prototype.onLoadImage = function () {
            // RGBに分解
            this.createRGBChannel(this._originalImage);
            // イベントを発行
            this.dispatchEvent(new Event(Event.COMPLETE));
        };
        RgbDecomposer.prototype.createRGBChannel = function (image) {
            // 変数
            var w = image.width;
            var h = image.height;
            var p = new Point(0, 0);
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
        };
        /**
         * 分解された結果を受け取ります。
         * @method getResult
         */
        RgbDecomposer.prototype.getResult = function () {
            return this._result;
        };
        return RgbDecomposer;
    })(away.events.EventDispatcher);
    demo.RgbDecomposer = RgbDecomposer;
    var Event = away.events.Event;
    var BlendMode = away.base.BlendMode;
    var View = away.containers.View;
    var PrimitivePlanePrefab = away.prefabs.PrimitivePlanePrefab;
    var DirectionalLight = away.entities.DirectionalLight;
    var StaticLightPicker = away.materials.StaticLightPicker;
    var TriangleMethodMaterial = away.materials.TriangleMethodMaterial;
    var BitmapTexture = away.textures.BitmapTexture;
    var RequestAnimationFrame = away.utils.RequestAnimationFrame;
    var OrthographicProjection = away.projections.OrthographicProjection;
    var ContextGLProfile = away.stagegl.ContextGLProfile;
    /**
     * 分解されたRGBを表示するクラスです。
     * @class demo.World
     */
    var World = (function (_super) {
        __extends(World, _super);
        /**
         * コンストラクタ
         * @param bitmapDataList {Array} BitmapData クラスが格納された配列
         * @param mode {String} レンダリング方式を選択します。
         * @constructor
         */
        function World(bitmapDataList, mode) {
            var _this = this;
            if (mode === void 0) { mode = "auto"; }
            _super.call(this, new away.render.DefaultRenderer(false, ContextGLProfile.BASELINE, mode));
            this.CAMERA_DISTANCE = 5000;
            this.CAMERA_SPEED = 0.1;
            this._isMouseDown = false;
            this._anglePan = 180;
            this._angleTilt = 0;
            this.currentMouseX = 0;
            this.currentMouseY = 0;
            // 平行投影を利用
            var projection = new OrthographicProjection();
            projection.far = 60000;
            projection.projectionHeight = 1500;
            this.camera.projection = projection;
            // イベント登録
            var touchManager = new utils.TouchManager();
            touchManager.enableTouch();
            touchManager.addListener(document);
            document.addEventListener("mousedown", function (e) { return _this.onMouseDown(e); });
            document.addEventListener("mouseup", function (e) { return _this.onMouseUp(e); });
            document.addEventListener("mousemove", function (e) { return _this.onMouseMove(e); });
            window.addEventListener("resize", function (e) { return _this.onResize(e); });
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
                var bmpData = bitmapDataList[i];
                // テクスチャに変換
                var texture = new BitmapTexture(bmpData);
                // マテリアルを作成
                var material = new TriangleMethodMaterial(texture);
                material.lightPicker = lightPicker; // マテリアルにライトを適用します
                // 平面を作成
                var obj = prefab.getNewObject();
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
        World.prototype.onEnterFrame = function (time) {
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
        };
        /** マウスを押したタイミングのイベントハンドラーです。 */
        World.prototype.onMouseDown = function (event) {
            this._lastPanAngle = this._anglePan;
            this._lastTiltAngle = this._angleTilt;
            this._lastMouseX = event.clientX;
            this._lastMouseY = event.clientY;
            this._isMouseDown = true;
        };
        /** マウスを動かしたタイミングのイベントハンドラーです。 */
        World.prototype.onMouseMove = function (event) {
            this.currentMouseX = event.clientX;
            this.currentMouseY = event.clientY;
        };
        /** マウスを離したタイミングのイベントハンドラーです。 */
        World.prototype.onMouseUp = function (event) {
            this._isMouseDown = false;
        };
        /** サイズをフィットさせる */
        World.prototype.onResize = function (event) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        };
        return World;
    })(View);
    demo.World = World;
})(demo || (demo = {}));
//# sourceMappingURL=RgbDecomposerDemo.js.map