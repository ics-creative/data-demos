var demo;

(function(demo) {
	demo.Loading = (function() {

		// canvas
		var canvas;

		// createjs stage
		var stage;

		// 演出完了時に実行する関数
		var completeFunc;

		// %
		var per;

		// 前の%
		var beforeScale;

		var backText;

		var frontText;

		var BACK_COLOR = "#000000";
		var FRONT_COLOR = "#ffffff";

		var frontContainer;

		var frontBg;

		var maskShape;

		/**
		 * Constructor
		 */
		var Loading = function (func) {
			completeFunc = func;
			canvas = document.getElementById("canvas");
			stage = new createjs.Stage("canvas");

			backText = new createjs.Text("Loading", "72px Consolas", FRONT_COLOR);
			backText.textAlign = "center";
			backText.textBaseline = "middle";

			stage.addChild(backText);

			frontContainer = new createjs.Container();
			stage.addChild(frontContainer);

			frontBg = new createjs.Shape();
			frontContainer.addChild(frontBg);

			frontText = new createjs.Text("Loading", "72px Consolas", BACK_COLOR);
			frontText.textAlign = "center";
			frontText.textBaseline = "middle";

			frontContainer.addChild(frontText);

			maskShape = new createjs.Shape();
			maskShape.scaleX = 0;

			frontContainer.mask = maskShape;

			beforePer = 0;
		};

		Loading.prototype = {
			start: start,
			progress: progress,
			update: update
		};

		// //////////////////////////////
		// public
		// //////////////////////////////

		function start() {
			// resize
			window.onresize = resizeHandler;
			resizeHandler();

			// FPS60
			createjs.Ticker.setFPS(60);

			// loop
			createjs.Ticker.addEventListener("tick", update);
		}

		/**
		 *
		 * @param per	進捗(0~1)
		 */
		function progress(_per) {
			per = _per;
		}

		// //////////////////////////////
		// private
		// //////////////////////////////
		/**
		 * 演出完了
		 */
		function complete() {
			createjs.Ticker.removeEventListener("tick", update);

			frontText.text = "Complete";

			console.log("comp");

			completeFunc();
		}


		/**
		 * 演出更新
		 */
		function update() {
			maskShape.scaleX += (per - maskShape.scaleX) * 0.2;

			// 切り上げる
			if(Math.floor(maskShape.scaleX * 10000) / 10000 == beforeScale && per == 1) {
				maskShape.scaleX = 1;

				complete();
			}

			beforeScale = Math.floor(maskShape.scaleX * 10000) / 10000;

			stage.update();
		}

		/**
		 * resize
		 */
		function resizeHandler() {
			var windowW = window.innerWidth;
			var windowH = window.innerHeight;
			canvas.width = windowW;
			canvas.height = windowH;

			backText.x = frontText.x = windowW / 2;
			backText.y = frontText.y = windowH / 2;

			frontBg.graphics.clear();
			frontBg.graphics.beginFill(FRONT_COLOR);
			frontBg.graphics.drawRect(0, 0, windowW, windowH);
			frontBg.graphics.endFill();

			maskShape.graphics.drawRect(0, 0, windowW, windowH);

			stage.update();
		}

		return Loading;
	})();
})(demo || (demo = {}));