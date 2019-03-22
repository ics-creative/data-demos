/// <reference path="pixi/pixi.d.ts" />

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
		private pathList:Path[] = [];
		private shapeCurve:PIXI.Graphics;
		private mousePositions:PIXI.Point[] = [];
		private mouseX:number;
		private mouseY:number;
		private renderer:PIXI.IPixiRenderer;

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

			this.stage.mousedown = this.stage.touchstart = (data:PIXI.InteractionData)=> {
				this.handleMouseDown(data);
			};
			this.stage.mousemove = this.stage.touchmove = (data:PIXI.InteractionData)=> {
				this.handleMouseMove(data);
			};
			this.stage.mouseup = this.stage.mouseupoutside = this.stage.touchend = this.stage.touchendoutside = (data:PIXI.InteractionData)=> {
				this.handleMouseUp(data);
			};

			// Tickerを作成
			requestAnimFrame(()=>this.handleTick());

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
			window.addEventListener("resize", ()=> {
				this.handleResize()
			});
		}

		private handleMouseDown(event:PIXI.InteractionData):void {
		}

		private handleMouseMove(event:PIXI.InteractionData):void {
			this.mouseX = event.global.x;
			this.mouseY = event.global.y;
		}

		private handleMouseUp(event:PIXI.InteractionData):void {
		}

		/**
		 * エンターフレームイベント
		 */
		private handleTick():void {
			var gCurve = this.shapeCurve;


			// 描画をリセット
			gCurve
				.clear();

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
				gCurve.lineStyle(1, 0xFFFFFF, p.percent)
				gCurve.moveTo(p1x, p1y)
				gCurve.lineTo(p0x, p0y);
			}

			this.renderer.render(this.stage);

			requestAnimFrame(()=>this.handleTick());
		}

		/**
		 * リサイズイベント
		 */
		private handleResize():void {
			(<PIXI.WebGLRenderer> this.renderer).resize(innerWidth, innerHeight);
		}
	}


	class Path {
		public prev:PIXI.Point = new PIXI.Point(0, 0);
		public prev2:PIXI.Point = new PIXI.Point(0, 0);
		public point:PIXI.Point = new PIXI.Point(0, 0);
		private mouse:PIXI.Point = new PIXI.Point(0, 0);
		public delayFrame:number;
		public percent:number;

		//加速度運動の変数
		private xx:number;
		private yy:number;
		private vx:number;
		private vy:number;
		private ac:number;
		private de:number;
		/** 線幅の係数 */
		private wd:number;
		//描画座標
		private px0:number;
		private py0:number;
		private px1:number;
		private py1:number;

		constructor() {
		}

		/**
		 *
		 * @param x
		 * @param y
		 * @param _accele    マウスから離れて行く時の加速値
		 * @param _slowdown
		 * @param _maxspeed
		 */
		public setup(x:number = 0,
					 y:number = 0,
					 _accele:number = 0.1,
					 delayFrame:number = 0,
					 percent:number = 0.0):void {
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
		}

		public setMousePosition(x:number, y:number):void {
			this.mouse.x = x;
			this.mouse.y = y;
		}

		public update():void {
			this.prev2.x = this.prev.x;
			this.prev2.y = this.prev.y;
			this.prev.x = this.point.x;
			this.prev.y = this.point.y;


			// 参考
			// http://gihyo.jp/design/feature/01/frocessing/0004?page=1

			var px:number = this.xx;
			var py:number = this.yy;
			//加速度運動
			this.vx += ( this.mouse.x - this.xx ) * this.ac;
			this.vy += ( this.mouse.y - this.yy ) * this.ac;

			this.xx += this.vx;
			this.yy += this.vy;

			//新しい描画座標
			var x0:number = px + this.vy * this.wd;
			var y0:number = py - this.vx * this.wd;
			var x1:number = px - this.vy * this.wd;
			var y1:number = py + this.vx * this.wd;


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
		}
	}
}

