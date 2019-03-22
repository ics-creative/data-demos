/// <reference path="pixi/pixi.d.ts" />
/// <reference path="easeljs/easeljs.d.ts" />
/// <reference path="Path.ts" />
/// <reference path="ColorUtil.ts" />

declare class Stats {
	domElement:HTMLElement;

	update();
}

window.addEventListener("load", ()=> {
	new project.Main();
});

module project {
	/**
	 * パーティクルデモのメインクラスです。
	 * @class project.Main
	 */
	export class Main {
		private stage:PIXI.Stage;
		private renderer:PIXI.IPixiRenderer;
		public stats:Stats;

		/**
		 * @constructor
		 */
		constructor() {

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
			//createjs.Ticker.framerate = 60;
			//createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
			createjs.Ticker.on("tick", this.handleTick, this);

			this.stats = new Stats();
			document.body.appendChild(this.stats.domElement);

			// リサイズイベント
			this.handleResize();
			window.addEventListener("resize", ()=> {
				this.handleResize()
			});
		}

		/**
		 * エンターフレームイベント
		 */
		private handleTick():void {
			// create residual image effect
			this.renderer.render(this.stage);

			this.stats.update();
		}

		/**
		 * リサイズイベント
		 */
		private handleResize():void {
			(<PIXI.WebGLRenderer> this.renderer).resize(innerWidth, innerHeight);
		}
	}


	/**
	 * 大量のパーティクルを発生させてみた
	 * マウスを押してる間でてくるよ
	 * @see http://wonderfl.net/c/4WjT
	 * @class demo.ParticleSample
	 */
	class ParticleSample extends PIXI.DisplayObjectContainer {
		private _emitter:ParticleEmitter;
		private _bg:PIXI.Graphics;
		private _count:number;
		private _lines:createjs.Shape;
		private _linePoint:any[];
		private _isDown:boolean;
		private _shadow:PIXI.Sprite;
		private stageEaselJS:createjs.Stage;
		private canvasForDisplay:HTMLCanvasElement;
		private canvasForFadeout:HTMLCanvasElement;
		private pathList:Path[];
		private mousePositions:{x:number;y:number;isDown:boolean}[];

		constructor() {
			super();

			// パーティクルを初期化
			ParticleInitializer.generate();

			this.interactive = true;

			this._count = 0;

			this._bg = new PIXI.Graphics();
			this.addChild(this._bg);

			this.canvasForDisplay = document.createElement("canvas");
			this.canvasForDisplay.className = "hoge";
			this.canvasForFadeout = document.createElement("canvas");
			this.canvasForDisplay.style.pointerEvents = "none";
			var canvasForEasel = document.createElement("canvas");
			this.stageEaselJS = new createjs.Stage(canvasForEasel);
			document.body.appendChild(this.canvasForDisplay);

			var max = 1500;
			this.pathList = [];
			this.mousePositions = [];
			for (var i = 0; i < max; i++) {
				var p = new Path();
				p.setup(0, 0, 0.3 + i / max * 0.5, (180 * Math.random() >> 0), (i + 1) / max);
				this.pathList.push(p);
			}


			this._lines = new createjs.Shape();
			this.stageEaselJS.addChild(this._lines);
			this._linePoint = [];

			this._emitter = new ParticleEmitter();
			this._emitter.latestX = innerWidth / 2;
			this._emitter.latestY = innerHeight / 2;
			this.addChild(this._emitter.container);

			this._shadow = new PIXI.Sprite(PIXI.Texture.fromImage("imgs/Shadow-assets/Shadow.png"));
			this._shadow.blendMode = PIXI.blendModes.SCREEN;
			this.addChild(this._shadow);

			this.mousedown = this.touchstart = (data:PIXI.InteractionData)=> {
				this.handleMouseDown(data);
			};
			this.mousemove = this.touchmove = (data:PIXI.InteractionData)=> {
				this.handleMouseMove(data);
			};
			this.mouseup = this.mouseupoutside = this.touchend = this.touchendoutside = (data:PIXI.InteractionData)=> {
				this.handleMouseUp(data);
			};

			createjs.Ticker.on("tick", this.enterFrameHandler, this);

			this.handleResize();
			window.addEventListener("resize", ()=> {
				this.handleResize();
			});
		}


		/**
		 * エンターフレームイベント
		 * @param event
		 */
		enterFrameHandler(event):void {

			if (this._isDown) {
				this.createParticle();
			}

			this.mousePositions.unshift({x: this._emitter.latestX, y: this._emitter.latestY, isDown: this._isDown});

			for (var i = 0; i < this.pathList.length; i++) {
				var p = this.pathList[i];

				if (this.mousePositions.length > p.delayFrame) {
					var position = this.mousePositions[p.delayFrame];
					//    マウスの位置更新
					p.setMousePosition(position.x, position.y, !position.isDown);
					p.update();
				}
			}

			var gCurve = this._lines.graphics;
			gCurve.clear();
			gCurve.setStrokeStyle(1)

			for (var i = 0; i < this.pathList.length; i++) {
				var p = this.pathList[i];

				// マウスの軌跡を変数に保存
				var p0x = p.point.x;
				var p0y = p.point.y;
				var p1x = p.prev.x;
				var p1y = p.prev.y;
				var p2x = p.prev2.x;
				var p2y = p.prev2.y;

				if (p0x == p2x || p0y == p2y)
					continue;
				if (p0x == p1x || p0y == p1y)
					continue;

				// カーブ用の頂点を割り出す
				var curveStartX = (p2x + p1x) / 2;
				var curveStartY = (p2y + p1y) / 2;
				var curveEndX = (p0x + p1x) / 2;
				var curveEndY = (p0y + p1y) / 2;

				// カーブは中間点を結ぶ。マウスの座標は制御点として扱う。
				var colorLine = createjs.Graphics.getHSL(
					180,
					100,
					100,
					p.percent
				);

				gCurve
					.beginStroke(colorLine)
					.moveTo(curveStartX, curveStartY)
					.curveTo(p1x, p1y, curveEndX, curveEndY)
					.endStroke();
			}


			var color1 = {h: new Date().getTime() / 40, s: 30, l: 40};
			var color2 = {h: (new Date().getTime() + 40 * 89) / 40, s: 70, l: 70};

			this._bg.clear();

			// グラデーションを作るための無理矢理な手法
			for (var i = 0, max = 1024; i < max; i++) {

				var color = ColorUtil.hslToRgb(
					color1.h * (i / max) + color2.h * (1 - i / max),
					color1.s * (i / max) + color2.s * (1 - i / max),
					color1.l * (i / max) + color2.l * (1 - i / max));

				this._bg.beginFill(color, 1.0);
				this._bg.drawRect(0, window.innerHeight * i / max, window.innerWidth, window.innerHeight / max);
			}

			this._emitter.update();

			if (this._isDown) {
				this._linePoint.push({
					x: this._emitter.x,
					y: this._emitter.y,
					vx: this._emitter.vx,
					vy: this._emitter.vy,
					angular: this._emitter.angular
				});
			} else {
				this._linePoint.shift();
			}


			if (max > 200) {
				this._linePoint.shift();
			}


			var contextForDisplay = this.canvasForDisplay.getContext("2d");
			var contextFadeout = this.canvasForFadeout.getContext("2d");
			contextForDisplay.globalCompositeOperation = "source-over";
			contextForDisplay.setTransform(1, 0, 0, 1, 0, 0);
			contextForDisplay.fillStyle = "rgba(0, 0, 0, 0.1)";
			//contextForDisplay.globalAlpha = 0.92;
			//contextForDisplay.clearRect(0, 0, innerWidth, innerHeight);
			contextForDisplay.fillRect(0, 0, innerWidth, innerHeight);

			contextForDisplay.drawImage(<HTMLCanvasElement>this.stageEaselJS.canvas, 0, 0);
			//contextForDisplay.drawImage(this.canvasForFadeout, 0, 0);

			//contextFadeout.clearRect(0, 0, innerWidth, innerHeight);
			//contextFadeout.drawImage(this.canvasForDisplay, 0, 0);
			//contextFadeout.globalAlpha = 1.0;
			//contextFadeout.drawImage(<HTMLCanvasElement>this.stageEaselJS.canvas, 0, 0);

			this.stageEaselJS.update();
		}


		private handleMouseDown(event:PIXI.InteractionData):void {
			this._isDown = true;

			this._emitter.x = event.global.x;
			this._emitter.y = event.global.y;
			this._emitter.latestX = event.global.x;
			this._emitter.latestY = event.global.y;
		}

		private handleMouseMove(event:PIXI.InteractionData):void {
			this._emitter.latestX = event.global.x;
			this._emitter.latestY = event.global.y;
		}

		private handleMouseUp(event:PIXI.InteractionData):void {
			this._isDown = false;

			this._emitter.latestX = event.global.x;
			this._emitter.latestY = event.global.y;
		}

		private createParticle():void {
			this._emitter.emit(this._emitter.latestX, this._emitter.latestY);
		}

		private handleResize():void {
			this._shadow.scale.x = (window.innerWidth / 1024);
			this._shadow.scale.y = (window.innerHeight / 1024);

			(<HTMLCanvasElement>this.stageEaselJS.canvas).width = innerWidth;
			(<HTMLCanvasElement>this.stageEaselJS.canvas).height = innerHeight;
			this.canvasForDisplay.width = innerWidth;
			this.canvasForDisplay.height = innerHeight;
			this.canvasForFadeout.width = innerWidth;
			this.canvasForFadeout.height = innerHeight;
		}
	}

	/**
	 * パーティクル発生装置。マウス座標から速度を計算する。
	 * @class project.Emitter
	 */
	class Emitter {
		/** 速度(X方向) */
		vy:number = 0;
		/** 速度(Y方向) */
		x:number = 0;
		/** マウスのX座標 */
		latestY:number = 0;
		/** マウスのY座標 */
		latestX:number = 0;
		/** パーティクル発生のX座標 */
		y:number = 0;
		/** パーティクル発生のY座標 */
		vx:number = 0;

		/** 現在のベクトルの角度 */
		angular:number = 0;
		/** 角速度 */
		vAngular:number = 0;

		/**
		 * @constructor
		 */
		constructor() {
		}

		/**
		 * パーティクルエミッターの計算を行います。この計算によりマウスの引力が計算されます。
		 * @method
		 */
		update():void {
			var dx:number = this.latestX - this.x;
			var dy:number = this.latestY - this.y;
			var d:number = Math.sqrt(dx * dx + dy * dy) * 0.2;
			var rad:number = Math.atan2(dy, dx);

			this.vx += Math.cos(rad) * d;
			this.vy += Math.sin(rad) * d;

			this.vx *= 0.4;
			this.vy *= 0.4;

			this.x += this.vx;
			this.y += this.vy;

			this.vAngular = rad - this.angular;
			this.angular = rad;
		}
	}


	/**
	 * パーティクルエミッター
	 * @class project.ParticleEmitter
	 */
	class ParticleEmitter extends Emitter {
		/** 1フレーム間に発生させる Particle 数 */
		numParticles:number;
		container:PIXI.DisplayObjectContainer;
		PRE_CACHE_PARTICLES:number;
		_particleActive:Particle[];
		_particlePool:Particle[];

		/**
		 * @constructor
		 */
		constructor() {
			super();

			this.numParticles = 10;
			this.PRE_CACHE_PARTICLES = 300;

			this.container = new PIXI.DisplayObjectContainer();

			this._particleActive = [];
			this._particlePool = [];

			/* 予め必要そうな分だけ作成しておく */
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
		emit(x:number, y:number) {
			for (var i = 0; i < this.numParticles; i++) {
				this.getNewParticle(x, y);
			}
		}

		/**
		 * パーティクルを更新します。
		 * @method
		 */
		update() {

			super.update();

			for (var i = 0; i < this._particleActive.length; i++) {
				var p = this._particleActive[i];
				if (!p.getIsDead()) {

					if (p.y >= window.innerHeight) {
						p.vy *= -0.9;
						p.y = window.innerHeight;
					} else if (p.y <= 0) {
						p.vy *= -0.9;
						p.y = 0;
					}
					if (p.x >= window.innerWidth) {
						p.vx *= -0.9;
						p.x = window.innerWidth;
					} else if (p.x <= 0) {
						p.vx *= -0.9;
						p.x = 0;
					}

					p.update();
				} else {
					this.removeParticle(p);
				}
			}
		}

		/**
		 * パーティクルを追加します。
		 * @param {THREE.Vector3} emitPoint
		 * @method
		 */
		getNewParticle(emitX:number, emitY:number) {
			var p:Particle = this.fromPool();
			p.resetParameters(this.x, this.y, this.vx, this.vy, this.vAngular);
			this._particleActive.push(p);
			this.container.addChild(p);
			return p;
		}

		/**
		 * パーティクルを削除します。
		 * @param {Particle} particle
		 * @method
		 */
		removeParticle(p:Particle) {

			this.container.removeChild(p);

			var index = this._particleActive.indexOf(p);
			if (index > -1) {
				this._particleActive.splice(index, 1);
			}

			this.toPool(p);
		}

		/**
		 * アクティブなパーティクルを取り出します。
		 * @returns {project.Particle[]}
		 * @method
		 */
		getActiveParticles():Particle[] {
			return this._particleActive;
		}


		/**
		 * プールからインスタンスを取り出します。
		 * プールになければ新しいインスタンスを作成します。
		 * @returns {project.Particle}
		 * @method
		 */
		fromPool():Particle {
			if (this._particlePool.length > 0)
				return this._particlePool.shift();

			else return new Particle();
		}

		/**
		 * プールにインスタンスを格納します。
		 * @param {project.Particle}
		 * @method
		 */
		toPool(particle:Particle) {
			this._particlePool.push(particle);
		}
	}

	class ParticleInitializer {
		static NUM_PARTICLE:number = 200;

		static generate() {
			var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
			spriteSheetBuilder.padding = 2;


			for (var i = 0; i < ParticleInitializer.NUM_PARTICLE; i++) {
				var shape = new createjs.Shape();
				var size = Math.random() * Math.random() * Math.random() * 80 + 2;

				var colorHsl:string = createjs.Graphics.getHSL(
					160 + 20 * Math.random(),
					0 + Math.random() * 20,
					50 + Math.random() * 50);

				shape.graphics.clear();

				// 円
				if (Math.random() < 0.7) {
					if (Math.random() < 0.3) {
						// もやっとした円
						shape.graphics.beginRadialGradientFill([colorHsl, "#000000"], [0.0, 1.0], 0, 0, size / 10, 0, 0, size);
					}
					else if (Math.random() < 0.5) {
						// キリッとした円
						shape.graphics.beginFill(colorHsl);
					} else {
						// 輪郭だけの円
						shape.graphics
							.setStrokeStyle(2) // 線の太さ
							.beginStroke(createjs.Graphics.getRGB(255, 255, 255))
					}

					shape.graphics.drawCircle(0, 0, size);
					shape.graphics.endFill();
				}
				// 四角形
				else if (Math.random() < 0.5) {
					if (Math.random() < 0.1) {
						// キリッとした円
						shape.graphics.beginFill(colorHsl);
					} else {
						// 輪郭だけの円
						shape.graphics
							.setStrokeStyle(2) // 線の太さ
							.beginStroke(createjs.Graphics.getRGB(255, 255, 255))
					}

					shape.graphics
						.drawRect(-size, -size, size * 2, size * 2)
						.endFill();
				}
				// 三角形
				else {
					if (Math.random() < 0.5) {
						// キリッとした円
						shape.graphics.beginFill(colorHsl);
					} else {
						// 輪郭だけの円
						shape.graphics
							.setStrokeStyle(2) // 線の太さ
							.beginStroke(createjs.Graphics.getRGB(255, 255, 255))
					}

					var takasa = size * Math.sin(Math.PI / 3);

					shape.graphics
						.moveTo(-size / 2, size / 2)
						.lineTo(0, size / 2 - takasa)
						.lineTo(+size / 2, size / 2)
						.closePath()
						.endFill();
				}


				var padding = 4;
				shape.cache(-size - padding, -size - padding, size * 2 + padding * 2, size * 2 + padding * 2);

				var frameNum = spriteSheetBuilder.addFrame(shape);
				spriteSheetBuilder.addAnimation("particle_" + i, [frameNum]);
			}

			spriteSheetBuilder.build();
			ParticleInitializer.convertSpriteSheet(spriteSheetBuilder.spriteSheet)
		}

		/**
		 * CreateJSのスプライトシートビルダーを使られたスプライトシートを
		 * Pixi.jsのスプライトシート機能に展開するクラス。
		 */
		static convertSpriteSheet(spriteSheet:any):void {
			var textureOriginal = PIXI.Texture.fromCanvas(spriteSheet._images[0]);

			for (var frameLabel in spriteSheet._data) {
				var animation = spriteSheet.getAnimation(frameLabel);
				var frame = spriteSheet.getFrame(animation.frames[0]);
				var textureSize = new PIXI.Rectangle(frame.rect.x, frame.rect.y, frame.rect.width, frame.rect.height);
				PIXI.TextureCache[frameLabel] = new PIXI.Texture(textureOriginal.baseTexture, textureSize);
			}
		}
	}


	/**
	 * @class demo.Particle
	 */
	class Particle extends PIXI.Sprite {
		public vx:number;
		public vy:number;
		public life:number;
		public size:number;

		private _count:number;
		private _destroy:boolean;
		private _vAngular:number;

		/**
		 * コンストラクタ
		 * @constructor
		 */
		constructor() {
			var texture = PIXI.Texture.fromFrame("particle_" + (ParticleInitializer.NUM_PARTICLE * Math.random() >> 0));
			super(texture);

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
		public resetParameters(emitX:number, emitY:number, vx:number, vy:number, vAngular:number):void {

			this.x = emitX;
			this.y = emitY;
			this.vx = vx * 0.5 + (Math.random() - 0.5) * 10;
			this.vy = vy * 0.5 + (Math.random() - 0.5) * 10;
			this.life = Math.random() * Math.random() * 120 + 4;
			this._count = 0;
			this._destroy = false;
			this.rotation = 360 * Math.random();
			this._vAngular = vAngular;

			this.alpha = 1.0;
			this.scale.x = this.scale.y = 1.0;
		}

		/**
		 * パーティクル個別の内部計算を行います。
		 * @method
		 */
		public update():void {

			// Gravity
			this.vy += 0.2;

			this.x += this.vx;
			this.y += this.vy;
			this.rotation += this._vAngular;

			this._count++;

			var maxD:number = (1 - this._count / this.life * 1 / 3);

			this.alpha = Math.random() * 0.4 + 0.6 * this._count / this.life;
			this.scale.x = this.scale.y = maxD;

			// 死亡フラグ
			if (this.life < this._count) {
				this._destroy = true;
				this.parent.removeChild(this);
			}
		}

		/**
		 * パーティクルが死んでいるかどうかを確認します。
		 * @returns {boolean}
		 * @method
		 */
		getIsDead():boolean {
			return this._destroy;
		}
	}


}

