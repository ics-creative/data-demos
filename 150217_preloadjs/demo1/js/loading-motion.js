var demo;

(function(demo) {
	demo.Loading = (function() {
		var loadingDiv;

		var completeDiv;

		// 演出完了時に実行する関数
		var completeFunc;

		// %
		var per;

		/**
		 * Constructor
		 */
		var Loading = function (func) {
			completeFunc = func;
			loadingDiv = document.getElementById("loading");
			completeDiv = document.getElementById("complete");
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
			loadingDiv.style.display = "block";
		}

		/**
		 *
		 * @param per	進捗(0~1)
		 */
		function progress(_per) {
			per = Math.floor(_per * 100);

			if(per == 100) {
				loadingDiv.style.display = "none";

				completeDiv.style.display = "table";

				completeFunc();
			}

			console.log("progress : " + per + "%");

		}


		/**
		 * 演出更新
		 */
		function update() {

		}


		return Loading;
	})();
})(demo || (demo = {}));