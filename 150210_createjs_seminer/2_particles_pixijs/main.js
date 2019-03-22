/// <reference path="libs/pixi/pixi.d.ts" />
/// <reference path="libs/easeljs/easeljs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.addEventListener("load", function () {
    new project.Main();
});
var project;
(function (project) {
    /** 1フレーム間に発生させる Particle 数 */
    var NUM_PARTICLES = 100;
    /** パフォーマンスチェック用のインスタンス */
    var elementStats;
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
            // パフォーマンスチェック用のインスタンス
            elementStats = document.getElementById("stats");
            this.stage = new PIXI.Stage(0x0);
            var options = {
                view: null,
                transparent: false,
                resolution: 1
            };
            this.renderer = PIXI.autoDetectRenderer(800, 600, options);
            document.body.appendChild(this.renderer.view);
            // パーティクルサンプルを作成
            var sample = new ParticleSample();
            this.stage.addChild(sample);
            // Tickerを作成
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.on("tick", this.handleTick, this);
            // リサイズイベント
            this.handleResize();
            window.addEventListener("resize", function () {
                _this.handleResize();
            });
        }
        /**
         * エンターフレームイベント
         */
        Main.prototype.handleTick = function () {
            // create residual image effect
            this.renderer.render(this.stage);
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
    /**
     * 大量のパーティクルを発生させてみた
     * マウスを押してる間でてくるよ
     * @see http://wonderfl.net/c/4WjT
     * @class demo.ParticleSample
     */
    var ParticleSample = (function (_super) {
        __extends(ParticleSample, _super);
        function ParticleSample() {
            var _this = this;
            _super.call(this);
            // パーティクルを初期化
            ParticleInitializer.generate();
            this.interactive = true;
            this._count = 0;
            this._bg = new PIXI.Graphics();
            this.addChild(this._bg);
            this._emitter = new ParticleEmitter();
            this._emitter.latestX = innerWidth / 2;
            this._emitter.latestY = innerHeight / 2;
            this.addChild(this._emitter.container);
            this.mousedown = this.touchstart = function (data) {
                _this.handleMouseDown(data);
            };
            this.mousemove = this.touchmove = function (data) {
                _this.handleMouseMove(data);
            };
            this.mouseup = this.mouseupoutside = this.touchend = this.touchendoutside = function (data) {
                _this.handleMouseUp(data);
            };
            createjs.Ticker.on("tick", this.enterFrameHandler, this);
            this.handleResize();
            window.addEventListener("resize", function () {
                _this.handleResize();
            });
        }
        /**
         * エンターフレームイベント
         * @param event
         */
        ParticleSample.prototype.enterFrameHandler = function (event) {
            this.createParticle();
            // 背景
            var color1 = { h: (new Date().getTime() + 40 * 60) / 40, s: 90, l: 80 };
            var color2 = { h: new Date().getTime() / 40, s: 80, l: 60 };
            this._bg.clear();
            for (var i = 0, max = 1024; i < max; i++) {
                var color = ColorUtil.hslToRgb(color1.h * (i / max) + color2.h * (1 - i / max), color1.s * (i / max) + color2.s * (1 - i / max), color1.l * (i / max) + color2.l * (1 - i / max));
                this._bg.beginFill(color, 1.0);
                //this._bg.beginLinearGradientFill([color1, color2], [0, 1], 0, 0, 0, window.innerHeight);
                this._bg.drawRect(0, window.innerHeight * i / max, window.innerWidth, window.innerHeight / max);
            }
            this._emitter.update();
        };
        ParticleSample.prototype.handleMouseDown = function (event) {
            this._isDown = true;
            this._emitter.latestX = event.global.x;
            this._emitter.latestY = event.global.y;
        };
        ParticleSample.prototype.handleMouseMove = function (event) {
            this._emitter.latestX = event.global.x;
            this._emitter.latestY = event.global.y;
        };
        ParticleSample.prototype.handleMouseUp = function (event) {
            this._isDown = false;
            this._emitter.latestX = event.global.x;
            this._emitter.latestY = event.global.y;
        };
        ParticleSample.prototype.createParticle = function () {
            this._emitter.emit(this._emitter.latestX, this._emitter.latestY);
        };
        ParticleSample.prototype.handleResize = function () {
        };
        return ParticleSample;
    })(PIXI.DisplayObjectContainer);
    /**
     * パーティクル発生装置。マウス座標から速度を計算する。
     * @class project.Emitter
     */
    var Emitter = (function () {
        /**
         * @constructor
         */
        function Emitter() {
            /** 速度(X方向) */
            this.vy = 0;
            /** 速度(Y方向) */
            this.x = 0;
            /** マウスのX座標 */
            this.latestY = 0;
            /** マウスのY座標 */
            this.latestX = 0;
            /** パーティクル発生のX座標 */
            this.y = 0;
            /** パーティクル発生のY座標 */
            this.vx = 0;
            /** 現在のベクトルの角度 */
            this.angular = 0;
            /** 角速度 */
            this.vAngular = 0;
        }
        /**
         * パーティクルエミッターの計算を行います。この計算によりマウスの引力が計算されます。
         * @method
         */
        Emitter.prototype.update = function () {
            var dx = this.latestX - this.x;
            var dy = this.latestY - this.y;
            var d = Math.sqrt(dx * dx + dy * dy) * 0.2;
            var rad = Math.atan2(dy, dx);
            this.vx += Math.cos(rad) * d;
            this.vy += Math.sin(rad) * d;
            this.vx *= 0.4;
            this.vy *= 0.4;
            this.x += this.vx;
            this.y += this.vy;
            this.vAngular = rad - this.angular;
            this.angular = rad;
        };
        return Emitter;
    })();
    /**
     * パーティクルエミッター
     * @class project.ParticleEmitter
     */
    var ParticleEmitter = (function (_super) {
        __extends(ParticleEmitter, _super);
        /**
         * @constructor
         */
        function ParticleEmitter() {
            _super.call(this);
            this.numParticles = NUM_PARTICLES;
            this.PRE_CACHE_PARTICLES = 300;
            this.container = new PIXI.DisplayObjectContainer();
            this._particleActive = [];
            this._particlePool = [];
            for (var i = 0; i < this.PRE_CACHE_PARTICLES; i++) {
                this._particlePool.push(new Particle());
            }
        }
        /**
         * パーティクルを発生させます。
         * @param {number} x パーティクルの発生座標
         * @param {number} y パーティクルの発生座標
         * @method
         */
        ParticleEmitter.prototype.emit = function (x, y) {
            for (var i = 0; i < this.numParticles; i++) {
                this.getNewParticle(x, y);
            }
        };
        /**
         * パーティクルを更新します。
         * @method
         */
        ParticleEmitter.prototype.update = function () {
            _super.prototype.update.call(this);
            for (var i = 0; i < this._particleActive.length; i++) {
                var p = this._particleActive[i];
                if (!p.getIsDead()) {
                    if (p.y >= window.innerHeight) {
                        p.vy *= -0.9;
                        p.y = window.innerHeight;
                    }
                    else if (p.y <= 0) {
                        p.vy *= -0.9;
                        p.y = 0;
                    }
                    if (p.x >= window.innerWidth) {
                        p.vx *= -0.9;
                        p.x = window.innerWidth;
                    }
                    else if (p.x <= 0) {
                        p.vx *= -0.9;
                        p.x = 0;
                    }
                    p.update();
                }
                else {
                    this.removeParticle(p);
                }
            }
            // パフォーマンスチェック用
            elementStats.innerHTML = this.container.children.length + "";
        };
        /**
         * パーティクルを追加します。
         * @param {THREE.Vector3} emitPoint
         * @method
         */
        ParticleEmitter.prototype.getNewParticle = function (emitX, emitY) {
            var p = this.fromPool();
            p.resetParameters(this.x, this.y, this.vx, this.vy, this.vAngular);
            this._particleActive.push(p);
            this.container.addChild(p);
            return p;
        };
        /**
         * パーティクルを削除します。
         * @param {Particle} particle
         * @method
         */
        ParticleEmitter.prototype.removeParticle = function (p) {
            this.container.removeChild(p);
            var index = this._particleActive.indexOf(p);
            if (index > -1) {
                this._particleActive.splice(index, 1);
            }
            this.toPool(p);
        };
        /**
         * アクティブなパーティクルを取り出します。
         * @returns {project.Particle[]}
         * @method
         */
        ParticleEmitter.prototype.getActiveParticles = function () {
            return this._particleActive;
        };
        /**
         * プールからインスタンスを取り出します。
         * プールになければ新しいインスタンスを作成します。
         * @returns {project.Particle}
         * @method
         */
        ParticleEmitter.prototype.fromPool = function () {
            if (this._particlePool.length > 0)
                return this._particlePool.shift();
            else
                return new Particle();
        };
        /**
         * プールにインスタンスを格納します。
         * @param {project.Particle}
         * @method
         */
        ParticleEmitter.prototype.toPool = function (particle) {
            this._particlePool.push(particle);
        };
        return ParticleEmitter;
    })(Emitter);
    var ParticleInitializer = (function () {
        function ParticleInitializer() {
        }
        ParticleInitializer.generate = function () {
            var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
            spriteSheetBuilder.padding = 2;
            for (var i = 0; i < ParticleInitializer.NUM_PARTICLE; i++) {
                var shape = new createjs.Shape();
                var size = Math.random() * Math.random() * Math.random() * 80 + 2;
                var colorHsl = createjs.Graphics.getHSL(0, 0, 50 + Math.random() * 50);
                shape.graphics.clear();
                if (Math.random() < 0.3) {
                    // もやっとした円
                    shape.graphics.beginRadialGradientFill([colorHsl, "#000000"], [0.0, 1.0], 0, 0, size / 10, 0, 0, size);
                }
                else if (Math.random() < 0.5) {
                    // キリッとした円
                    shape.graphics.beginFill(colorHsl);
                }
                else {
                    // 輪郭だけの円
                    shape.graphics.setStrokeStyle(2).beginStroke(createjs.Graphics.getRGB(255, 255, 255));
                }
                shape.graphics.drawCircle(0, 0, size);
                shape.graphics.endFill();
                var padding = 4;
                shape.cache(-size - padding, -size - padding, size * 2 + padding * 2, size * 2 + padding * 2);
                var frameNum = spriteSheetBuilder.addFrame(shape);
                spriteSheetBuilder.addAnimation("particle_" + i, [frameNum]);
            }
            spriteSheetBuilder.build();
            ParticleInitializer.convertSpriteSheet(spriteSheetBuilder.spriteSheet);
        };
        /**
         * CreateJSのスプライトシートビルダーを使られたスプライトシートを
         * Pixi.jsのスプライトシート機能に展開するクラス。
         */
        ParticleInitializer.convertSpriteSheet = function (spriteSheet) {
            var textureOriginal = PIXI.Texture.fromCanvas(spriteSheet._images[0]);
            for (var frameLabel in spriteSheet._data) {
                var animation = spriteSheet.getAnimation(frameLabel);
                var frame = spriteSheet.getFrame(animation.frames[0]);
                var textureSize = new PIXI.Rectangle(frame.rect.x, frame.rect.y, frame.rect.width, frame.rect.height);
                PIXI.TextureCache[frameLabel] = new PIXI.Texture(textureOriginal.baseTexture, textureSize);
            }
        };
        ParticleInitializer.NUM_PARTICLE = 200;
        return ParticleInitializer;
    })();
    /**
     * @class demo.Particle
     */
    var Particle = (function (_super) {
        __extends(Particle, _super);
        /**
         * コンストラクタ
         * @constructor
         */
        function Particle() {
            var texture = PIXI.Texture.fromFrame("particle_" + (ParticleInitializer.NUM_PARTICLE * Math.random() >> 0));
            _super.call(this, texture);
            this.blendMode = PIXI.blendModes.SCREEN;
            this.pivot.x = texture.frame.width / 2;
            this.pivot.y = texture.frame.height / 2;
            this._destroy = true;
        }
        /**
         * パーティクルをリセットします。
         * @param emitX
         * @param emitY
         * @param vx
         * @param vy
         * @param vAngular
         */
        Particle.prototype.resetParameters = function (emitX, emitY, vx, vy, vAngular) {
            this.x = emitX;
            this.y = emitY;
            this.vx = vx * 0.5 + (Math.random() - 0.5) * 10;
            this.vy = vy * 0.5 + (Math.random() - 0.5) * 10;
            this.life = Math.random() * Math.random() * 120 + 4;
            this._count = 0;
            this._destroy = false;
            this.alpha = 1.0;
            this.scale.x = this.scale.y = 1.0;
        };
        /**
         * パーティクル個別の内部計算を行います。
         * @method
         */
        Particle.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            this._count++;
            var maxD = (1 - this._count / this.life * 1 / 3);
            this.alpha = Math.random() * 0.6 + 0.4;
            this.scale.x = this.scale.y = maxD;
            // 死亡フラグ
            if (this.life < this._count) {
                this._destroy = true;
                this.parent.removeChild(this);
            }
        };
        /**
         * パーティクルが死んでいるかどうかを確認します。
         * @returns {boolean}
         * @method
         */
        Particle.prototype.getIsDead = function () {
            return this._destroy;
        };
        return Particle;
    })(PIXI.Sprite);
    var ColorUtil = (function () {
        function ColorUtil() {
        }
        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         *
         * @param   Number  h       The hue (0-360)
         * @param   Number  s       The saturation (0-100)
         * @param   Number  l       The lightness (0-100)
         * @return  number           The RGB representation
         */
        ColorUtil.hslToRgb = function (h, s, l) {
            h = h % 360;
            var m1, m2, hue;
            var r, g, b;
            s /= 100;
            l /= 100;
            if (s == 0) {
                r = g = b = (l * 255);
            }
            else {
                if (l <= 0.5)
                    m2 = l * (s + 1);
                else
                    m2 = l + s - l * s;
                m1 = l * 2 - m2;
                hue = h / 360;
                r = Math.round(ColorUtil.hueToRgb(m1, m2, hue + 1 / 3));
                g = Math.round(ColorUtil.hueToRgb(m1, m2, hue));
                b = Math.round(ColorUtil.hueToRgb(m1, m2, hue - 1 / 3));
            }
            var color = (r << 16) | (g << 8) | b;
            return color;
        };
        ColorUtil.hueToRgb = function (m1, m2, hue) {
            var v;
            if (hue < 0)
                hue += 1;
            else if (hue > 1)
                hue -= 1;
            if (6 * hue < 1)
                v = m1 + (m2 - m1) * hue * 6;
            else if (2 * hue < 1)
                v = m2;
            else if (3 * hue < 2)
                v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
            else
                v = m1;
            return 255 * v;
        };
        return ColorUtil;
    })();
})(project || (project = {}));
//# sourceMappingURL=main.js.map