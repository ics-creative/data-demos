(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 512,
	height: 512,
	fps: 60,
	color: "#000000",
	manifest: []
};



// symbols:



(lib.LineStopWatch = function() {
	this.initialize();

	// レイヤー 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0099CC").s("#000000").ss(2,1,1).de(-6.9,-6.9,13.8,13.8);
	this.shape.setTransform(0,0,0.58,0.58);

	// レイヤー 5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().de(-6.9,-6.9,13.8,13.8);
	this.shape_1.setTransform(0,0,1.014,1.014);

	// レイヤー 6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0099CC").s().dr(-0.45,-32.5,0.9,65);
	this.shape_2.setTransform(0,-32.5,1.09,1);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-7,-65,14,72);


(lib.LineSec = function() {
	this.initialize();

	// レイヤー 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0099CC").s("#000000").ss(2,1,1).de(-6.9,-6.9,13.8,13.8);
	this.shape.setTransform(0,0,0.58,0.58);

	// レイヤー 5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().de(-6.9,-6.9,13.8,13.8);
	this.shape_1.setTransform(0,0,1.014,1.014);

	// レイヤー 6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0099CC").s().dr(-0.65,-110,1.3,220);
	this.shape_2.setTransform(0.1,-90,1.04,1);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-7,-200,14,220);


(lib.LineMin = function() {
	this.initialize();

	// レイヤー 5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.004)").s("#FFFFFF").ss(2,1,1).rr(-4.95,-89.5,9.9,179,4.95);
	this.shape.setTransform(0,-110.5,1.01,1);

	// レイヤー 6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s("#FFFFFF").ss(2,1,1).de(-6.9,-6.9,13.8,13.8);
	this.shape_1.setTransform(0,0,0.87,0.87);

	// レイヤー 7
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().dr(-2,-11.3,4,22.6);
	this.shape_2.setTransform(0,-11.3);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-7,-201,14,208);


(lib.LineHour = function() {
	this.initialize();

	// レイヤー 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.004)").s("#FFFFFF").ss(2,1,1).rr(-5,-47,10,94,5);
	this.shape.setTransform(0,-67.2);

	// レイヤー 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s("#FFFFFF").ss(2,1,1).de(-6.9,-6.9,13.8,13.8);
	this.shape_1.setTransform(0,0,1.014,1.014);

	// レイヤー 4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().dr(-2.5,-11.3,5,22.6);
	this.shape_2.setTransform(0,-11.3);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-8,-115.2,16,123.3);


(lib.LabelLogo = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AB3BIQgKgFgHgHQgIgHgDgLQgFgJAAgMQABgNADgJQAEgLAHgIQAHgHALgFQAFgCAFgCIANgBQAKAAAIADQAKACAGAFQAIAGAEAIQAEAHABAJIgdAAQgDgRgUAAQgGAAgFADQgFAEgDAEQgDAEgBAGIgBANIABALQABAGACAFQAEAFAEADQAFADAHABQAFAAAEgCQAFgBACgDQAHgHABgKIAcAAQgBALgEAIQgEAIgIAHQgGAFgJADQgJADgLAAQgMAAgKgEgAhVBKQgGgCgFgEQgFgEgDgGQgCgGAAgJQAAgJADgGQADgGAFgDQAFgEAGgCIAngGQAFgBACgDQADgCABgDQAAgEgCgEQgBgDgDgBIgHgCIgHAAQgIAAgGADQgFAEgBAJIgdAAQAAgKAFgIQAEgGAIgFQAGgEAKgBQAIgDAKAAIAQABQAJACAGADQAIAEAEAFQAEAGABALIAABEQABAHACADIgeAAIgCgKQgIAHgJADQgKADgKAAQgHAAgIgCgAgoAWIgTAEIgHACIgGACIgEAFQgBADAAAEQAAAEABADIAEAEIAGADIAIAAQAIAAAFgDQAFgDACgEQADgEAAgEIABgSgAAuBJQgHgBgFgDQgEgCgDgGQgDgEAAgJIAAg9IgSAAIAAgUIASAAIAAghIAeAAIAAAhIAWAAIAAAUIgWAAIAAAzQAAAIADACQACADAIgBIAJAAIAAAXIgSABgAEbBJIAAg9IgBgMQgCgDgCgDQgCgEgDgCQgEgBgFAAQgNAAgFAIQgDADgCAEQgBAGAAAIIAAA5IgeAAIAAiUIAeAAIAAA4IABAAQAFgJAJgEQAJgFAJAAQAMAAAHAEQAIADAEAGQAEAFACAJQACAIAAAIIAABDgAi7BJIgZhkIgBAAIgZBkIghAAIgoiUIAhAAIAYBkIAahkIAfAAIAaBmIAZhmIAgAAIgoCUg");
	this.shape.setTransform(-1.3,11.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#555555").s().p("AKiBdQgJgCgHgEQgGgEgFgHQgEgGgBgKIAeAAQACAJAGACQAGAEAIAAQAGAAAFgCQAEgCADgDIAFgJQABgFAAgFIAAgPIAAAAQgDAFgEADIgIAEQgIAFgKAAQgMAAgJgFQgJgEgGgHQgFgIgDgKQgCgKAAgIQAAgLACgKQAEgKAFgHQAHgIAIgEQAJgEALAAQALAAAIADQAIAFAGAJIAAAAIAAgPIAcAAIAABkIgBAPQgDAIgFAIQgGAHgLAFQgLAFgTAAQgIAAgIgCgAKqgeQgFACgDAEQgDAFgCAFIgBAMIABAJQACAGADAFQACAEAFADQAFADAGAAQAHAAAEgCQAGgDACgEQAEgEACgGQABgEAAgFQAAgGgBgGQgCgHgDgEQgCgEgGgDQgEgDgIAAQgGAAgEADgADyBdQgIgCgHgEQgGgEgFgHQgFgGAAgKIAeAAQACAJAGACQAGAEAIAAQAGAAAFgCQAEgCADgDIAFgJQABgFAAgFIAAgPIAAAAQgDAFgEADIgIAEQgIAFgKAAQgMAAgJgFQgJgEgGgHQgFgIgDgKQgCgKgBgIQAAgLADgKQAEgKAFgHQAHgIAIgEQAJgEALAAQALAAAIADQAIAFAGAJIAAAAIAAgPIAcAAIAABkIgBAPQgDAIgFAIQgGAHgMAFQgKAFgTAAQgIAAgJgCgAD7geQgFACgDAEQgDAFgBAFIgCAMIACAJQABAGACAFQADAEAFADQAFADAGAAQAHAAAEgCQAGgDACgEQADgEADgGQABgEAAgFQAAgGgBgGQgBgHgEgEQgCgEgGgDQgEgDgIAAQgGAAgEADgABHA3QgJgCgHgEQgGgFgFgHQgEgIgBgLIAdAAQAAAGACADQACAEACACQAEACAEABIAIABIAHgBIAGgCQADgCACgCQACgDAAgEQAAgHgJgDQgJgEgQgDIgNgDQgGgCgEgCQgFgDgDgFQgDgFAAgGQAAgLADgHQAFgGAGgEQAHgFAIgBQAJgCAJABQAJgBAIACQAJACAGAEQAGAEAFAHQAEAGABAKIgdAAQAAgIgGgEQgGgDgIAAIgGAAIgFACIgEADQgBACgBADQAAAFADACQAEADAEABIAkAJQAGADAFADQAFACADAEQADAFAAAIQgBALgEAHQgEAHgHAFQgHAEgJACQgJACgJAAQgJAAgKgCgAgvA0QgLgDgGgIQgHgHgFgLQgEgKAAgNQAAgKAEgLQAFgLAHgHQAIgHAKgFQAJgEANAAQAOAAAKAFQAEACAEAEQAEADADAFQAHAJADAMQACAMAAAKIhNAAQAAAHADAFQABAGAEADQAGAGANAAQAJAAAGgEQAHgEABgFIAZAAQgDAJgFAHQgFAHgGAFQgLAIgTAAQgNAAgKgFgAgkgeQgGACgCADQgDAEgBAEIgCAHIAxAAQgCgLgFgGQgEgDgEgBQgDgCgGAAQgHAAgEADgAl1A1QgJgEgFgJIAAAAIAAAOIgcAAIAAiUIAdAAIAAA3IAAAAQAGgJAKgEQAJgDAKAAQAIAAAIADQAIADAGAHQAHAHAEALQAEAPAAAJQgCASgCAHQgEALgHAHQgGAHgIADQgIAEgIAAQgMAAgKgEgAl1geQgEACgEAGQgDAEgCAHQgBAGAAAFIABANQACAGADAFQAEAFAEADQAFACAHAAQAGAAAFgCQAFgDADgFQADgFABgGIACgNQAAgFgCgGQgBgHgDgEQgDgGgFgCQgFgDgGAAQgHAAgFADgAn9A0QgKgDgIgIQgHgHgEgLQgDgKAAgNQAAgKADgLQAEgLAIgHQAIgHAJgFQAKgEANAAQAOAAAKAFQAFACAFAEQAEADADAFQAGAJADAMQAEAMgBAKIhPAAQAAAHACAFQACAGAEADQAHAGAMAAQAJAAAHgEQAGgEACgFIAaAAQgEAJgEAHQgFAHgHAFQgMAIgTAAQgNAAgKgFgAnzgeQgEACgDADQgDAEgBAEIgCAHIAxAAQgCgLgFgGQgEgDgDgBQgFgCgFAAQgHAAgFADgAJOA2IAAg8IgCgLQgBgFgCgEQgCgCgEgCQgDgCgGAAQgMAAgGAHQgCAEgCAGQgBAGAAAIIAAA3IgdAAIAAhrIAcAAIAAAQIABAAQAFgKAJgFQAJgDAJAAQANAAAHACQAIAEAEAFQAFAHACAIQABAIAAAKIAABBgAHQA2IAAhrIAeAAIAABrgAGbA2IAAg8IgBgLQgBgFgDgEQgCgCgDgCQgEgCgFAAQgMAAgGAHQgCAEgCAGQgBAGgBAIIAAA3IgdAAIAAhrIAcAAIAAAQIABAAQAGgKAJgFQAIgDAKAAQAMAAAIACQAHAEAEAFQAFAHACAIQABAIAAAKIAABBgACeA2IAAhrIAeAAIAABrgAjiA2IAAiUIBOABIANADIAMAHIAKAIQAEAEAEAGQADAGADAGQAFAOAAATQAAARgEALQgCAHgEAHIgGALQgJAJgNAHIgNADQgIACgJAAgAjCAaIAeAAQAHABAGgDQAIgDAEgFQAGgFADgIQADgIAAgMQAAgLgCgJQgCgJgFgHQgFgHgJgDQgIgDgMAAIgYAAgAptA2IgahkIAAAAIgZBkIghAAIgoiUIAhAAIAYBkIAahkIAfAAIAaBlIAZhlIAgAAIgoCUgAHQhGIAAgYIAeAAIAAAYgACehGIAAgYIAeAAIAAAYg");
	this.shape_1.setTransform(0,-13.3);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-74.6,-22.8,149.3,42.3);


(lib.Empty = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.Btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		this.cursor = "pointer";
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3));

	// FlashAICB
	this.text = new cjs.Text("PLAY", "21px 'Helvetica'", "#CCCCCC");
	this.text.textAlign = "center";
	this.text.lineHeight = 23;
	this.text.lineWidth = 100;
	this.text.setTransform(62,92.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AjFDwQhShRAAh1IAAgVIBXAAIAAAVQAABSA4A4QA6A5BOAAQBPAAA4g5QA6g6ABhQQgBhGgxg4Qgxg2hKgJIAABUIiriBICriCIAABZQBsAIBLBQQBLBQAABrQAAB1hSBRQhTBShyAAQhzAAhShSg");
	this.shape.setTransform(65,49.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text,p:{text:"PLAY"}}]}).to({state:[{t:this.text,p:{text:"STOP"}}]},1).to({state:[{t:this.shape},{t:this.text,p:{text:"RESET"}}]},1).wait(1));

	// レイヤー 4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AiZkGIEzEGIkzEHg");
	this.shape_1.setTransform(64,48.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().dr(-6.5,-26.5,13,53);
	this.shape_2.setTransform(74.5,48.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().dr(-6.5,-26.5,13,53);
	this.shape_3.setTransform(53.5,48.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).wait(1));

	// レイヤー 3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.098)").s().rr(-64,-64,128,128,5);
	this.shape_4.setTransform(64,64);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.Clock = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		// スマホ向けにタッチ対応させる
		if(createjs.Touch.isSupported()){
			createjs.Touch.enable(stage);
		}
		stage.enableMouseOver();
		
		// -------------------------------
		// ストップウォッチ用
		// -------------------------------
		// 秒針配置のためのレイヤーを作成
		var wrapS = new createjs.Container();
		wrapS.x = this.sec_mc.x;
		wrapS.y = this.sec_mc.y;
		this.layerBg.addChild(wrapS);
		// 秒針用のシェイプを作成
		var shapeS = new createjs.Shape();
		wrapS.addChild(shapeS);
		// 秒針の目盛り線を描く
		drawLines(shapeS, 65, 4, "#666", 1.0, 60);  // 1秒間隔
		drawLines(shapeS, 65, 10, "#999", 1.0, 12); // 5秒間隔
		// 秒針の目盛りテキストを配置
		drawTexts(wrapS, 45, "#999", "12px Arial", 12, 5);
		
		// 分針配置のためのレイヤーを作成
		var wrapM = new createjs.Container();
		wrapM.x = this.min_mc.x;
		wrapM.y = this.min_mc.y;
		this.layerBg.addChild(wrapM);
		// 分針用のシェイプを作成
		var shapeM = new createjs.Shape();
		wrapM.addChild(shapeM);
		// 分針の目盛り線を描く
		drawLines(shapeM, 65, 4, "#666", 1.0, 30); // 1分間隔
		drawLines(shapeM, 65, 10, "#999", 1.0, 6); // 1分間隔
		// 分針の目盛りテキストを配置
		drawTexts(wrapM, 45, "#999", "12px Arial", 6, 5);
		
		// -------------------------------
		// 時計用
		// -------------------------------
		// 時計の目盛り配置のためのレイヤーを作成
		var wrapClockS = new createjs.Container();
		this.layerBg.addChild(wrapClockS);
		// 時計の目盛りのシェイプを作成
		var shapeClock = new createjs.Shape();
		wrapClockS.addChild(shapeClock);
		// 時計の目盛り線を描く
		drawLines(shapeClock, 200, 10, "#666", 1.0, 60);  // 60分間隔
		drawLines(shapeClock, 200, 15, "#999", 2.0, 12);  // 1時間間隔
		
		// 時計の目盛りテキストを配置
		drawTexts(wrapClockS, 170, "#fff", "24px Arial", 12, 1);
		
		
		
		
		// 一周分の線を描く
		// 引数 シェイプ, 円の半径, 目盛りの長さ, 色, 太さ, 目盛りの数
		function drawLines(
			targetShape, radius, length, 
			color, lineWidth, steps) {
			// 線の色と太さを指定
			targetShape.graphics
				.setStrokeStyle(lineWidth)
				.beginStroke(color);
		
			// 極座標におけるA点とB点の半径を算出
			var ar = radius - length;
			var br = radius;
		
			// 繰り返し文で1周処理させる
			// (1周=360度=2πはstepsの値で分割)
			for (var i = 0; i < steps; i++) {
				// 角度θを算出
				var theta = (i / steps) * (2 * Math.PI);
				theta -= Math.PI / 2;
				// A点の座標を計算 (直交座標に変換)
				var ax = ar * Math.cos(theta);
				var ay = ar * Math.sin(theta);
				// B点の座標を計算 (直交座標に変換)
				var bx = br * Math.cos(theta);
				var by = br * Math.sin(theta);
				// A点とB点を結ぶ
				targetShape.graphics
					.moveTo(ax, ay)
					.lineTo(bx, by);
			}
		}
		
		// 一周分の線を描く
		function drawTexts(container, radius, textColor, font, steps, xval) {
			// 繰り返し文で1周処理させる
			// 「0」ではなく目盛り文字を「12」にするため、
			// for文を1大きい数字で対応
			for (var i = 1; i < steps + 1; i++) {
				// 角度θを算出
				var theta = (i / steps) * (2 * Math.PI);
				// テキストを作成
				var str = i * xval; // 表示文言
				var t = new createjs.Text(str, font, textColor);
				// 配置座標を計算 (直交座標に変換)
				t.x = radius * Math.cos(theta - Math.PI / 2);
				t.y = radius * Math.sin(theta - Math.PI / 2);
				// テキストを水平・垂直両方でセンタリング
				t.textAlign = "center";
				t.textBaseline = "middle";
				container.addChild(t);
			}
		}
		
		
		
		var startTime;
		var state = "default";
		var previousSecound = 0;
		
		this.on("tick", onTick, this);
		this.btn.on("click", onClick, this);
		
		function onClick() {
			switch (state) {
				// 待機状態
				case "default":
					// 次の状態に
					state = "watch";
					this.btn.gotoAndStop(1);
					// 開始時間を保存			
					var now = new Date();
					startTime = now.getTime();
					
					break;
				// 計測中
				case "watch":
					// 次の状態に
					state = "stop";
					this.btn.gotoAndStop(2);
					break;
				// 停止中
				case "stop":
					// 次の状態に
					state = "default";
					this.btn.gotoAndStop(0);
					// 針をリセット
					createjs.Tween.get(this.sec_mc).to({rotation: 0}, 500);
					createjs.Tween.get(this.min_mc).to({rotation: 0}, 500);
					break;
			}
		}
		
		function onTick(event) {
			// 現在時刻
			var now = new Date();
			
			// 時計用の計算
			var h = now.getHours();
			var s = now.getSeconds();		
			var m = now.getMinutes();
			var ms = now.getMilliseconds();
			// それぞれの針の角度に適用
			this.clockSec_mc.rotation = (s + ms / 1000) * (360 / 60);
			this.clockMin_mc.rotation = (m + s / 60) * (360 / 60);
			this.clockHour_mc.rotation = (h + m / 60) * (360 / 12);
			
			if (state == "watch") {
				// 現在時刻と開始時刻の差分を求める
				var diffTime = now.getTime() - startTime;
				
				// 分/秒/ミリ秒に分解
				var diffDate = new Date(diffTime);
				var s = diffDate.getUTCSeconds();		
				var m = diffDate.getUTCMinutes();
				var ms = diffDate.getUTCMilliseconds();
		
				// それぞれの針の角度に適用
				this.sec_mc.rotation = (s + ms / 1000) * 6;
				this.min_mc.rotation = (m + s/60) * 12;
			}
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// btn
	this.btn = new lib.Btn();
	this.btn.setTransform(-221,156,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.btn).wait(1));

	// clockSec_mc
	this.clockSec_mc = new lib.LineSec();

	this.timeline.addTween(cjs.Tween.get(this.clockSec_mc).wait(1));

	// clockHour_mc
	this.clockHour_mc = new lib.LineHour();

	this.timeline.addTween(cjs.Tween.get(this.clockHour_mc).wait(1));

	// clockMin_mc
	this.clockMin_mc = new lib.LineMin();

	this.timeline.addTween(cjs.Tween.get(this.clockMin_mc).wait(1));

	// min_mc
	this.min_mc = new lib.LineStopWatch();
	this.min_mc.setTransform(90,0);

	this.timeline.addTween(cjs.Tween.get(this.min_mc).wait(1));

	// sec_mc
	this.sec_mc = new lib.LineStopWatch();
	this.sec_mc.setTransform(-90,0);

	this.timeline.addTween(cjs.Tween.get(this.sec_mc).wait(1));

	// LabelLogo
	this.instance = new lib.LabelLogo();
	this.instance.setTransform(-0.6,100.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// layerBg
	this.layerBg = new lib.Empty();

	this.timeline.addTween(cjs.Tween.get(this.layerBg).wait(1));

	// レイヤー 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#222222").ss(2,1,1).de(-149,-149,298,298);
	this.shape.setTransform(-409.4,-336.9,1.342,1.342,0,0,0,-305,-251);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221,-201,422,421);


// stage content:
(lib.clock_watch = function() {
	this.initialize();

	// Clock
	this.instance = new lib.Clock();
	this.instance.setTransform(256,256);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(291,311,422,421);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;