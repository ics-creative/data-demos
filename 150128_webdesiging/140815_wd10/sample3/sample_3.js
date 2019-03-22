(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 960,
	height: 558,
	fps: 60,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



// stage content:
(lib.sample_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		// タッチイベントが有効なブラウザの場合、
		// CreateJSでタッチイベントを扱えるようにする
		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(stage);
		}
		
		// 描画をするためのシェイプを設定
		var shape = new createjs.Shape();
		// シェイプをステージの最深部に配置
		stage.addChildAt(shape, 0);
		
		// ステージ上でマウスボタンを押した時のイベント設定
		stage.addEventListener("stagemousedown", handleMouseDown);
		
		
		// マウスのX座標とY座標
		var currentX = 0;
		var currentY = 0;
		
		// 線の色
		var strokeColor = "#FF000";
		// 線の太さ
		var strokeSize = 3;
		
		// マウスを押した状態かどうか
		var isMouseDown = false;
		
		// マウスを押した時に実行される
		function handleMouseDown(event) {
			// マウスボタンを押したというフラグを立てる
			isMouseDown = true;
		
			// ステージ上でマウスのイベントを登録
			stage.addEventListener("stagemousemove", handleMouseMove);
			stage.addEventListener("stagemouseup", handleMouseUp);
		
			// 現在のマウス座標を保存する
			currentX = event.stageX;
			currentY = event.stageY;
		
			// 線の描画を開始
			beginStroke();
		
			//カラーピッカーを閉じる
			$("#picker").spectrum("hide");
		
		}
		
		// 線の描画を開始するときに実行する
		function beginStroke() {
			shape.graphics
				.moveTo(currentX, currentY) // 描画開始位置を指定
				.beginStroke(strokeColor) // strokeCorlorで、描画を開始
				.setStrokeStyle(strokeSize, "round", "round"); // strokeSizeで線の太さを設定
		}
		
		// マウスが動いた時に実行する
		function handleMouseMove(event) {
			// 現在のマウス座標を更新する
			currentX = event.stageX;
			currentY = event.stageY;
			// マウス座標への線を引く
			shape.graphics.lineTo(currentX, currentY);
		}
		
		// マウスボタンが離された時に実行される
		function handleMouseUp(event) {
			// マウスボタンを押していないというフラグを立てる
			isMouseDown = false;
		
			// 線の描画を終了する
			shape.graphics.endStroke();
		
			// イベント解除
			stage.removeEventListener("stagemousemove", handleMouseMove);
			stage.removeEventListener("stagemouseup", handleMouseUp);
		}
		
		
		// --------------------------------------
		// canvasの領域外にマウスが移動したときの対策
		// --------------------------------------
		
		// canvas領域からマウスが離れた時のイベント設定
		canvas.onmouseout = handleMouseOut;
		// canvas領域にマウスが入った時のイベント設定
		canvas.onmouseover = handleMouseOver;
		
		// canvas領域にマウスが入った時に実行される
		// マウスボタンを押していた場合は、そこを現在のマウス位置として、
		// 線の描画を開始する
		function handleMouseOver(event) {
			if (isMouseDown) {
				// 現在のマウス座標を更新する
				currentX = event.offsetX;
				currentY = event.offsetY;
				beginStroke();
			}
		}
		
		// canvas領域からマウスが離れた時に実行される
		// マウスボタンを押していた場合は、線の描画を停止する
		function handleMouseOut(event) {
			if (isMouseDown) {
				shape.graphics.endStroke();
			}
		}
		
		
		// --------------------------------------
		// HTML側で配置した画面パーツの制御
		// --------------------------------------
		
		// カラーピッカー
		$("#picker").spectrum({
			// 色が変更された時に実行される
			move: function (color) {
				// 変更された線の色を変数に保存
				strokeColor = color.toRgbString();
			},
			// カラーピッカーにカラーパレットを表示したい場合は以下
			palette: [
					["#E60012","#F39800","#FFF100"],
					["#8FC31F","#009944","#009E96"],
					["#00A0E9","#0068B7","#1D2088"],
					["#920783","#E4007F","#E5004F"],
					["#000000","#808080","#FFFFFF"]
			]
		});
		
		// サイズ変更のスライダー
		// スライダーの値が変更されると実行される
		$("#slider").change(function () {
			// 変更された線の太さを変数に保存
			strokeSize = $("#slider").val();
			// 画面上の「線の太さ」の表示を更新
			$("#sizeText").text(strokeSize + "px");
			
		});
		
		// リセットボタン
		$("#resetButton").click(function () {
			var result = confirm("リセットしてもよろしいですか？");
			if(result == true){
				// シェイプのグラフィックスを消去
				shape.graphics.clear();
			}
		});
		
		// 保存ボタン
		$("#saveButton").click(function () {
			// Canvasタグから画像に変換
			var png = stage.canvas.toDataURL();
			// 新規ウインドウで画像を表示
			window.open(png);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;