(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 768,
	fps: 44,
	color: "#000000",
	manifest: []
};



// symbols:



// stage content:
(lib.sample_FlashPro = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		// stage インスタンスは Flash Pro が自動的に作成している
		
		var shape;
		var paths = []; // 仮想マウス座標管理の配列
		var hue = 0; // 色相
		
		// 自動的な画面クリアを無効にする
		stage.autoClear = false;
		// タッチデバイス向けにタッチ操作を有効にする
		if (createjs.Touch.isSupported) {
			createjs.Touch.enable(stage);
		}
		// 描画用シェイプを作成
		shape = new createjs.Shape();
		stage.addChild(shape);
		// 合成方法を「加算」に設定
		stage.compositeOperation = "lighter";
		for (var i = 0; i < 100; i++) {
			// 加速値
			var ac = 0.05 + 0.001 * i;
			// 減衰値
			var de = 0.90 + 0.02 * Math.random();
			paths[i] = new Path(ac, de);
		}
		createjs.Ticker.framerate = 60;
		createjs.Ticker.on("tick", onTick);
			
			
		/** フレームごとに処理 */
		function onTick() {
			// シェイプの描画をクリアする
			shape.graphics.clear();
			for (var i = 0; i < paths.length; i++) {
				// 座標を更新
				var path = paths[i];
				path.update(stage.mouseX, stage.mouseY);
				// 計算には3点以上の存在が必要
				if (path.points.length > 2) {
					// マウスの軌跡を変数に保存
					var p0x = path.points[0].x; // 1点目
					var p0y = path.points[0].y;
					var p1x = path.points[1].x; // 2点目
					var p1y = path.points[1].y;
					var p2x = path.points[2].x; // 3点目
					var p2y = path.points[2].y;
					// カーブ用の頂点を割り出す
					var startX = (p2x + p1x) / 2;
					var startY = (p2y + p1y) / 2;
					var endX = (p0x + p1x) / 2;
					var endY = (p0y + p1y) / 2;
					// 色
					var color = "hsl(" + hue + ", 90%, 60%)";
					// 曲線を描く
					shape.graphics
							.setStrokeStyle(1)
							.beginStroke(color)
							.moveTo(startX, startY)
							.curveTo(p1x, p1y, endX, endY);
				}
			}
			// 残像効果
			var ctx = stage.canvas.getContext("2d");
			// 2%だけ画面を黒く塗る
			ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
			ctx.fillRect(0, 0, 1024, 768);
			// マウスの軌跡の描画を確定する
			stage.update();
			// 色相をずらす
			hue+=0.5;
		}
		/**
		 * 仮想的なマウス座標を管理するクラス
		 * @param ac 加速値
		 * @param de 減衰値
		 * @constructor
		 */
		function Path(ac, de) {
			this.ac = ac; // 加速値
			this.de = de; // 減衰値
			this.vx = 0.0;
			this.vy = 0.0;
			this.x = 0.0;
			this.y = 0.0;
			this.points = [];
			/**
			 * 更新命令
			 * @param mx 最新のマウスX座標
			 * @param my 最新のマウスY座標
			 */
			this.update = function (mx, my) {
				// 加速度運動
				this.x += this.vx += (mx - this.x) * this.ac;
				this.y += this.vy += (my - this.y) * this.ac;
				// 減衰処理
				this.vx *= this.de;
				this.vy *= this.de;
				// 計算結果を保存
				this.points.unshift({
					x: this.x,
					y: this.y
				});
			};
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;