var frameCount = 0;
var framerates = [];
var startTime = 0;
var totalTime = 0;
var LIMIT_FPS = 24;

//フレームレートを取得
function getMostRecentFrameRate() {
	var total = 0;
	for (var i = 0; i < framerates.length; i++) {
		total += framerates[i];
	}
	return total / framerates.length;
}

function getMostRecentCount() {
	if (framerates == null) return 0;
	return framerates.length;
}

function resetCount() {
	frameCount = 0;
	framerates = [];
	totalTime = 0;
	startTime = new Date().getTime();
}

//描画時に呼ぶ
function countStart() {
	startTime = new Date().getTime();
}

function countEnd() {
	frameCount++;
	totalTime += new Date().getTime() - startTime;

	//１秒以上経過していれば
	if (totalTime >= 1000) {
		var framerate = (frameCount * 1000) / (totalTime);
		framerates.push(framerate);

		totalTime = 0;
		frameCount = 0;
		var fps = parseInt(framerate * 10) / 10;
		document.getElementById('framerate').innerHTML = fps + "fps"
	}
}

// 各ブラウザ対応
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame		||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
})();