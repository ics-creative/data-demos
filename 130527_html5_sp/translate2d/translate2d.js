var bunnysImg;
var bunnys;
var wrapperElem;
var vendor;
var frameCnt = 0;




function translate2dBench(wrapper) {
	var elemWrapper = document.getElementById(wrapper);
	canvasWidth = document.defaultView.getComputedStyle(elemWrapper, null).getPropertyValue("width");
	canvasHeight = document.defaultView.getComputedStyle(elemWrapper, null).getPropertyValue("height");

	canvasWidth = parseInt(canvasWidth.replace("px", ""));
	canvasHeight = parseInt(canvasHeight.replace("px", ""));

	vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : '';

	//console.log(vendor);

	wrapperElem = document.getElementById("wrapper");

	bunnys = [];
	bunnysImg = [];

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

	updateBunny(bunnys, canvasWidth, canvasHeight);

	for (var i = 0; i < bunnys.length; i++) {
		var bunny = bunnys[i];
		var x = bunny.getX() + "px";
		var y = bunny.getY() + "px";
		var deg = bunny.getDegree();
		var scale = bunny.getScale();

		bunnysImg[i].style[vendor + 'Transform'] = "translate(" + x + "," + y + ") rotate(" + deg + "deg) scale(" + scale + ")";
	}

	countEnd();
	//===========================================要素を生成してる時間は無視する
	frameCnt++;
	// 定期フレームごと追加
	if (frameCnt % 5 == 0) {
		// 新しい要素を生成
		var img = document.createElement("img");
		img.src = "../img/bunny.png";
		img.width = 26;
		img.height = 37;
		img.style.position = "absolute";
		// body 要素の子に divElem を追加
		wrapperElem.appendChild(img);
		bunnysImg.push(img);

		var bunny2 = new Bunny(
			Math.random() * canvasWidth,
			Math.random() * canvasHeight / 2,
			Math.random() * Math.PI,
			Math.random() + 0.5);
		bunnys.push(bunny2);
		var bx = bunny2.getX() + "px";
		var by = bunny2.getY() + "px";
		img.style[vendor + 'Transform'] = "translate(" + bx + "," + by + ")";
	}

	if (getMostRecentCount() >= 3) {
		var mostRate = getMostRecentFrameRate();
		resetCount();

		if (mostRate <= LIMIT_FPS) {
			alert(bunnys.length + "匹");
			return; // 終了
		}
	}
	requestAnimationFrame(update);

	//===========================================要素を生成してる時間は無視する
	countStart();
}

