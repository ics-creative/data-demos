///<reference path="libs/pixi/pixi.d.ts" />
///<reference path="libs/easeljs/easeljs.d.ts" />
///<reference path="libs/tweenjs/tweenjs.d.ts" />
///<reference path="libs/preloadjs/preloadjs.d.ts" />

declare var WebFont;
module project {

	var loader:createjs.LoadQueue;
	var appScale:number = 1.0;
	var SPRITESHEET_SCALE:number = 1.0;
	var ICON_RADIUS:number = 35;

	export class Main {
		stage:PIXI.Stage;
		renderer:PIXI.IPixiRenderer;
		container:PIXI.DisplayObjectContainer;
		menu:Menu;



		private maskShape;

		constructor() {
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
				active: ()=> this.handleFontDetect()
			});
		}

		private handleFontDetect() {

			this.stage = new PIXI.Stage(0xf2f2f2);
			this.renderer = PIXI.autoDetectRenderer(innerWidth, innerHeight, null, null, true);

			this.container = new PIXI.DisplayObjectContainer();

			var layoutManager = new LayoutManager(10);
			var numItems = layoutManager.numItems;

			var bg = new PIXI.Sprite(PIXI.Texture.fromImage("img/more_complications_large_2x.png"));
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
			window.addEventListener("resize", ()=>this.handleResize());
		}

		handleTick(event) {
			this.renderer.render(this.stage);
		}

		handleResize() {
			var sizeW = 442;
			var sizeH = 486;

			(<PIXI.WebGLRenderer>this.renderer).resize(innerWidth, innerHeight);

			var scale = 1.0;
			this.container.scale.x = this.container.scale.y = scale;
			this.container.x = (window.innerWidth - sizeW * scale) / 2;
			this.container.y = (window.innerHeight - sizeH * scale) / 2;

			this.maskShape.clear();
			this.maskShape.beginFill(0xFF0000);
			this.maskShape.drawRect(
				this.container.x + this.menu.x - AppConst.SIZE_W / 2,
				this.container.y + this.menu.y - AppConst.SIZE_H / 2,
				AppConst.SIZE_W,
				AppConst.SIZE_H);

			appScale = scale;
		}
	}

	class AppConst {
		static SIZE_W:number = 312;
		static SIZE_H:number = 400;
	}

	class Menu extends PIXI.DisplayObjectContainer {
		private listIcons:PIXI.DisplayObject[];
		private layoutManager:LayoutManager;
		private pointCurrent:PIXI.Point;
		private mouseDownPoint:PIXI.Point = new PIXI.Point(0, 0);
		private mouseDownCenter:PIXI.Point = new PIXI.Point(0, 0);
		private easeCenter:PIXI.Point = new PIXI.Point(0, 0);
		private isDragging:boolean = false;
		private fontList = [
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

		constructor() {
			super();
		}

		setup() {

			var bg = new PIXI.Graphics();
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
				var item = new PIXI.Sprite(this.getTexture());
				item.pivot.x = ICON_RADIUS;
				item.pivot.y = ICON_RADIUS;

				this.listIcons.push(item);
				this.addChild(item);
			}

			this.stage.mousedown = this.stage.touchstart = (event:PIXI.InteractionData)=> {
				this.handleMouseDown(event);
			};
			this.stage.mousemove = this.stage.touchmove = (event:PIXI.InteractionData)=> {
				this.handleMouseMove(event);
			};
			this.stage.mouseup = this.stage.mouseupoutside = this.stage.touchend = (event:PIXI.InteractionData)=> {
				this.handleMouseUp(event);
			};

			createjs.Ticker.on("tick", this.handleTick, this);
		}

		private handleMouseDown(event:PIXI.InteractionData):void {
			this.mouseDownCenter.x = this.pointCurrent.x;
			this.mouseDownCenter.y = this.pointCurrent.y;
			this.mouseDownPoint = event.getLocalPosition(this);
			this.isDragging = true;
		}

		private handleMouseMove(event:PIXI.InteractionData):void {
			if (this.isDragging == true)
				this.commitProperties(event);
		}

		private handleMouseUp(event:PIXI.InteractionData):void {
			this.commitProperties(event);
			this.isDragging = false;
		}

		private commitProperties(event:PIXI.InteractionData) {
			var current = event.getLocalPosition(this);

			this.pointCurrent.x = current.x - this.mouseDownPoint.x + this.mouseDownCenter.x;
			this.pointCurrent.y = current.y - this.mouseDownPoint.y + this.mouseDownCenter.y;

			this.pointCurrent.x = Math.max(-AppConst.SIZE_W * 1.3 * appScale, Math.min(+AppConst.SIZE_W * 1.3 * appScale, this.pointCurrent.x));
			this.pointCurrent.y = Math.max(-AppConst.SIZE_H * appScale, Math.min(+AppConst.SIZE_H * appScale, this.pointCurrent.y));
		}

		private handleTick(event) {
			this.easeCenter.x += (this.pointCurrent.x - this.easeCenter.x) * 0.1;
			this.easeCenter.y += (this.pointCurrent.y - this.easeCenter.y) * 0.1;

			this.layoutManager.iconMapRefresh(150, 55, {
				x: this.easeCenter.x / appScale,
				y: this.easeCenter.y / appScale
			}, this.listIcons);
		}

		private getTexture():PIXI.Texture
		{
			var iconUnicode = this.fontList[this.fontList.length * Math.random() >> 0];
			var dummy = new createjs.Container();

			var hue = 360 * Math.random();

			var shape = new createjs.Shape();

			var colorStart = createjs.Graphics.getHSL(hue, 80, 70);
			var colorEnd = createjs.Graphics.getHSL(hue, 100, 50);

			shape.graphics
				.beginLinearGradientFill([colorStart, colorEnd], [0.0, 1.0], 0, -ICON_RADIUS, 0, +ICON_RADIUS)
				.drawCircle(0, 0, ICON_RADIUS);
			dummy.addChild(shape);

			var str = String.fromCharCode(parseInt(iconUnicode, 16));
			var icon = new createjs.Text(str, "42px FontAwesome", "white");
			icon.textAlign = "center";
			icon.textBaseline = "middle";
			dummy.addChild(icon);

			dummy.cache(-ICON_RADIUS, -ICON_RADIUS, ICON_RADIUS * 2, ICON_RADIUS * 2);

			var texture = PIXI.Texture.fromCanvas(<HTMLCanvasElement>dummy.cacheCanvas);
			return texture;
		}
	}



	class LayoutManager {
		private screenW:number;
		private screenH:number;
		private centerW;
		private centerH;
		hexCube:number[][];

		constructor(level:number) {
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

		public get numItems():number {
			return this.hexCube.length;
		}

		public iconMapRefresh(sphereR, hexR, scroll:{x:number; y:number;}, targetList:PIXI.DisplayObject[]) {
			var hexCubeOrtho:{x:number; y:number; scale:number}[] = [];
			var hexCubePolar:{radius:number; radian:number;}[] = [];
			var hexCubeSphere:{radius:number; radian:number; depth:number}[] = [];

			var scrollX = scroll.x,
				scrollY = scroll.y;


			for (var i = 0; i < this.hexCube.length; i++) {
				hexCubeOrtho[i] = {
					x: (this.hexCube[i][1] + this.hexCube[i][0] / 2) * hexR + scrollX,
					y: Math.sqrt(3) / 2 * this.hexCube[i][0] * hexR + scrollY,
					scale: 0
				}
			}

			for (var i = 0; i < hexCubeOrtho.length; i++) {
				hexCubePolar[i] = MathUtil.orthoToPolar(hexCubeOrtho[i].x, hexCubeOrtho[i].y);
			}

			for (var i = 0; i < hexCubePolar.length; i++) {
				var rad = hexCubePolar[i].radius / sphereR;
				if (rad < Math.PI / 2) {
					var r = hexCubePolar[i].radius * TweenJSUtil.getValue(createjs.Ease.sineInOut, rad / (Math.PI / 2), 1.5, -0.5, 1);
					var deepth = TweenJSUtil.getValue(createjs.Ease.cubicInOut, rad / (Math.PI / 2), 1, -0.5, 1);
				} else {
					var r:number = hexCubePolar[i].radius;
					var deepth = TweenJSUtil.getValue(createjs.Ease.cubicInOut, 1, 1, -0.5, 1);
				}

				hexCubeSphere[i] = {
					radius: r,
					depth: deepth,
					radian: hexCubePolar[i].radian
				}
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
				} else if (Math.abs(hexCubeOrtho[i].x) > this.screenW / 2 - 2 * edge && Math.abs(hexCubeOrtho[i].y) > this.screenH / 2 - 2 * edge) {
					hexCubeOrtho[i].scale = Math.min(
						hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineInOut, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - edge, 0.4, 0.6, edge),
						hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineInOut, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - edge, 0.3, 0.7, edge));
				} else if (Math.abs(hexCubeOrtho[i].x) > this.screenW / 2 - 2 * edge) {
					hexCubeOrtho[i].scale = hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineOut, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - edge, 0.4, 0.6, edge);
				} else if (Math.abs(hexCubeOrtho[i].y) > this.screenH / 2 - 2 * edge) {
					hexCubeOrtho[i].scale = hexCubeSphere[i].depth * TweenJSUtil.getValue(createjs.Ease.sineOut, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - edge, 0.4, 0.6, edge);
				} else {
					hexCubeOrtho[i].scale = hexCubeSphere[i].depth;
				}
			}

			for (var i = 0; i < hexCubeOrtho.length; i++) {
				if (hexCubeOrtho[i].x < -this.screenW / 2 + 2 * edge) {
					hexCubeOrtho[i].x += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - 2 * edge, 0, 6, 2 * edge);
				} else if (hexCubeOrtho[i].x > this.screenW / 2 - 2 * edge) {
					hexCubeOrtho[i].x += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenW / 2 - Math.abs(hexCubeOrtho[i].x) - 2 * edge, 0, -6, 2 * edge);
				}
				if (hexCubeOrtho[i].y < -this.screenH / 2 + 2 * edge) {
					hexCubeOrtho[i].y += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - 2 * edge, 0, 8, 2 * edge);
				} else if (hexCubeOrtho[i].y > this.screenH / 2 - 2 * edge) {
					hexCubeOrtho[i].y += TweenJSUtil.getValue(createjs.Ease.sineIn, this.screenH / 2 - Math.abs(hexCubeOrtho[i].y) - 2 * edge, 0, -8, 2 * edge);
				}
			}

			for (var i = 0; i < targetList.length; i++) {
				var item = targetList[i];

				item.x = hexCubeOrtho[i].x;
				item.y = hexCubeOrtho[i].y;
				item.scale.x = item.scale.y = hexCubeOrtho[i].scale / SPRITESHEET_SCALE;
			}
		}
	}

	/**
	 * 数値に関するユーティリティクラスです。
	 */
	class MathUtil {
		static polarToOrtho(radius:number, radian:number):{x:number; y:number; scale:number} {
			var x = radius * Math.cos(radian);
			var y = radius * Math.sin(radian);
			return {
				x: x,
				y: y,
				scale: 0
			}
		}

		static orthoToPolar(x:number, y:number):{radius:number; radian:number;} {
			var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
			var rad = Math.atan2(y, x);
			return {
				radius: r,
				radian: rad
			}
		}
	}


	/**
	 * TweenJSのユーティリティクラスです。
	 */
	class TweenJSUtil {
		/**
		 * 現在時間における数値を計算します。
		 * @param ease createjs.Ease のいずれかのイージング関数を指定
		 * @param t    現在時間
		 * @param b    開始値
		 * @param c    倍数
		 * @param d    トータルの時間
		 * @returns {number}    数値を返します。
		 */
		static getValue(ease:Function, t:number, b:number, c:number, d:number):number {
			return c * ease(t / d) + b;
		}
	}
}

window.addEventListener("load", (event) => {
	new project.Main();
});