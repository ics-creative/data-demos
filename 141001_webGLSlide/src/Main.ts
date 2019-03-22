/// <reference path="../libs/glMatrix.d.ts" />
/// <reference path="../libs/jquery.d.ts" />
/// <reference path="ImageColorPicker.ts" />
/// <reference path="Camera.ts" />
/// <reference path="RoundCameraController.ts" />
/// <reference path="Particles.ts" />
/// <reference path="ParticleShader.ts" />
module project{
	export class Main {
		static initialize():void {
			var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
			var hoverFlag = false;
			(<any>parent).$("#test").hover(function () {
				hoverFlag = true;
			}, function () {
				hoverFlag = false;
			});

			(<any>parent).$('body,html').on(mousewheelevent, function (e) {
				if (hoverFlag)
					e.preventDefault();
			});
			$(window).on('keydown', function (e) {
				if (hoverFlag)
					e.preventDefault();
			});			//
			if (this.canWebGL()) {
				new Main();
			} else {
				alert("WebGLが動作する環境で閲覧下さい");
			}
		}

		static canWebGL():Boolean {
			try {
				return !!WebGLRenderingContext && (!!document.createElement("canvas").getContext("webgl") || !!document.createElement("canvas").getContext("experimental-webgl"));
			} catch (e) {
				return false;
			}
		}

		static CANVAS_WIDTH:number = 960;
		static CANVAS_HEIGHT:number = 540;


		canvas:HTMLCanvasElement;
		context:WebGLRenderingContext;

		controller:nineball.webgl.controller.RoundCameraController;
		camera:nineball.webgl.engine.Camera;

		particles:project.Particles;
		particleShader:project.ParticleShader;

		timePhase:number;
		timeCount:number;
		theta:number;

		imageList:any[];

		fpsCount:number = 0;
		st:number;
		max:number = 30;

		constructor() {
			this.imageList = [];
			var length:number = 45;
			var loadCount:number = 0;
			for (var i = 0; i < length; i++) {
				this.imageList[i] = new Image();
				this.imageList[i].onload = () => {
					loadCount += 1;
					if (loadCount == length) {
						this.init();
					}
				};
				this.imageList[i].src = "assets/" + i + ".jpg";
			}
		}

		init() {
			utils.ImageColorPicker.init(<HTMLCanvasElement>document.createElement("canvas"));

			this.initContext();
			this.initObjects();
			this.render();
		}

		initContext() {
			Main.CANVAS_WIDTH = window.innerWidth;
			Main.CANVAS_HEIGHT = window.innerHeight;

			this.canvas = <HTMLCanvasElement>document.getElementById(("myCanvas"));
			this.canvas.width = Main.CANVAS_WIDTH;
			this.canvas.height = Main.CANVAS_HEIGHT;
			this.context = <WebGLRenderingContext>(<any>this.canvas).getContext("webgl") || <WebGLRenderingContext>(<any>this.canvas).getContext("experimental-webgl");

			this.context.clearColor(0, 0, 0, 1);
			this.context.clearDepth(1.0);
			this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);

			this.context.enable(this.context.BLEND);
			this.context.blendFunc(this.context.ONE, this.context.ONE);
		}

		initObjects() {
			this.camera = new nineball.webgl.engine.Camera(45, Main.CANVAS_WIDTH / Main.CANVAS_HEIGHT, 0.1, 100);
			this.particles = new project.Particles(this.context, this.imageList);
			this.particleShader = new project.ParticleShader(this.context);
			this.particles.attachShader(this.particleShader);

			this.controller = new nineball.webgl.controller.RoundCameraController(this.camera, this.canvas);
			this.controller.radius = 4;
			this.controller.rotate(0, 0);

			this.theta = 0;
			this.timeCount = 0;
			this.timePhase = 0;
		}

		render() {
			if (!this.controller.isMouseDown) {
				//this.controller.rotate(0.5, 0);
			}
			if (this.timePhase == 0 || this.timePhase == 2) {
				this.theta += 0.02;
				if (this.timePhase == 0 && this.theta >= Math.PI / 2) {
					this.theta = Math.PI / 2;
					this.timeCount = 0;
					this.timePhase = 1;
					this.context.blendFunc(this.context.ONE, this.context.ZERO);
				}
				if (this.timePhase == 2 && this.theta >= 0) {
					this.timeCount = 0;
					this.timePhase = 0;
					this.particles.reset();
				}
			} else {
				this.timeCount += 1;
				if (this.timeCount > 60) {
					if (this.timePhase == 1) {
						this.theta = -Math.PI / 2;
						this.timePhase = 2;
						this.context.blendFunc(this.context.ONE, this.context.ONE);
					} else {
						this.timePhase = 0;
					}
				}
			}

			var mMatrix:Float32Array = mat4.identity(mat4.create(null));
			var mvpMatrix:Float32Array = mat4.identity(mat4.create(null));

			mat4.multiply(mvpMatrix, this.camera.getCameraMtx(), mMatrix);

			this.particleShader.uniformList[0].matrix = mvpMatrix;
			this.particleShader.uniformList[1].value = 10 / this.controller.radius;
			var timeScale:number = Math.cos(this.theta);
			this.particleShader.uniformList[2].value = timeScale;
			this.particleShader.uniformList[3].value = timeScale < 0.5 ? 0 : (timeScale - 0.5) * 2;
			this.particleShader.bindShader();
			this.particles.bindVertexbuffer();

			this.context.viewport(0.0, 0.0, Main.CANVAS_WIDTH, Main.CANVAS_HEIGHT);
			this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
			this.context.drawArrays(this.context.POINTS, 0, Particles.NUM_PARTICLES);

			this.context.flush();
			//
			this.fpsCount += 1;
			if (this.fpsCount === 1) {
				this.st = new Date().getTime();
			}
			if (this.fpsCount === this.max) {
				var fps = this.fpsCount / (new Date().getTime() - this.st) * 1000;
				//ログに出力
//				document.getElementById("fps").innerHTML = Math.round(fps) + " fps";
				this.fpsCount = 0;
			}
			this.controller.upDate();
			//

			requestAnimationFrame(() => this.render());
		}
	}
}
window.addEventListener("load", ()=> {
	project.Main.initialize();
});
