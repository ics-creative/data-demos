(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 960,
	height: 540,
	fps: 60,
	color: "#000000",
	manifest: []
};



// symbols:



(lib.LineSec = function() {
	this.initialize();

	// レイヤー 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3300").s("#000000").ss(2,1,1).de(-6.9,-6.9,13.8,13.8);
	this.shape.setTransform(0,0,0.58,0.58);

	// レイヤー 5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().de(-6.9,-6.9,13.8,13.8);
	this.shape_1.setTransform(0,0,1.014,1.014);

	// レイヤー 6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC3333").s().dr(-0.65,-110,1.3,220);
	this.shape_2.setTransform(0.1,-90,1.04,1);

	this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-7,-200,14,220);


(lib.LineMin = function() {
	this.initialize();

	// レイヤー 5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s("#FFFFFF").ss(2,1,1).rr(-2.5,-20,5,40,2.5);
	this.shape.setTransform(0,-40,1.004,1);

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
p.nominalBounds = new cjs.Rectangle(-7,-61,14,68);


(lib.LabelLogo = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AjjBfIAAiQIAdAAIAAAOIAAAAQAGgJAIgEQAIgEAKAAQANAAAKAFQAJAEAGAIQAGAIADALQADALAAAJQAAALgDAKQgDAKgGAIQgGAIgJAEQgEADgFABIgMABQgKAAgJgEQgIgEgFgIIgBAAIAAAzgAi5gbQgFADgDAFQgCAFgBAGIgCALIACANQABAGADAFQADAFAFADQAFADAHAAQAIAAAFgDQAFgDADgFQACgFABgGIACgNIgCgLQgBgGgDgFQgDgFgFgDQgFgDgHAAQgIAAgFADgAoSA6QgMgEgJgGIgJgHIgFgKQgGgKAAgNIAhAAQgBAHADAFQADAGAFADQAEADAGACQAGABAGAAIAKgBQAFAAAFgCQAEgCADgEQADgEAAgFQAAgHgEgDQgEgEgHgDIgugLQgIgDgHgFQgFgFgFgHQgDgIAAgKQgBgGACgFQABgFACgEQAGgIAIgGQAHgGALgCQAKgDAJAAQAMAAALACQALADAJAGQAIAGAFAJQACAEACAGIABAMIggAAQAAgHgDgEQgDgFgEgCQgEgDgFgBIgLgBIgIABIgHADQgEACgBADQgDAEAAAEQAAAFACACQACADAEADIAxANQAIACAGAFQAIAFAGAIQAFAGAAANQAAAKgEAJQgEAJgIAGQgIAGgMAEQgQAEgLAAQgMAAgLgDgAF7A4QgLgEgHgIQgHgHgEgKQgEgKAAgMQAAgLAEgLQADgLAIgIQAHgHAKgFQAFgCAGgBIAMgBQAKAAAJACQAJADAHAFQAHAFAFAIQAEAHAAALIgdAAQgDgTgTAAQgHAAgFADQgFAEgDAFQgDAFgBAGIgBALIABALQABAHADAEQADAFAFAEQAFADAGAAQAGAAAEgCQAEgBADgDQAGgGACgKIAcAAQgBAKgEAJQgFAIgHAGQgHAFgIADQgJADgLAAQgMAAgKgEgACtA6QgHgCgEgEQgGgEgCgGQgDgGAAgIQAAgKADgGQADgGAGgDQAEgDAHgBIAmgGQAGgBACgDQADgCAAgFQAAgEgCgDQgBgDgDgCIgGgCIgIAAQgIAAgFADQgFAEgBAJIgeAAQAAgKAGgHQAEgHAHgFQAHgEAJgBQAJgCAJAAIAQABQAJABAHADQAHAEAEAGQAFAGAAAKIAABEQABAHACADIgeAAIgCgKQgHAHgJADQgLADgJAAQgIAAgHgCgADaAHIgUADIgHACIgFADIgEAEQgCADABAEQgBAEACADIAEAEIAGADIAHAAQAJAAAEgDQAGgDABgEQADgEABgEIAAgSgAlFA4QgLgEgGgHQgIgIgEgKQgEgLAAgNQAAgLAEgLQAEgKAIgIQAGgHALgEQALgEAMAAQAIAAAQAEQAJAEAIAHQAIAIAEAKQADAPAAAHQgBARgCAHQgEAKgIAIQgIAHgJAEQgLAEgNAAQgMAAgLgEgAk6gbQgGADgCAFQgDAFgCAGIgBALIABANQACAGADAFQACAFAGADQAEADAIAAQAIAAAFgDQAFgDADgFQADgFABgGQABgGAAgHIgBgLQgBgGgDgFQgDgFgFgDQgFgDgIAAQgIAAgEADgAExA5QgGgBgFgCQgEgDgDgFQgDgFAAgIIAAg+IgTAAIAAgUIATAAIAAghIAeAAIAAAhIAVAAIAAAUIgVAAIAAAzQAAAIACACQADADAHAAIAJgBIAAAXIgRABgAmPA5QgHgBgEgCQgFgDgDgFQgCgFAAgIIAAg+IgSAAIAAgUIASAAIAAghIAdAAIAAAhIAXAAIAAAUIgXAAIAAAzQABAIACACQADADAHAAIAKgBIAAAXIgSABgAIeA5IAAg7IgBgMQgBgFgCgDQgDgDgDgCQgEgCgFAAQgMAAgGAIQgDADgBAGQgCAGAAAGIAAA5IgdAAIAAiUIAdAAIAAA5IABAAQAGgKAJgEQAIgEAJAAQAMAAAHADQAJADADAGQAFAGACAIQABAIAAAKIAABBgABHA5IgahkIAAAAIgZBkIggAAIgniUIAhAAIAVBkIAbhkIAfAAIAZBmIAZhmIAhAAIgpCUg");
	this.shape.setTransform(0.3,13.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#555555").s().p("AKiBdQgJgCgHgEQgGgEgFgHQgEgGgBgKIAeAAQACAJAGACQAGAEAIAAQAGAAAFgCQAEgCADgDIAFgJQABgFAAgFIAAgPIAAAAQgDAFgEADIgIAEQgIAFgKAAQgMAAgJgFQgJgEgGgHQgFgIgDgKQgCgKAAgIQAAgLACgKQAEgKAFgHQAHgIAIgEQAJgEALAAQALAAAIADQAIAFAGAJIAAAAIAAgPIAcAAIAABkIgBAPQgDAIgFAIQgGAHgLAFQgLAFgTAAQgIAAgIgCgAKqgeQgFACgDAEQgDAFgCAFIgBAMIABAJQACAGADAFQACAEAFADQAFADAGAAQAHAAAEgCQAGgDACgEQAEgEACgGQABgEAAgFQAAgGgBgGQgCgHgDgEQgCgEgGgDQgEgDgIAAQgGAAgEADgADyBdQgIgCgHgEQgGgEgFgHQgFgGAAgKIAeAAQACAJAGACQAGAEAIAAQAGAAAFgCQAEgCADgDIAFgJQABgFAAgFIAAgPIAAAAQgDAFgEADIgIAEQgIAFgKAAQgMAAgJgFQgJgEgGgHQgFgIgDgKQgCgKgBgIQAAgLADgKQAEgKAFgHQAHgIAIgEQAJgEALAAQALAAAIADQAIAFAGAJIAAAAIAAgPIAcAAIAABkIgBAPQgDAIgFAIQgGAHgMAFQgKAFgTAAQgIAAgJgCgAD7geQgFACgDAEQgDAFgBAFIgCAMIACAJQABAGACAFQADAEAFADQAFADAGAAQAHAAAEgCQAGgDACgEQADgEADgGQABgEAAgFQAAgGgBgGQgBgHgEgEQgCgEgGgDQgEgDgIAAQgGAAgEADgABHA3QgJgCgHgEQgGgFgFgHQgEgIgBgLIAdAAQAAAGACADQACAEACACQAEACAEABIAIABIAHgBIAGgCQADgCACgCQACgDAAgEQAAgHgJgDQgJgEgQgDIgNgDQgGgCgEgCQgFgDgDgFQgDgFAAgGQAAgLADgHQAFgGAGgEQAHgFAIgBQAJgCAJABQAJgBAIACQAJACAGAEQAGAEAFAHQAEAGABAKIgdAAQAAgIgGgEQgGgDgIAAIgGAAIgFACIgEADQgBACgBADQAAAFADACQAEADAEABIAkAJQAGADAFADQAFACADAEQADAFAAAIQgBALgEAHQgEAHgHAFQgHAEgJACQgJACgJAAQgJAAgKgCgAgvA0QgLgDgGgIQgHgHgFgLQgEgKAAgNQAAgKAEgLQAFgLAHgHQAIgHAKgFQAJgEANAAQAOAAAKAFQAEACAEAEQAEADADAFQAHAJADAMQACAMAAAKIhNAAQAAAHADAFQABAGAEADQAGAGANAAQAJAAAGgEQAHgEABgFIAZAAQgDAJgFAHQgFAHgGAFQgLAIgTAAQgNAAgKgFgAgkgeQgGACgCADQgDAEgBAEIgCAHIAxAAQgCgLgFgGQgEgDgEgBQgDgCgGAAQgHAAgEADgAl1A1QgJgEgFgJIAAAAIAAAOIgcAAIAAiUIAdAAIAAA3IAAAAQAGgJAKgEQAJgDAKAAQAIAAAIADQAIADAGAHQAHAHAEALQAEAPAAAJQgCASgCAHQgEALgHAHQgGAHgIADQgIAEgIAAQgMAAgKgEgAl1geQgEACgEAGQgDAEgCAHQgBAGAAAFIABANQACAGADAFQAEAFAEADQAFACAHAAQAGAAAFgCQAFgDADgFQADgFABgGIACgNQAAgFgCgGQgBgHgDgEQgDgGgFgCQgFgDgGAAQgHAAgFADgAn9A0QgKgDgIgIQgHgHgEgLQgDgKAAgNQAAgKADgLQAEgLAIgHQAIgHAJgFQAKgEANAAQAOAAAKAFQAFACAFAEQAEADADAFQAGAJADAMQAEAMgBAKIhPAAQAAAHACAFQACAGAEADQAHAGAMAAQAJAAAHgEQAGgEACgFIAaAAQgEAJgEAHQgFAHgHAFQgMAIgTAAQgNAAgKgFgAnzgeQgEACgDADQgDAEgBAEIgCAHIAxAAQgCgLgFgGQgEgDgDgBQgFgCgFAAQgHAAgFADgAJOA2IAAg8IgCgLQgBgFgCgEQgCgCgEgCQgDgCgGAAQgMAAgGAHQgCAEgCAGQgBAGAAAIIAAA3IgdAAIAAhrIAcAAIAAAQIABAAQAFgKAJgFQAJgDAJAAQANAAAHACQAIAEAEAFQAFAHACAIQABAIAAAKIAABBgAHQA2IAAhrIAeAAIAABrgAGbA2IAAg8IgBgLQgBgFgDgEQgCgCgDgCQgEgCgFAAQgMAAgGAHQgCAEgCAGQgBAGgBAIIAAA3IgdAAIAAhrIAcAAIAAAQIABAAQAGgKAJgFQAIgDAKAAQAMAAAIACQAHAEAEAFQAFAHACAIQABAIAAAKIAABBgACeA2IAAhrIAeAAIAABrgAjiA2IAAiUIBOABIANADIAMAHIAKAIQAEAEAEAGQADAGADAGQAFAOAAATQAAARgEALQgCAHgEAHIgGALQgJAJgNAHIgNADQgIACgJAAgAjCAaIAeAAQAHABAGgDQAIgDAEgFQAGgFADgIQADgIAAgMQAAgLgCgJQgCgJgFgHQgFgHgJgDQgIgDgMAAIgYAAgAptA2IgahkIAAAAIgZBkIghAAIgoiUIAhAAIAYBkIAahkIAfAAIAaBlIAZhlIAgAAIgoCUgAHQhGIAAgYIAeAAIAAAYgACehGIAAgYIAeAAIAAAYg");
	this.shape_1.setTransform(0,-13.3);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-74.6,-22.8,149.3,45.8);


(lib.Empty = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


(lib.Btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
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
		
		// 秒針配置のためのレイヤーを作成
		var wrapS = new createjs.Container();
		this.layerBg.addChild(wrapS);
		// 秒針用のシェイプを作成
		var shapeS = new createjs.Shape();
		wrapS.addChild(shapeS);
		// 秒針の目盛り線を描く
		drawLines(shapeS, 200, 10, "#999", 2.0, 12);//5秒間隔
		drawLines(shapeS, 200, 8, "#666", 1.0, 60);//1秒間隔
		drawLines(shapeS, 200, 4, "#666", 1.0, 300);//0.2秒間隔
		// 秒針の目盛りテキストを配置
		drawTexts(wrapS, 160, "#fff", "32px Arial", 12, 5);
		
		// 分針配置のためのレイヤーを作成
		var wrapM = new createjs.Container();
		wrapM.y = this.min_mc.y;
		this.layerBg.addChild(wrapM);
		// 分針用のシェイプを作成
		var shapeM = new createjs.Shape();
		wrapM.addChild(shapeM);
		// 分針の目盛り線を描く
		drawLines(shapeM, 65, 4, "#666", 1.0, 60);
		drawLines(shapeM, 65, 10, "#999", 1.0, 12);
		// 分針の目盛りテキストを配置
		drawTexts(wrapM, 45, "#fff", "12px Arial", 6, 5);
		
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
			for (var i = 0; i < steps; i++) {
				// 角度θを算出
				var theta = (i / steps) * (2 * Math.PI);
				// テキストを作成
				var string = i * xval; // 表示文言
				var t = new createjs.Text(string, font, textColor);
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
			if (state == "watch") {
				// 現在時刻と開始時刻の差分を求める
				var now = new Date();
				var diffTime = now.getTime() - startTime;
				
				// 分/秒/ミリ秒に分解
				var diffDate = new Date(diffTime);
				var s = diffDate.getUTCSeconds();		
				var m = diffDate.getUTCMinutes();
				var ms = diffDate.getUTCMilliseconds();
		
				// それぞれの針の角度に適用
				this.sec_mc.rotation = s * 6 + ms * 6 / 1000;
				this.min_mc.rotation = m * 6 + s / 10;
			}
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// btn
	this.btn = new lib.Btn();
	this.btn.setTransform(340,-64);

	this.timeline.addTween(cjs.Tween.get(this.btn).wait(1));

	// sec_mc
	this.sec_mc = new lib.LineSec();

	this.timeline.addTween(cjs.Tween.get(this.sec_mc).wait(1));

	// min_mc
	this.instance = new lib.LabelLogo();
	this.instance.setTransform(-0.6,70.9);
	this.instance.cache(-77,-25,153,50);

	this.min_mc = new lib.LineMin();
	this.min_mc.setTransform(0,-80);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.min_mc},{t:this.instance}]}).wait(1));

	// layerBg
	this.layerBg = new lib.Empty();

	this.timeline.addTween(cjs.Tween.get(this.layerBg).wait(1));

	// レイヤー 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(2,1,1).de(-149,-149,298,298);
	this.shape.setTransform(0,0,1.342,1.342);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-201,-201,669,402);


// stage content:
(lib.clock_time = function() {
	this.initialize();

	// Clock
	this.instance = new lib.Clock();
	this.instance.setTransform(340,270);

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#000000","#002133"],[0,1],-339.4,-339.4,339.4,339.4).s().dr(-480,-270,960,540);
	this.shape.setTransform(480,270);

	this.addChild(this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(480,270,960,540);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;