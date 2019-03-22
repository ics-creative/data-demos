///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="../libs/tweenjs/tweenjs.d.ts" />
///<reference path="../libs/easeljs/easeljs.d.ts" />
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
    var Point = away.geom.Point;
    var DefaultRenderer = away.render.DefaultRenderer;
    var View = away.containers.View;
    var PrimitivePlanePrefab = away.prefabs.PrimitivePlanePrefab;
    var DirectionalLight = away.entities.DirectionalLight;
    var StaticLightPicker = away.materials.StaticLightPicker;
    var TriangleMethodMaterial = away.materials.TriangleMethodMaterial;
    var BitmapTexture = away.textures.BitmapTexture;
    var RequestAnimationFrame = away.utils.RequestAnimationFrame;
    var DisplayObjectContainer = away.containers.DisplayObjectContainer;
    var AssetLibrary = away.library.AssetLibrary;
    var LoaderEvent = away.events.LoaderEvent;
    var URLRequest = away.net.URLRequest;
    /**
     * Cover Flow サンプル (Away3D TypeScript版)
     * @author Yasunobu Ikeda
     * @class demo.CoverFlowApp
     */
    var CoverFlowApp = (function (_super) {
        __extends(CoverFlowApp, _super);
        function CoverFlowApp() {
            var _this = this;
            _super.call(this, new DefaultRenderer());
            this.URL_GRADATION = "../imgs/gradation.png";
            this.URL_BG = "../imgs/bg.png";
            /** 平面の横幅 */
            this.ITEM_W = 256;
            /** スライドの個数 */
            this.MAX_SLIDE = 44;
            /** 平面の縦幅 */
            this.ITEM_H = 256;
            /** 読み込む素材の最大値 */
            this.LOAD_MAX = 46;
            /** 現在のスライドID */
            this.currentPage = 0;
            /** 平面のX座標の間隔 */
            this.MARGIN_X = 80;
            /** 平面を格納する配列 */
            this._cardList = [];
            this._urlList = [];
            this._loadedCount = 0;
            // イベントの無効化
            var touchManager = new utils.TouchManager();
            if (touchManager.isSupportedTouch) {
                document.getElementById("rangeSliderContainer").classList.add("touch");
            }
            this.renderer.antiAlias = 4;
            // Import Assets
            AssetLibrary.addEventListener(LoaderEvent.RESOURCE_COMPLETE, function (e) { return _this.onResourceComplete(e); });
            for (var i = 0; i < this.MAX_SLIDE; i++) {
                var url = "../imgs/" + i + ".jpg";
                AssetLibrary.load(new URLRequest(url));
                this._urlList[i] = url;
            }
            // 他のパーツ
            AssetLibrary.load(new URLRequest(this.URL_GRADATION));
            AssetLibrary.load(new URLRequest(this.URL_BG));
        }
        CoverFlowApp.prototype.onResourceComplete = function (event) {
            this._loadedCount++;
            if (this._loadedCount < this.LOAD_MAX)
                return;
            document.body.style.display = "block";
            this.initialize3D();
        };
        //----------------------------------------------------------
        //
        //   Function
        //
        //----------------------------------------------------------
        /** 読み込み完了後 */
        CoverFlowApp.prototype.initialize3D = function () {
            var _this = this;
            // カード用ライト
            var light1 = new away.entities.PointLight();
            light1.diffuse = 1.2;
            light1.specular = 0.0;
            light1.ambient = 0.0;
            light1.radius = 600;
            light1.fallOff = 800;
            light1.z = -200;
            var lightPicker1 = new StaticLightPicker([light1]);
            // 背景用ライト
            var light2 = new DirectionalLight();
            light2.diffuse = 0.0;
            light2.specular = 0.0;
            light2.ambient = 1.0;
            var lightPicker2 = new StaticLightPicker([light2]);
            // グラデーションマスク
            var imageGradation = AssetLibrary.getAsset(this.URL_GRADATION);
            var bmdGradation = new BitmapData(256, 256, true, 0x0);
            bmdGradation.draw(imageGradation.htmlImageElement);
            var ZERO = new Point();
            // 平面の作成
            var prefab = new PrimitivePlanePrefab(this.ITEM_W, this.ITEM_H, 2, 2, false, true);
            for (var i = 0; i < this.MAX_SLIDE; i++) {
                var texture = AssetLibrary.getAsset(this._urlList[i]);
                var bmdBase = new BitmapData(256, 256, true, 0x0);
                bmdBase.draw(texture.htmlImageElement);
                // 反射面の作成
                var bmdReflection = new BitmapData(256, 256, true, 0x0);
                bmdReflection.draw(bmdBase);
                bmdReflection.copyChannel(bmdGradation, bmdGradation.rect, ZERO, BitmapDataChannel.ALPHA, BitmapDataChannel.ALPHA);
                var textureOpt = new BitmapTexture(bmdReflection);
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
                var planeTop = prefab.getNewObject();
                planeTop.material = material;
                containerCard.addChild(planeTop);
                // 反射面
                var planeBottom = prefab.getNewObject();
                planeBottom.material = materialOpt;
                planeBottom.rotationZ = 180;
                planeBottom.rotationY = 180;
                planeBottom.y = -this.ITEM_H - 1;
                containerCard.addChild(planeBottom);
                // 3Dシーンに追加
                this.scene.addChild(containerCard);
                // 配列に参照の保存
                this._cardList[i] = containerCard;
            }
            //  カメラの位置
            this.camera.z = -700;
            // 背景の生成
            var textureBg = AssetLibrary.getAsset(this.URL_BG);
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
            window.addEventListener("resize", function (event) { return _this.resizeHandler(event); });
            this.resizeHandler(null); // サイズをウインドウにフィットさせる
            // インプット要素の制御
            this._inputElement = document.getElementById("rangeSlider");
            this._inputElement.onchange = function (event) { return _this.scrollbar_changeHandler(event); };
            this._inputElement.oninput = function (event) { return _this.scrollbar_changeHandler(event); };
            // CreateJSのセットアップ(60fpsで稼働するように)
            createjs.Ticker.setFPS(60);
            createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        };
        /**
         * スクロールが動いたときのイベント
         */
        CoverFlowApp.prototype.scrollbar_changeHandler = function (event) {
            var val = Number(this._inputElement.value);
            // スクロールバーの値からページIDの計算
            var nextId = Math.round(val * (this.MAX_SLIDE - 1));
            // ページ遷移
            this.moveSlide(nextId);
        };
        /**
         * スライドを移動
         * @param id    スライドのID
         */
        CoverFlowApp.prototype.moveSlide = function (id) {
            // 遷移先が現在のスライド番号と同じであれば処理を終了
            if (this.currentPage == id)
                return;
            var array = [];
            for (var i = 0; i < this.MAX_SLIDE; i++) {
                // 移動値を初期化
                var targetX = 0;
                var targetZ = 0;
                var targetRot = 0;
                // X座標の計算
                targetX = this.MARGIN_X * (i - id);
                // 中央のスライド画像より左側のもの
                if (i < id) {
                    targetX -= this.ITEM_W * 0.6;
                    targetZ = this.ITEM_W + 10 * (id - i);
                    targetRot = -45;
                }
                else if (i > id) {
                    targetX += this.ITEM_W * 0.6;
                    targetZ = this.ITEM_W - 10 * (id - i);
                    targetRot = +45;
                }
                else {
                    targetX += 0;
                    targetZ = 0;
                    targetRot = 0;
                }
                // 対象のPlaneの参照をpに格納
                var p = this._cardList[i];
                // ちょっと強引に実装
                if (p.timeline)
                    p.timeline.setPaused(true);
                var timeline = new createjs.Timeline([
                    createjs.Tween.get(p).to({ rotationY: targetRot }, 900, createjs.Ease.cubicOut),
                    createjs.Tween.get(p).to({ x: targetX, z: targetZ }, 1800, createjs.Ease.cubicOut)
                ], {}, {});
                timeline.gotoAndPlay(0);
                p.timeline = timeline;
            }
            this.currentPage = id;
        };
        /** レイアウト処理(リサイズ対応も兼ねる) */
        CoverFlowApp.prototype.resizeHandler = function (event) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        };
        /** エンターフレームイベント */
        CoverFlowApp.prototype.enterFrameHandler = function (e) {
            if (e === void 0) { e = null; }
            this.render();
        };
        return CoverFlowApp;
    })(View);
    demo.CoverFlowApp = CoverFlowApp;
    /**
     * カバーフローのカード
     * @class demo.Card
     */
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            _super.apply(this, arguments);
        }
        return Card;
    })(DisplayObjectContainer);
})(demo || (demo = {}));
//# sourceMappingURL=CoverFlowApp.js.map