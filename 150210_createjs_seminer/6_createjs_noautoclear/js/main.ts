/// <reference path="easeljs/easeljs.d.ts" />

window.addEventListener("load", ()=> {
	new project.Main();
});

module project {
	/**
	 * パーティクルデモのメインクラスです。
	 * @class project.Main
	 */
	export class Main {
		private stage:createjs.Stage;
		private pathList:Path[] = [];
		private shapeCurve:createjs.Shape;
		private mousePositions:createjs.Point[] = [];

		/**
		 * @constructor
		 */
		constructor() {

			this.stage = new createjs.Stage("myCanvas");

			if (createjs.Touch.isSupported()) {
				createjs.Touch.enable(this.stage);
			}

			// Tickerを作成
			createjs.Ticker.timingMode = createjs.Ticker.RAF;
			createjs.Ticker.on("tick", this.handleTick, this);

			// 親子構造
			this.shapeCurve = new createjs.Shape();
			this.stage.addChild(this.shapeCurve);

			var max = 300;
			for (var i = 0; i < max; i++) {
				var p = new Path();
				p.setup(0, 0, 0.05 + i/max * 0.05, (30 * Math.random() * Math.random()) >> 0, i / max);
				this.pathList.push(p);
			}

			this.stage.on("stagemousedown", ()=>{
				this.stage.clear();
			}, this);

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


			var gCurve = this.shapeCurve.graphics;

			// 描画をリセット
			gCurve
				.clear()
				.setStrokeStyle(1);

			var stageX = this.stage.mouseX;
			var stageY = this.stage.mouseY;

			this.mousePositions.unshift(new createjs.Point(stageX, stageY));

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

				// カーブ用の頂点を割り出す
				var curveStartX = (p2x + p1x) / 2;
				var curveStartY = (p2y + p1y) / 2;
				var curveEndX = (p0x + p1x) / 2;
				var curveEndY = (p0y + p1y) / 2;

				// カーブは中間点を結ぶ。マウスの座標は制御点として扱う。
				gCurve
					.beginStroke(
						createjs.Graphics.getHSL(new Date().getTime() / 10,
							80 + Math.random() * 20,
							70,
							p.percent
						))
					.moveTo(curveStartX, curveStartY)
					.curveTo(p1x, p1y, curveEndX, curveEndY)
					.endStroke();
			}

			this.stage.autoClear = false;
			this.stage.update();
		}

		/**
		 * リサイズイベント
		 */
		private handleResize():void {
			(<HTMLCanvasElement>this.stage.canvas).width = innerWidth;
			(<HTMLCanvasElement>this.stage.canvas).height = innerHeight;
		}
	}


	class Path {
		public prev:createjs.Point = new createjs.Point();
		public prev2:createjs.Point = new createjs.Point();
		public point:createjs.Point = new createjs.Point();
		private mouse:createjs.Point = new createjs.Point();
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

