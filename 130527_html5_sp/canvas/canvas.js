var canvasWidth;
var canvasHeight;
var img;
var ctx;
var timerDraw;
var bunnyCount;
var bunnys;
var frameCnt = 0;

//  キャンバスをフルスクリーンにして取得
function fullScreenCanvas(wrapper, canvas) {
	var elemWrapper = document.getElementById(wrapper);
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;

	var elemCanvas = document.getElementById(canvas);
	elemCanvas.style.width = canvasWidth + "px";
	elemCanvas.style.height = canvasHeight + "px";

	elemCanvas.width = canvasWidth;
	elemCanvas.height = canvasHeight;
}

//  ベンチマーク用の処理
function canvasBench(wrapper, canvasName) {
	var canvas = document.getElementById(canvasName);
	if (!canvas || !canvas.getContext) {
		return false;
	}


	fullScreenCanvas(wrapper, canvasName)

	ctx = canvas.getContext('2d');

	ctx.save();
	ctx.lineWidth = 30;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();

	/* Imageオブジェクトを生成 */
	img = new Image();
	img.src = "../img/bunny.png";

	bunnys = [];

	bunnyCount = 0;
	resetCount();

	requestAnimationFrame(update);
}

function updateBunny(bunnys, maxX, maxY) {

	for (var i = 0; i < bunnys.length; i++) {
		var bunny = bunnys[i];
		bunny.calc(0, 0, maxX - 20, maxY - 30)
	}
}

function update() {

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	updateBunny(bunnys, canvasWidth, canvasHeight);

	for (var i = 0; i < bunnys.length; i++) {
		ctx.save();

		var bunny = bunnys[i];

		ctx.translate(bunny.getX(), bunny.getY());
		ctx.translate(26 / 2, 37 / 2);
		ctx.rotate(bunny.getRotate());  // 座標(0,0)を中心として時計回りにθ回転
		ctx.scale(bunny.getScale(), bunny.getScale());
		ctx.translate(-1 * 26 / 2, -1 * 37 / 2);

		ctx.drawImage(img, 0, 0);

		ctx.restore();
	}
	countEnd();
	//===========================================要素を生成してる時間は無視する

	frameCnt++;
	// 定期フレームごと追加
	if (frameCnt % 5 == 0) {
		var bunny2 = new Bunny(
			Math.random() * canvasWidth,
			Math.random() * canvasHeight / 2,
			Math.random() * Math.PI,
			Math.random() + 0.5);
		bunnys.push(bunny2);
	}
	if (getMostRecentCount() >= 3) {
		var mostRate = getMostRecentFrameRate();
		resetCount();

		if (mostRate <= LIMIT_FPS) {
			alert(bunnys.length + "匹");
			return;
		}
	}
	requestAnimationFrame(update);

	//===========================================要素を生成してる時間は無視する
	countStart();

}