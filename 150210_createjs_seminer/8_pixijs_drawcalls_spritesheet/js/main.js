///<reference path="libs/pixi/pixi.d.ts" />
///<reference path="libs/easeljs/easeljs.d.ts" />
///<reference path="libs/tweenjs/tweenjs.d.ts" />
///<reference path="libs/preloadjs/preloadjs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var project;
(function (project) {
    var loader;
    var appScale = 1.0;
    var SPRITESHEET_SCALE = 1.0;
    var ICON_RADIUS = 35;
    var Main = (function () {
        function Main() {
            var _this = this;
            this.manifest = [
                { src: "img/more_complications_large_2x.png", id: "AppleWatch" }
            ];
            this.fontList = [
                "f001",
                "f002",
                "f003",
                "f004",
                "f005",
                "f006",
                "f007",
                "f008",
                "f009",
                "f00a",
                "f00b",
                "f00c",
                "f00d",
                "f00e",
                "f010",
                "f011",
                "f012",
                "f013",
                "f014",
                "f015",
                "f016",
                "f017",
                "f018",
                "f019",
                "f01a",
                "f01b",
                "f01c",
                "f01d",
                "f01e",
                "f021",
                "f022",
                "f023",
                "f024",
                "f025",
                "f026",
                "f027",
                "f028",
                "f029",
                "f02a",
                "f02b",
                "f02c",
                "f02d",
                "f02e",
                "f02f",
                "f030",
                "f031",
                "f032",
                "f033",
                "f034",
                "f035",
                "f036",
                "f037",
                "f038",
                "f039",
                "f03a",
                "f03b",
                "f03c",
                "f03d",
                "f03e",
                "f040",
                "f041",
                "f042",
                "f043",
                "f044",
                "f045",
                "f046",
                "f047",
                "f048",
                "f049",
                "f04a",
            ];
            WebFont.load({
                custom: {
                    families: ['FontAwesome'],
                    urls: [
                        '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'
                    ],
                    testStrings: {
                        'FontAwesome': '\uf001'
                    }
                },
                // Web Fontが使用可能になったとき
                active: function () { return _this.handleFontDetect(); }
            });
        }
        Main.prototype.handleFontDetect = function () {
            loader = new createjs.LoadQueue(true);
            loader.on("complete", this.handleComplete, this);
            loader.loadManifest(this.manifest);
        };
        Main.prototype.handleComplete = function () {
            this.stage = new PIXI.Stage(0xf2f2f2);
            this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, null, null, true);
            this.container = new PIXI.DisplayObjectContainer();
            var layoutManager = new LayoutManager(10);
            var numItems = layoutManager.numItems;
            this.spriteSheetBuilder = new createjs.SpriteSheetBuilder();
            this.spriteSheetBuilder.padding = 4;
            ImageGenerator.build(this.spriteSheetBuilder, numItems, this.fontList);
            var numBg = this.spriteSheetBuilder.addFrame(new createjs.Bitmap(loader.getResult("AppleWatch")));
            this.spriteSheetBuilder.addAnimation("bg", [numBg]);
            var mat = new createjs.Shape();
            mat.graphics.beginFill("#000").drawRect(0, 0, 2, 2);
            var numBg = this.spriteSheetBuilder.addFrame(mat, new createjs.Rectangle(0, 0, 2, 2));
            this.spriteSheetBuilder.addAnimation("black", [numBg]);
            this.spriteSheetBuilder.on("complete", this.handleBuildComplete, this);
            this.spriteSheetBuilder.buildAsync(0.2);
        };
        Main.prototype.handleBuildComplete = function () {
            var _this = this;
            SpriteSheetUtil.convertSpriteSheet(this.spriteSheetBuilder.spriteSheet);
            var bg = PIXI.Sprite.fromFrame("bg");
            this.container.addChild(bg);
            this.menu = new Menu();
            this.menu.x = 211;
            this.menu.y = 246;
            this.maskShape = new PIXI.Graphics();
            //maskShape.drawRect(- AppConst.SIZE_W / 2, - AppConst.SIZE_H / 2, AppConst.SIZE_W, AppConst.SIZE_H);
            this.menu.mask = this.maskShape;
            this.container.addChild(this.menu);
            this.stage.addChild(this.container);
            this.menu.setup();
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.on("tick", this.handleTick, this);
            // add the renderer view element to the DOM
            document.body.appendChild(this.renderer.view);
            this.handleResize();
            window.addEventListener("resize", function () { return _this.handleResize(); });
        };
        Main.prototype.handleTick = function (event) {
            this.renderer.render(this.stage);
        };
        Main.prototype.handleResize = function () {
            var sizeW = 442;
            var sizeH = 486;
            this.renderer.resize(innerWidth, innerHeight);
            var scale = 1.0;
            this.container.scale.x = this.container.scale.y = scale;
            this.container.x = (window.innerWidth - sizeW * scale) / 2;
            this.container.y = (window.innerHeight - sizeH * scale) / 2;
            this.maskShape.clear();
            this.maskShape.beginFill(0xFF0000);
            this.maskShape.drawRect(this.container.x + this.menu.x - AppConst.SIZE_W / 2, this.container.y + this.menu.y - AppConst.SIZE_H / 2, AppConst.SIZE_W, AppConst.SIZE_H);
            appScale = scale;
        };
        return Main;
    })();
    project.Main = Main;
    var AppConst = (function () {
        function AppConst() {
        }
        AppConst.SIZE_W = 312;
        AppConst.SIZE_H = 400;
        return AppConst;
    })();
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            this.mouseDownPoint = new PIXI.Point(0, 0);
            this.mouseDownCenter = new PIXI.Point(0, 0);
            this.easeCenter = new PIXI.Point(0, 0);
            this.isDragging = false;
        }
        Menu.prototype.setup = function () {
            var _this = this;
            var bg = PIXI.Sprite.fromFrame("black");
            bg.scale.x = AppConst.SIZE_W / 2;
            bg.scale.y = AppConst.SIZE_H / 2;
            bg.x = -AppConst.SIZE_W / 2 >> 0;
            bg.y = -AppConst.SIZE_H / 2 >> 0;
            this.addChild(bg);
            this.layoutManager = new LayoutManager(10);
            var numItems = this.layoutManager.numItems;
            this.pointCurrent = new createjs.Point();
            this.listIcons = [];
            for (var i = 0; i < numItems; i++) {
                var item = PIXI.Sprite.fromFrame("icon_" + i);
                item.pivot.x = ICON_RADIUS;
                item.pivot.y = ICON_RADIUS;
                this.listIcons.push(item);
                this.addChild(item);
            }
            this.stage.mousedown = this.stage.touchstart = function (event) {
                _this.handleMouseDown(event);
            };
            this.stage.mousemove = this.stage.touchmove = function (event) {
                _this.handleMouseMove(event);
            };
            this.stage.mouseup = this.stage.mouseupoutside = this.stage.touchend = function (event) {
                _this.handleMouseUp(event);
            };
            createjs.Ticker.on("tick", this.handleTick, this);
        };
        Menu.prototype.handleMouseDown = function (event) {
            this.mouseDownCenter.x = this.pointCurrent.x;
            this.mouseDownCenter.y = this.pointCurrent.y;
            this.mouseDownPoint = event.getLocalPosition(this);
            this.isDragging = true;
        };
        Menu.prototype.handleMouseMove = function (event) {
            if (this.isDragging == true)
                this.commitProperties(event);
        };
        Menu.prototype.handleMouseUp = function (event) {
            this.commitProperties(event);
            this.isDragging = false;
        };
        Menu.prototype.commitProperties = function (event) {
            var current = event.getLocalPosition(this);
            this.pointCurrent.x = current.x - this.mouseDownPoint.x + this.mouseDownCenter.x;
            this.pointCurrent.y = current.y - this.mouseDownPoint.y + this.mouseDownCenter.y;
            this.pointCurrent.x = Math.max(-AppConst.SIZE_W * 1.3 * appScale, Math.min(+AppConst.SIZE_W * 1.3 * appScale, this.pointCurrent.x));
            this.pointCurrent.y = Math.max(-AppConst.SIZE_H * appScale, Math.min(+AppConst.SIZE_H * appScale, this.pointCurrent.y));
        };
        Menu.prototype.handleTick = function (event) {
            this.easeCenter.x += (this.pointCurrent.x - this.easeCenter.x) * 0.1;
            this.easeCenter.y += (this.pointCurrent.y - this.easeCenter.y) * 0.1;
            this.layoutManager.iconMapRefresh(150, 55, {
                x: this.easeCenter.x / appScale,
                y: this.easeCenter.y / appScale
            }, this.listIcons);
        };
        return Menu;
    })(PIXI.DisplayObjectContainer);
    var ImageGenerator = (function () {
        function ImageGenerator() {
        }
        ImageGenerator.build = function (builder, numItems, iconUnicodeList) {
            var cacheCanvases = [];
            for (var i = 0; i < numItems; i++) {
                var iconUnicode = iconUnicodeList[i % iconUnicodeList.length];
                var dummy = new createjs.Container();
                var hue = 360 * Math.random();
                var shape = new createjs.Shape();
                var colorStart = createjs.Graphics.getHSL(hue, 80, 70);
                var colorEnd = createjs.Graphics.getHSL(hue, 100, 50);
                shape.graphics.beginLinearGradientFill([colorStart, colorEnd], [0.0, 1.0], 0, -ICON_RADIUS, 0, +ICON_RADIUS).drawCircle(0, 0, ICON_RADIUS);
                dummy.addChild(shape);
                var str = String.fromCharCode(parseInt(iconUnicode, 16));
                var icon = new createjs.Text(str, "42px FontAwesome", "white");
                icon.textAlign = "center";
                icon.textBaseline = "middle";
                dummy.addChild(icon);
                dummy.cache(-ICON_RADIUS, -ICON_RADIUS, ICON_RADIUS * 2, ICON_RADIUS * 2);
                cacheCanvases.push(dummy.cacheCanvas);
                var num = builder.addFrame(dummy, null, SPRITESHEET_SCALE);
                builder.addAnimation("icon_" + i, [num]);
            }
        };
        return ImageGenerator;
    })();
    var LayoutManager = (function () {
        function LayoutManager(level) {
            this.screenW = AppConst.SIZE_W;
            this.screenH = AppConst.SIZE_H;
            this.centerW = this.screenW / 2;
            this.centerH = this.screenH / 2;
            this.hexCube = [];
            for (var i = 0; i < level; i++) {
                for (var j = -i; j <= i; j++) {
                    for (var k = -i; k <= i; k++) {
                        for (var l = -i; l <= i; l++) {
                            if (Math.abs(j) + Math.abs(k) + Math.abs(l) == i * 2 && j + k + l == 0) {
                                this.hexCube.push([j, k, l]);
                            }
                        }
                    }
                }
            }
        }
        Object.defineProperty(LayoutManager.prototype, "numItems", {
            get: function () {
                return this.hexCube.length;
            },
            enumerable: true,
            configurable: true
        });
        LayoutManager.prototype.iconMapRefresh = function (sphereR, hexR, scroll, targetList) {
            var hexCubeOrtho = [];
            var hexCubePolar = [];
            var hexCubeSphere = [];
            var scrollX = scroll.x, scrollY = scroll.y;
            for (var i = 0; i < this.hexCube.length; i++) {
                hexCubeOrtho[i] = {
                    x: (this.hexCube[i][1] + this.hexCube[i][0] / 2) * hexR + scrollX,
                    y: Math.sqrt(3) / 2 * this.hexCube[i][0] * hexR + scrollY,
                    scale: 0
                };
            }
            for (var i = 0; i < hexCubeOrtho.length; i++) {
                hexCubePolar[i] = MathUtil.orthoToPolar(hexCubeOrtho[i].x, hexCubeOrtho[i].y);
            }
            for (var i = 0; i < hexCubePolar.length; i++) {
                var rad = hexCubePolar[i].radius / sphereR;
                if (rad < Math.PI / 2) {
                    var r = hexCubePolar[i].radius * TweenJSUtil.getValue(createjs.Ease.sineInOut, rad / (Math.PI / 2), 1.5, -0.5, 1);
                    var deepth = TweenJSUtil.getValue(createjs.Ease.cubicInOut, rad / (Math.PI / 2), 1, -0.5, 1);
                }
                else {
                    var r = hexCubePolar[i].radius;
                    var deepth = TweenJSUtil.getValue(createjs.Ease.cubicInOut, 1, 1, -0.5, 1);
                }
                hexCubeSphere[i] = {
                    radius: r,
                    depth: deepth,
                    radian: hexCubePolar[i].radian
                };
            }
            for (var i = 0; i < hexCubeSphere.length; i++) {
                hexCubeOrtho[i] = MathUtil.polarToOrtho(hexCubeSphere[i].radius, hexCubeSphere[i].radian);
            }
            for (var i = 0; i < hexCubeOrtho.length; i++) {
                hexCubeOrtho[i].x = Math.round(hexCubeOrtho[i].x * 10) / 10;
                hexCubeOrtho[i].y = Math.round(hexCubeOrtho[i].y * 10) / 10 * 1.14;
            }
            var edge = 24;
            for (var i = 0; i < hexCubeOrtho.length; i++) {
                if (Math.abs(hexCubeOrtho[i].x) > this.screenW / 2 - edge || Math.abs(hexCubeOrtho[i].y) > this.screenH / 2 - edge) {
                    hexCubeOrtho[i].scale = hexCubeSphere[i].depth * 0.4;
                }
                else if (Math.abs(hexCubeOrtho[i].x) > this.screenW / 2 - 2 * edge && Math.abs(hexCubeOrtho[i].y) > this.screenH / 2 - 2 * edge) {
                    hexCubeOrtho[i].scale = Math.min(hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineInOut, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - edge, 0.4, 0.6, edge), hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineInOut, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - edge, 0.3, 0.7, edge));
                }
                else if (Math.abs(hexCubeOrtho[i].x) > this.screenW / 2 - 2 * edge) {
                    hexCubeOrtho[i].scale = hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineOut, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - edge, 0.4, 0.6, edge);
                }
                else if (Math.abs(hexCubeOrtho[i].y) > this.screenH / 2 - 2 * edge) {
                    hexCubeOrtho[i].scale = hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineOut, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - edge, 0.4, 0.6, edge);
                }
                else {
                    hexCubeOrtho[i].scale = hexCubeSphere[i].depth;
                }
            }
            for (var i = 0; i < hexCubeOrtho.length; i++) {
                if (hexCubeOrtho[i].x < -this.screenW / 2 + 2 * edge) {
                    hexCubeOrtho[i].x += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - 2 * edge, 0, 6, 2 * edge);
                }
                else if (hexCubeOrtho[i].x > this.screenW / 2 - 2 * edge) {
                    hexCubeOrtho[i].x += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - 2 * edge, 0, -6, 2 * edge);
                }
                if (hexCubeOrtho[i].y < -this.screenH / 2 + 2 * edge) {
                    hexCubeOrtho[i].y += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - 2 * edge, 0, 8, 2 * edge);
                }
                else if (hexCubeOrtho[i].y > this.screenH / 2 - 2 * edge) {
                    hexCubeOrtho[i].y += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - 2 * edge, 0, -8, 2 * edge);
                }
            }
            for (var i = 0; i < targetList.length; i++) {
                var item = targetList[i];
                item.x = hexCubeOrtho[i].x;
                item.y = hexCubeOrtho[i].y;
                item.scale.x = item.scale.y = hexCubeOrtho[i].scale / SPRITESHEET_SCALE;
            }
        };
        return LayoutManager;
    })();
    /**
     * 数値に関するユーティリティクラスです。
     */
    var MathUtil = (function () {
        function MathUtil() {
        }
        MathUtil.polarToOrtho = function (radius, radian) {
            var x = radius * Math.cos(radian);
            var y = radius * Math.sin(radian);
            return {
                x: x,
                y: y,
                scale: 0
            };
        };
        MathUtil.orthoToPolar = function (x, y) {
            var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            var rad = Math.atan2(y, x);
            return {
                radius: r,
                radian: rad
            };
        };
        return MathUtil;
    })();
    /**
     * TweenJSのユーティリティクラスです。
     */
    var TweenJSUtil = (function () {
        function TweenJSUtil() {
        }
        /**
         * 現在時間における数値を計算します。
         * @param ease createjs.Ease のいずれかのイージング関数を指定
         * @param t    現在時間
         * @param b    開始値
         * @param c    倍数
         * @param d    トータルの時間
         * @returns {number}    数値を返します。
         */
        TweenJSUtil.getValue = function (ease, t, b, c, d) {
            return c * ease(t / d) + b;
        };
        return TweenJSUtil;
    })();
    var SpriteSheetUtil = (function () {
        function SpriteSheetUtil() {
        }
        /**
         * CreateJSのスプライトシートビルダーを使られたスプライトシートを
         * Pixi.jsのスプライトシート機能に展開するクラス。
         */
        SpriteSheetUtil.convertSpriteSheet = function (spriteSheet) {
			document.body.appendChild(spriteSheet._images[0]);
            var textureOriginal = PIXI.Texture.fromCanvas(spriteSheet._images[0]);
            for (var frameLabel in spriteSheet._data) {
                var animation = spriteSheet.getAnimation(frameLabel);
                var frame = spriteSheet.getFrame(animation.frames[0]);
                var textureSize = new PIXI.Rectangle(frame.rect.x, frame.rect.y, frame.rect.width, frame.rect.height);
                PIXI.TextureCache[frameLabel] = new PIXI.Texture(textureOriginal.baseTexture, textureSize);
            }
        };
        return SpriteSheetUtil;
    })();
})(project || (project = {}));
window.addEventListener("load", function (event) {
    new project.Main();
});
//# sourceMappingURL=main.js.map