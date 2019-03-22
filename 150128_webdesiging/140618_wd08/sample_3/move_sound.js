(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 768,
	fps: 60,
	color: "#000000",
	manifest: [
		{src:"images/NoteBmp04.png", id:"NoteBmp04"},
		{src:"images/NoteBmp05.png", id:"NoteBmp05"},
		{src:"images/NoteBmp06.png", id:"NoteBmp06"},
		{src:"sounds/sound_1.mp3", id:"sound_1"},
		{src:"sounds/sound_2.mp3", id:"sound_2"},
		{src:"sounds/sound_3.mp3", id:"sound_3"},
		{src:"sounds/sound_4.mp3", id:"sound_4"},
		{src:"sounds/sound_5.mp3", id:"sound_5"},
		{src:"sounds/sound_6.mp3", id:"sound_6"},
		{src:"sounds/sound_7.mp3", id:"sound_7"}
	]
};



// symbols:



(lib.NoteBmp04 = function() {
	this.initialize(img.NoteBmp04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,140,162);


(lib.NoteBmp05 = function() {
	this.initialize(img.NoteBmp05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,166,188);


(lib.NoteBmp06 = function() {
	this.initialize(img.NoteBmp06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,106,170);


(lib.Textobj = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1C7FF").s().p("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");
	this.shape.setTransform(199.4,17.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,398.9,35.8);


(lib.NoteGr06 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.NoteBmp06();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,106,170);


(lib.NoteGr05 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.NoteBmp05();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,166,188);


(lib.NoteGr04 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.NoteBmp04();
	this.instance.setTransform(-70,-81);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-70,-81,140,162);


(lib.NoteGr03 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00CCFF").s().p("AoqLiQgggLgUgXQgjgsAAg0QAAg0AlgvQAmgtBCgbQAzgUAtAAQBNgBAxAWIAAvCIOYjhIAAPpQAAA9gVAvQgTAwgnAlQgrAlgzAXQg0AVgzAAQgqAAghgMQgfgMgVgVQgjgsAAg1QAAguAdgqQAdgpAzgcQBHgkA1AAQBOAAA5AYIAAq/IsLDDIAAMDQAABGgZA2QgNAcgbAdQgbAagiAUQgjAWgmALQglAMgkAAQgqAAghgMg");
	this.shape.setTransform(64.3,75);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128.6,150);


(lib.NoteGr02 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9053CE").s().p("AmTLXQgfgYAAgqQAAgjASgkQAUgnAlgiQArglA7gXQBCgaBTgIIAAyUIANAAQBDBsAoAsQAnAoCbB/IBUBHQArAqAdAmQAjAvASAxQAUA2AAA9QAAAygTA5QgTBDgmA9QgtBIg/A5QhJBBhdAoIgDgFQA+g3Bmh1QA3hLAbhHQAVg5AAgqQAAhFgsg1Qgcgkg9gkIkKiWIAAM4QAAAlgcAzQgbAwgrAvQgsAvgvAcQg2AggqABQgngBgdgWg");
	this.shape.setTransform(43.6,75);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,87.2,150);


(lib.NoteGr01 = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AoqLiQgggLgUgXQgjgsAAg0QAAg0AlgvQAmgtBCgbQAzgUAtAAQBNgBAxAWIAAvCIOYjhIAAPpQAAA9gVAvQgTAwgnAlQgrAlgzAXQg0AVgzAAQgqAAghgMQgfgMgVgVQgjgsAAg1QAAguAdgqQAdgpAzgcQBHgkA1AAQBOAAA5AYIAAnJIsLDCIAAIOQgHBPgPAlQgQAlgnAmQgrAmgzAVQg0AWgxAAQgqAAghgMgAjPleIAABxIMLjDIAAhwg");
	this.shape.setTransform(64.3,75);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128.6,150);


(lib.Notes = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6));

	// gr
	this.instance = new lib.NoteGr01();
	this.instance.setTransform(0,0,1,1,0,0,0,64.2,75);
	this.instance.compositeOperation = "lighter";
	this.instance.cache(-2,-2,133,154);

	this.instance_1 = new lib.NoteGr02();
	this.instance_1.setTransform(0.1,0,1,1,0,0,0,43.6,75);
	this.instance_1.compositeOperation = "lighter";
	this.instance_1.cache(-2,-2,91,154);

	this.instance_2 = new lib.NoteGr03();
	this.instance_2.setTransform(0,0,1,1,0,0,0,64.2,75);
	this.instance_2.compositeOperation = "lighter";
	this.instance_2.cache(-2,-2,133,154);

	this.instance_3 = new lib.NoteGr04();
	this.instance_3.compositeOperation = "lighter";

	this.instance_4 = new lib.NoteGr05();
	this.instance_4.setTransform(0,0,1,1,0,0,0,83,94);
	this.instance_4.compositeOperation = "lighter";

	this.instance_5 = new lib.NoteGr06();
	this.instance_5.setTransform(0,0,1,1,0,0,0,53,85);
	this.instance_5.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.2,-75,128.6,150);


// stage content:
(lib.move_sound = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		//タッチイベントが有効なブラウザの場合、
		// CreateJSでタッチイベントを扱えるようにする
		if (createjs.Touch.isSupported()){
			createjs.Touch.enable(stage);
		}
		
		// イベント登録
		stage.on("stagemousemove", handleMouseMove, this);
		createjs.Ticker.on("tick", handleTick, this);
		
		// 変数宣言
		var currentX = 0;
		var currentY = 0;
		var prevX = 0;
		var prevY = 0;
		var cntMelody = 0;
		var cntTick = 0;
		
		// マウスを動かした時
		function handleMouseMove(event) {
			currentX = event.stageX;
			currentY = event.stageY;
		}
		
		// エンターフレームイベント
		function handleTick(event) {
		
			// マウスの移動量を算出
			var mx = (currentX - prevX);
			var my = (currentY - prevY);
		
			// 小さい移動だったら関数は終了する
			if (Math.abs(mx) < 2 || Math.abs(my) < 2) { return; }
		
			// 音符のグラフィックを作成
			var note = new lib.Notes();
			var frame = Math.floor(6 * Math.random());
			note.gotoAndStop(frame);
			stage.addChild(note);
		
		
		
			// 5フレームに1回処理
			if (cntTick++ % 5 == 0) {
				if (mx > 0) {
					cntMelody++;
					if (cntMelody > 7){ cntMelody = 0; }
				} else {
					cntMelody--;
					if (cntMelody < 0){ cntMelody = 7; }
				}
				// 音を再生
				createjs.Sound.play("sound_" + cntMelody);
			}
		
			// マウス座標を記録
			prevX = currentX;
			prevY = currentY;
			
			// 音符のモーションの初期値を指定
			note.x = currentX;
			note.y = currentY;
			note.scaleX = note.scaleY = 0;
			
			// 音符のモーションの実装 (終点の値を指定)
			createjs.Tween
				.get(note) 
				// 音符を2秒かけてアニメーションさせる
				.to({
					x: note.x + mx,
					y: note.y + my,
					scaleX: 1, scaleY: 1, alpha: 0
				}, 2000, createjs.Ease.cubicOut)
				// 音符を削除する
				.call(stage.removeChild, [note], stage);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// text
	this.instance = new lib.Textobj();
	this.instance.setTransform(505.1,720.9,1,1,0,0,0,199.4,17.9);
	this.instance.cache(-2,-2,403,40);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#1F0046","#1A72CB"],[0,1],0,512,0,-511.9).s().dr(-512,-384,1024,768);
	this.shape.setTransform(512,384);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(512,384,1024,768);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;