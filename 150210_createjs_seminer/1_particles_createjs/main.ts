///<reference path="libs/easeljs/easeljs.d.ts" />

window.onload = ()=> {
	new project.Main();
};

module project {

	/** 1フレーム間に発生させる Particle 数 */
	var NUM_PARTICLES:number = 50;

	/** パフォーマンスチェック用のインスタンス */
	var elementStats:HTMLElement;

	/**
	 * パーティクルデモのメインクラスです。
	 * @class project.Main
	 */
	export class Main {
		stage:createjs.Stage;

		/**
		 * @constructor
		 */
		constructor() {

			// パフォーマンスチェック用のインスタンス
			elementStats = document.getElementById("stats");

			// 初期設定
			this.stage = new createjs.Stage(<HTMLCanvasElement> document.getElementById("myCanvas"));

			if (createjs.Touch.isSupported()) {
				createjs.Touch.enable(this.stage);
			}

			// パーティクルサンプルを作成
			var sample = new ParticleSample();
			this.stage.addChild(sample);

			// Tickerを作成
			createjs.Ticker.setFPS(60);
			createjs.Ticker.timingMode = createjs.Ticker.RAF;
			createjs.Ticker.addEventListener("tick", ()=> {
				this.handleTick()
			});

			// リサイズイベント
			this.handleResize();
			window.addEventListener("resize", ()=> {
				this.handleResize()
			});
		}

		/**
		 * エンターフレームイベント
		 */
		handleTick():void {
			// create residual image effect
			this.stage.update();
		}

		/**
		 * リサイズイベント
		 */
		handleResize():void {
			this.stage.canvas.width = window.innerWidth;
			this.stage.canvas.height = window.innerHeight;
		}
	}


	/**
	 * 大量のパーティクルを発生させてみた
	 * マウスを押してる間でてくるよ
	 * @see http://wonderfl.net/c/4WjT
	 * @class demo.ParticleSample
	 */
	export class ParticleSample extends createjs.Container {
		private _emitter:ParticleEmitter;
		private _eventMouseDown:Function;
		private _bg:createjs.Shape;

		constructor() {
			super();

			this._bg = new createjs.Shape();
			this.addChild(this._bg);

			this._emitter = new ParticleEmitter();
			this.addChild(this._emitter.container);

			this.on("tick", this.enterFrameHandler, this);
			this.on("mousedown", this.mouseDown, this);
			this.on("pressup", this.mouseUp, this);

			this.handleResize();
			window.addEventListener("resize", ()=> {
				this.handleResize();
			});
		}

		/**
		 * エンターフレームイベント
		 * @param event
		 */
		private enterFrameHandler(event):void {
			this._emitter.latestX = this.getStage().mouseX;
			this._emitter.latestY = this.getStage().mouseY;

			this._emitter.update();

			// 背景
			var color1 = createjs.Graphics.getHSL(new Date().getTime() / 40, 80, 60);
			var color2 = createjs.Graphics.getHSL((new Date().getTime() + 40 * 60) / 40, 90, 80);

			this._bg.graphics
				.clear()
				.beginLinearGradientFill([color1, color2], [0, 1], 0, 0, 0, window.innerHeight)
				.drawRect(0, 0, window.innerWidth, window.innerHeight);
		}

		private  mouseDown(event:createjs.MouseEvent):void {
			this._eventMouseDown = this.on("tick", this.createParticle, this);
		}

		private  mouseUp(event:createjs.MouseEvent):void {
			this.off("tick", this._eventMouseDown);
		}

		private  createParticle(event:createjs.Event):void {
			this._emitter.emit(this.getStage().mouseX, this.getStage().mouseY);
		}

		private handleResize() {

		}
	}

	/**
	 * パーティクル発生装置。マウス座標から速度を計算する。
	 * @class project.Emitter
	 */
	class Emitter {
		/** 速度(X方向) */
		public vy:number = 0;
		/** 速度(Y方向) */
		public x:number = 0;
		/** マウスのX座標 */
		public latestY:number = 0;
		/** マウスのY座標 */
		public latestX:number = 0;
		/** パーティクル発生のX座標 */
		public y:number = 0;
		/** パーティクル発生のY座標 */
		public vx:number = 0;

		/**
		 * @constructor
		 */
		constructor() {
		}

		/**
		 * パーティクルエミッターの計算を行います。この計算によりマウスの引力が計算されます。
		 * @method
		 */
		public update():void {

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
		}
	}

	/**
	 * パーティクルエミッター
	 * @class project.ParticleEmitter
	 */
	class ParticleEmitter extends Emitter {
		/** 1フレーム間に発生させる Particle 数 */
		public numParticles:number = NUM_PARTICLES;
		public container:createjs.Container;
		private PRE_CACHE_PARTICLES:number = 300;
		private _particleActive:Particle[];
		private _particlePool:Particle[];

		/**
		 * @constructor
		 */
		constructor() {
			super();

			this.container = new createjs.Container();

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
		public emit(x:number, y:number) {
			for (var i = 0; i < this.numParticles; i++) {
				this.getNewParticle(x, y);
			}
		}

		/**
		 * パーティクルを更新します。
		 * @method
		 */
		public update() {

			super.update();

			for (var i = 0; i < this._particleActive.length; i++) {
				var p = this._particleActive[i];
				if (!p.getIsDead()) {

					if (p.y >= window.innerHeight) {
						p.vy *= -0.8;
						p.y = window.innerHeight;
					} else if (p.y <= 0) {
						p.vy *= -0.8;
						p.y = 0;
					}
					if (p.x >= window.innerWidth) {
						p.vx *= -0.8;
						p.y = window.innerWidth;
					} else if (p.x <= 0) {
						p.vx *= -0.8;
						p.x = 0;
					}

					p.update();
				} else {
					this.removeParticle(p);
				}
			}

			// パフォーマンスチェック用
			elementStats.innerHTML = this.container.getNumChildren() + "";
		}

		/**
		 * パーティクルを追加します。
		 * @param {THREE.Vector3} emitPoint
		 * @method
		 */
		private getNewParticle(emitX:number, emitY:number) {
			var p:Particle = this.fromPool();
			p.resetParameters(this.x, this.y, this.vx, this.vy);
			this._particleActive.push(p);
			this.container.addChild(p);
			return p;
		}

		/**
		 * パーティクルを削除します。
		 * @param {Particle} particle
		 * @method
		 */
		public removeParticle(p:Particle) {

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
		public getActiveParticles():Particle[] {
			return this._particleActive;
		}


		/**
		 * プールからインスタンスを取り出します。
		 * プールになければ新しいインスタンスを作成します。
		 * @returns {project.Particle}
		 * @method
		 */
		private fromPool():Particle {
			if (this._particlePool.length > 0)
				return this._particlePool.shift();

			else return new Particle();
		}

		/**
		 * プールにインスタンスを格納します。
		 * @param {project.Particle}
		 * @method
		 */
		private toPool(particle:Particle) {
			this._particlePool.push(particle);
		}
	}

	/**
	 * @class demo.Particle
	 */
	class Particle extends createjs.Shape {
		public vx:number;
		public vy:number;
		public life:number;
		public size:number;

		private _count:number;
		private _destroy:boolean;

		/**
		 * コンストラクタ
		 * @constructor
		 */
		constructor() {
			super();

			var size = Math.random() * Math.random() * Math.random() * 80 + 2;
			this.size = size;

			var colorHsl:string = createjs.Graphics.getHSL(
				0,
				0,
				50 + Math.random() * 50);

			this.graphics.clear();
			if (Math.random() < 0.5) {
				// もやっとした円
				this.graphics.beginRadialGradientFill([colorHsl, "#000000"], [0.0, 1.0], 0, 0, this.size / 10, 0, 0, this.size);
			}
			else if (Math.random() < 0.5) {
				// キリッとした円
				this.graphics.beginFill(colorHsl);
			} else {
				// 輪郭だけの円
				this.graphics
					.setStrokeStyle(2) // 線の太さ
					.beginStroke(createjs.Graphics.getRGB(255, 255, 255))
			}

			this.graphics.drawCircle(0, 0, this.size);
			this.graphics.endFill();

			// 大量のオブジェクトを重ねるとおかしくなる
			this.compositeOperation = "lighter";

			this.mouseEnabled = false;
			var padding = 2;
			this.cache(-this.size - padding, -this.size - padding, this.size * 2 + padding * 2, this.size * 2 + padding * 2);

			this._destroy = true;
		}


		/**
		 * パーティクルをリセットします。
		 * @param {createjs.Point} point
		 * @param {number} vx
		 * @param {number} vy
		 */
		public resetParameters(emitX:number, emitY:number, vx:number, vy:number):void {

			this.x = emitX;
			this.y = emitY;
			this.vx = vx * 0.5 + (Math.random() - 0.5) * 10;
			this.vy = vy * 0.5 + (Math.random() - 0.5) * 10;
			this.life = Math.random() * Math.random() * 120 + 4;
			this._count = 0;
			this._destroy = false;

			this.alpha = 1.0;
			this.scaleX = this.scaleY = 1.0;
		}

		/**
		 * パーティクル個別の内部計算を行います。
		 * @method
		 */
		public update():void {

			this.x += this.vx;
			this.y += this.vy;

			this._count++;

			var maxD:number = (1 - this._count / this.life * 1 / 3);

			this.alpha = Math.random() * 0.6 + 0.4;
			this.scaleX = this.scaleY = maxD;

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
		public getIsDead():boolean {
			return this._destroy;
		}
	}
}