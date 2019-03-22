/// <reference path="pixi/pixi.d.ts" />
window.addEventListener("load", function () {
    new project.Main();
});
var project;
(function (project) {
    /**
     * パーティクルデモのメインクラスです。
     * @class project.Main
     */
    var Main = (function () {
        /**
         * @constructor
         */
        function Main() {
            var _this = this;
            this.pathList = [];
            this.mousePositions = [];
            this.stage = new PIXI.Stage(0x0);
            var options = {
                view: null,
                transparent: false,
                resolution: 1
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, options);
            document.body.appendChild(this.renderer.view);
            this.stage.mousedown = this.stage.touchstart = function (data) {
                _this.handleMouseDown(data);
            };
            this.stage.mousemove = this.stage.touchmove = function (data) {
                _this.handleMouseMove(data);
            };
            this.stage.mouseup = this.stage.mouseupoutside = this.stage.touchend = this.stage.touchendoutside = function (data) {
                _this.handleMouseUp(data);
            };
            // Tickerを作成
            requestAnimFrame(function () { return _this.handleTick(); });
            // 親子構造
            this.shapeCurve = new PIXI.Graphics();
            this.shapeCurve.interactive = false;
            this.stage.addChild(this.shapeCurve);
            var max = 5000;
            for (var i = 0; i < max; i++) {
                var p = new Path();
                p.setup(0, 0, 0.1 + i / max * 0.05, (120 * Math.random() * Math.random()) >> 0, i / max);
                this.pathList.push(p);
            }
            // リサイズイベント
            this.handleResize();
            window.addEventListener("resize", function () {
                _this.handleResize();
            });
        }
        Main.prototype.handleMouseDown = function (event) {
        };
        Main.prototype.handleMouseMove = function (event) {
            this.mouseX = event.global.x;
            this.mouseY = event.global.y;
        };
        Main.prototype.handleMouseUp = function (event) {
        };
        /**
         * エンターフレームイベント
         */
        Main.prototype.handleTick = function () {
            var _this = this;
            var gCurve = this.shapeCurve;
            // 描画をリセット
            gCurve.clear();
            var stageX = this.mouseX;
            var stageY = this.mouseY;
            this.mousePositions.unshift(new PIXI.Point(stageX, stageY));
            for (var i = 0; i < this.pathList.length; i++) {
                var p = this.pathList[i];
                if (this.mousePositions.length > p.delayFrame) {
                    var position = this.mousePositions[p.delayFrame];
                    //    マウスの位置更新
                    p.setMousePosition(position.x, position.y);
                }
                p.update();
            }
            for (var i = 0; i < this.pathList.length - 1; i++) {
                var p = this.pathList[i];
                // マウスの軌跡を変数に保存
                var p0x = p.point.x;
                var p0y = p.point.y;
                var p1x = p.prev.x;
                var p1y = p.prev.y;
                var p2x = p.prev2.x;
                var p2y = p.prev2.y;
                // カーブは中間点を結ぶ。マウスの座標は制御点として扱う。
                gCurve.lineStyle(1, 0xFFFFFF, p.percent);
                gCurve.moveTo(p1x, p1y);
                gCurve.lineTo(p0x, p0y);
            }
            this.renderer.render(this.stage);
            requestAnimFrame(function () { return _this.handleTick(); });
        };
        /**
         * リサイズイベント
         */
        Main.prototype.handleResize = function () {
            this.renderer.resize(innerWidth, innerHeight);
        };
        return Main;
    })();
    project.Main = Main;
    var Path = (function () {
        function Path() {
            this.prev = new PIXI.Point(0, 0);
            this.prev2 = new PIXI.Point(0, 0);
            this.point = new PIXI.Point(0, 0);
            this.mouse = new PIXI.Point(0, 0);
        }
        /**
         *
         * @param x
         * @param y
         * @param _accele    マウスから離れて行く時の加速値
         * @param _slowdown
         * @param _maxspeed
         */
        Path.prototype.setup = function (x, y, _accele, delayFrame, percent) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (_accele === void 0) { _accele = 0.1; }
            if (delayFrame === void 0) { delayFrame = 0; }
            if (percent === void 0) { percent = 0.0; }
            this.prev2.x = this.prev.x = this.point.x = x;
            this.prev2.y = this.prev.y = this.point.y = y;
            this.delayFrame = delayFrame;
            this.percent = percent;
            //初期化
            this.vx = this.vy = 0.0;
            this.xx = innerWidth / 2 >> 0;
            this.yy = innerHeight / 2 >> 0;
            this.ac = _accele;
            this.de = 0.90;
            this.wd = 0.05;
            this.px0 = this.px1 = this.xx;
            this.py0 = this.py1 = this.yy;
        };
        Path.prototype.setMousePosition = function (x, y) {
            this.mouse.x = x;
            this.mouse.y = y;
        };
        Path.prototype.update = function () {
            this.prev2.x = this.prev.x;
            this.prev2.y = this.prev.y;
            this.prev.x = this.point.x;
            this.prev.y = this.point.y;
            // 参考
            // http://gihyo.jp/design/feature/01/frocessing/0004?page=1
            var px = this.xx;
            var py = this.yy;
            //加速度運動
            this.vx += (this.mouse.x - this.xx) * this.ac;
            this.vy += (this.mouse.y - this.yy) * this.ac;
            this.xx += this.vx;
            this.yy += this.vy;
            //新しい描画座標
            var x0 = px + this.vy * this.wd;
            var y0 = py - this.vx * this.wd;
            var x1 = px - this.vy * this.wd;
            var y1 = py + this.vx * this.wd;
            //描画座標
            this.px0 = x0;
            this.py0 = y0;
            this.px1 = x1;
            this.py1 = y1;
            //減衰処理
            this.vx *= this.de;
            this.vy *= this.de;
            this.point.x = this.xx;
            this.point.y = this.yy;
        };
        return Path;
    })();
})(project || (project = {}));
//# sourceMappingURL=main.js.map