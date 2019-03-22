///<reference path="libs/easeljs.d.ts" />

window.onload = () => {

	var image:HTMLImageElement = new Image();
	image.onload = () => {
		new project.Main(image);
	};
	image.src = "ics_like_1000.png";
}

module project {

	/**
	 * Particle Text
	 *
	 * @author clockmaker
	 * @see http://clockmaker.jp/blog/
	 */
	export class Main {

		pixels:ImageData;
		particles:Particle[];
		gravity:number;
		forcePixels:ImageData;
		canvasW:number;
		canvasH:number;
		context:CanvasRenderingContext2D;
		canvasFlash:HTMLCanvasElement;
		canvasDraw:HTMLCanvasElement;
		canvasMain:HTMLCanvasElement;
		contextMain:CanvasRenderingContext2D;
		contextFlash:CanvasRenderingContext2D;
		SCALE:number = 32;
		poolParticle:Particle[] = [];

		constructor(image:HTMLImageElement) {

			// 変数の初期化
			this.canvasDraw = <HTMLCanvasElement> document.getElementById("canvasDraw");
			this.context = <CanvasRenderingContext2D> this.canvasDraw.getContext("2d");
			this.canvasW = this.canvasDraw.width;
			this.canvasH = this.canvasDraw.height;
			this.pixels = this.context.getImageData(0, 0, this.canvasW, this.canvasH);
			this.particles = [];
			this.gravity = 0.25;

			this.canvasFlash = <HTMLCanvasElement> document.getElementById("canvasFlash");
			this.canvasMain = <HTMLCanvasElement> document.getElementById("canvasMain");
			this.contextFlash = <CanvasRenderingContext2D> this.canvasFlash.getContext("2d");
			this.contextMain = <CanvasRenderingContext2D> this.canvasMain.getContext("2d");

			var forceMap = (<HTMLCanvasElement> document.getElementById("canvasForce")).getContext("2d");
			forceMap.drawImage(image, 0, 0);

			this.forcePixels = forceMap.getImageData(0, 0, this.canvasW, this.canvasH);

			for (var i = 0; i < 1000; i++) {
				this.emit(Math.random() * this.canvasW, Math.random() * this.canvasH, Math.random() * 1.5 + 1.5);
			}

			createjs.Ticker.setFPS(60);
			createjs.Ticker.useRAF = true;
			createjs.Ticker.addEventListener("tick", ()=> {
				this.handleTick();
			});
		}

		handleTick() {

			for (var i = 0; i < this.particles.length; i++) {
				var p = this.particles[i];

				p.vy += this.gravity * p.s;
				//p.vy *= 0.98;
				var d = 1 - (this.getPixel(p.x, p.y) / 0xff) * 0.9; // フォースマップに基づいて抵抗値を計算
				p.vy *= d;// フォースマップで得た抵抗値を反映
				p.vx *= d;// フォースマップで得た抵抗値を反映
				p.x += p.vx;// 速さを位置に反映
				p.y += p.vy;// 速さを位置に反映

				this.context.fillStyle = p.color;
				if(p.y > 150 && p.y<350)
					this.context.fillRect(p.x >> 0, p.y >> 0, p.size, p.size);
				else
				{
					if(Math.random() < 0.5)
						this.context.fillRect(p.x >> 0, p.y >> 0, p.size, p.size);
				}
				// 円を描くと強烈に処理負荷が高まる
				/*
				this.context.beginPath();
				this.context.arc(p.x >> 0, p.y >> 0, p.size / 2, 0, Math.PI * 2);
				this.context.fill();
				*/
				if (p.y > this.canvasH) {
					this.toPool(p); // プールへ
					this.particles.splice(i, 1); // 削除
				}
			}

			for (i = 0; i < 10; i++)
				this.emit(Math.random() * this.canvasW, 0, Math.random() * 1.5 + 1.5);

			this.context.setTransform(1, 0, 0, 1, 0, 0);
			this.context.fillStyle = "rgba(0, 0, 0, 0.08)";
			this.context.fillRect(0, 0, this.canvasW, this.canvasH);

			// reset
			this.contextMain.globalCompositeOperation = "source-over";
			this.contextMain.setTransform(1, 0, 0, 1, 0, 0);
			this.contextMain.clearRect(0, 0, this.canvasW, this.canvasH);

			// draw 1 for base
			this.contextMain.drawImage(this.canvasDraw, 0, 0, this.canvasW, this.canvasH);

			// draw 2 for flash
			this.contextFlash.drawImage(this.canvasDraw, 0, 0, this.canvasW, this.canvasH, 0, 0, this.canvasW / this.SCALE, this.canvasH / this.SCALE);
			this.contextMain.globalCompositeOperation = "lighter";
			this.contextMain.drawImage(this.canvasFlash, 0, 0, this.canvasW / this.SCALE, this.canvasH / this.SCALE, 0, 0, this.canvasW, this.canvasH);
			this.contextMain.drawImage(this.canvasFlash, 0, 0, this.canvasW / this.SCALE, this.canvasH / this.SCALE, 0, 0, this.canvasW, this.canvasH); // 強調
		}

		/** パーティクルエミッター  */
		emit(ex:number, ey:number, s:number):void {
			var vx:number = 0;
			var vy:number = 0;

			var p:Particle = this.fromPool();
			p.reset(ex, ey, vx, vy, s,
				createjs.Graphics.getHSL(ex / this.canvasW * 30 + 10, 100, 50 + 50 * (Math.random() * Math.random())),
					Math.random() < 0.5 ? 1 : 2);
			this.particles.push(p);
		}

		/**
		 * Pixel値を取得します
		 * @param {Number} x X座標
		 * @param {Number} y Y座標
		 * @return alpha
		 */
		getPixel(x, y):any {
			if (!this.forcePixels)
				return 0;
			if (x >= 0 && x < this.canvasW && y >= 0 && y < this.canvasH) {
				var idx = ((x | 0) + (y | 0) * this.canvasW) * 4;
				var a = this.forcePixels.data[idx + 3];
			}
			return a;
		}

		fromPool():Particle {
			if (this.poolParticle.length) return this.poolParticle.pop();
			else return new Particle();
		}

		toPool(particle:Particle):void {
			this.poolParticle.push(particle);
		}
	}

	/**
	 * パーティクルクラス
	 * @param {Number} x X座標
	 * @param {Number} y Y座標
	 * @param {Number} vx X方向の速さ
	 * @param {Number} vy Y方向の速さ
	 * @param {Number} s 重力の適用度
	 */
	export class Particle {
		x:number;
		y:number;
		vx:number;
		vy:number;
		s:number;
		color:string;
		size:number;

		constructor() {
		}

		reset(x:number, y:number, vx:number, vy:number, s:number, color:string, size:number):void {
			this.x = x;
			this.y = y;
			this.vx = vx;
			this.vy = vy;
			this.s = s;
			this.color = color;
			this.size = size;
		}

	}

}