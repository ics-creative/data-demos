var demo;

(function() {
	// Loading
	var loading;

	// Loader
	var loader;

	window.onload = function() {
		loading = new demo.Loading(loadComplete);
		loader = new demo.Loader(loading.progress);

		start();
	};

	/**
	 * 読み込み完了
	 */
	function loadComplete() {
		//console.log("LOAD COMPLETE : Loading");

		// Load Data
		var loadData = loader.getLoadData();
	}

	function start() {

		loading.start();

		// 読み込み
		var manifest = [
			{id: "image0", src: "../common/images/BlueBird.png?" + new Date().getTime() + 0},
			{id: "image1", src: "../common/images/BlueBird.png?" + new Date().getTime() + 1},
			{id: "image2", src: "../common/images/BlueBird.png?" + new Date().getTime() + 2},
			{id: "image3", src: "../common/images/BlueBird.png?" + new Date().getTime() + 3},
			{id: "image4", src: "../common/images/BlueBird.png?" + new Date().getTime() + 4},
			{id: "image5", src: "../common/images/BlueBird.png?" + new Date().getTime() + 5},
			{id: "image6", src: "../common/images/BlueBird.png?" + new Date().getTime() + 6},
			{id: "image7", src: "../common/images/BlueBird.png?" + new Date().getTime() + 7},
			{id: "image8", src: "../common/images/BlueBird.png?" + new Date().getTime() + 8}
		];
		loader.load(manifest);
	}

	/**
	 * Loop
	 */
	function loop() {
		loading.update();
	}


})();

(function(demo) {
	demo.Loader = (function() {

		var loadImageArray;

		// Loading Progress 更新
		var loadingProgressFunc;

		/**
		 * Constructor
		 */
		var Loader = function (func) {
			loadingProgressFunc = func;
		};
		Loader.prototype = {
			load: load,
			getLoadData: getLoadData
		};


		// //////////////////////////////
		// public
		// //////////////////////////////
		/**
		 * 読み込む
		 */
		function load(manifest) {
			loadImageArray = [];
			var preload = new createjs.LoadQueue();
			preload.setMaxConnections(6);

			//preload.addEventListener("fileprogress", handleFileProgress);
			preload.addEventListener("progress", handleProgress);
			preload.addEventListener("fileload", handleFileLoadComplete);
			preload.addEventListener("complete", handleComplete);
			preload.loadManifest(manifest);
		}

		/**
		 * 読み込んだデータの取得
		 */
		function getLoadData() {
			return loadImageArray;
		}

		// //////////////////////////////
		// private
		// //////////////////////////////
		/**
		 * ファイル単体のProgress
		 * @param event
		 */
		function handleFileProgress(event) {
			console.log(event);
		}

		/**
		 * 全体のProgress
		 * @param event
		 */
		function handleProgress(event) {
			// Loading Progress 更新
			loadingProgressFunc(event.progress);
			//var per = Math.floor(event.progress * 100);
			//console.log(per + "%");
		}

		/**
		 * ファイル単体の読み込み完了
		 * @param event
		 */
		function handleFileLoadComplete(event) {
			var id = event.item.id;
			var indexNum = Number(id.split("image")[1]);
			loadImageArray[indexNum] = event.result;
		}

		/**
		 * 全体の読み込み完了
		 * @param event
		 */
		function handleComplete(event) {
			//console.log("LOAD COMPLETE : Loader");
		}

		return Loader;
	})();
})(demo || (demo = {}));
