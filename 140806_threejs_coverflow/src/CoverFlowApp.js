///<reference path="../libs/three.d.ts" />
///<reference path="../libs/tweenjs/tweenjs.d.ts" />
///<reference path="../libs/easeljs/easeljs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var demo;
(function (demo) {
    /**
     * Cover Flow サンプル (Three.js版)
     * @author Yasunobu Ikeda
     * @class demo.CoverFlowApp
     */
    var CoverFlowApp = (function () {
        function CoverFlowApp() {
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
            this.initMobile();
            this.init3D();
            this.initialize3D();
        }
        CoverFlowApp.prototype.initMobile = function () {
            // イベントの無効化
            var touchManager = new utils.TouchManager();
            if (touchManager.isSupportedTouch) {
                document.getElementById("rangeSliderContainer").classList.add("touch");
            }
        };
        CoverFlowApp.prototype.init3D = function () {
            // 3D空間を作成
            this.scene = new THREE.Scene();
            // カメラを作成
            this.camera = new THREE.PerspectiveCamera();
            this.scene.add(this.camera);
            // レンダラーを作成
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            // エレメントを追加
            document.getElementById('container').appendChild(this.renderer.domElement);
        };
        /** 読み込み完了後 */
        CoverFlowApp.prototype.initialize3D = function () {
            var _this = this;
            // カード用ライト
            var pointLight = new THREE.PointLight(0xFFFFFF); // Set the color of the light source (white).
            pointLight.position.set(0, 0, +500); // Position the light source at (x, y, z).
            pointLight.distance = 1000;
            pointLight.intensity = 2.5;
            this.scene.add(pointLight); // Add the light source to the scene.
            for (var i = 0; i < this.MAX_SLIDE; i++) {
                var texture = THREE.ImageUtils.loadTexture('../imgs/' + i + '.jpg');
                // 反射面の作成
                var textureOpt = THREE.ImageUtils.loadTexture('../imgs/' + i + '.jpg');
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
                this._cardList[i] = containerCard;
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
            window.addEventListener("resize", function (event) { return _this.resizeHandler(event); });
            this.resizeHandler(null); // サイズをウインドウにフィットさせる
            // インプット要素の制御
            this._inputElement = document.getElementById("rangeSlider");
            this._inputElement.onchange = function (event) { return _this.scrollbar_changeHandler(event); };
            this._inputElement.oninput = function (event) { return _this.scrollbar_changeHandler(event); };
            // CreateJSのセットアップ(60fpsで稼働するように)
            createjs.Ticker.setFPS(60);
            createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
            // レンダリング
            createjs.Ticker.addEventListener("tick", function () { return _this.enterFrameHandler(); });
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
                    targetRot = +45 * (Math.PI / 180);
                }
                else if (i > id) {
                    targetX += this.ITEM_W * 0.6;
                    targetZ = this.ITEM_W - 10 * (id - i);
                    targetRot = -45 * (Math.PI / 180);
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
                    createjs.Tween.get(p.rotation).to({ y: targetRot }, 900, createjs.Ease.cubicOut),
                    createjs.Tween.get(p.position).to({ x: targetX, z: -1 * targetZ }, 1800, createjs.Ease.cubicOut)
                ], {}, {});
                timeline.gotoAndPlay(0);
                p.timeline = timeline;
            }
            this.currentPage = id;
        };
        /** レイアウト処理(リサイズ対応も兼ねる) */
        CoverFlowApp.prototype.resizeHandler = function (event) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        };
        /** エンターフレームイベント */
        CoverFlowApp.prototype.enterFrameHandler = function () {
            // レンダリング
            this.renderer.render(this.scene, this.camera);
        };
        return CoverFlowApp;
    })();
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
    })(THREE.Object3D);
})(demo || (demo = {}));
//# sourceMappingURL=CoverFlowApp.js.map