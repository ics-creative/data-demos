(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 768,
	fps: 60,
	color: "#000000",
	manifest: [
		{src:"images/FlareBMP.png", id:"FlareBMP"},
		{src:"images/LightBMP.png", id:"LightBMP"},
		{src:"images/LightBurstBMP.png", id:"LightBurstBMP"},
		{src:"images/LineBMP.png", id:"LineBMP"},
		{src:"images/LogoBMP.png", id:"LogoBMP"},
		{src:"images/StarBMP.png", id:"StarBMP"}
	]
};



// symbols:



(lib.FlareBMP = function() {
	this.initialize(img.FlareBMP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,160,160);


(lib.LightBMP = function() {
	this.initialize(img.LightBMP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.LightBurstBMP = function() {
	this.initialize(img.LightBurstBMP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,111,111);


(lib.LineBMP = function() {
	this.initialize(img.LineBMP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,512,16);


(lib.LogoBMP = function() {
	this.initialize(img.LogoBMP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,581,114);


(lib.StarBMP = function() {
	this.initialize(img.StarBMP);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,224,224);


(lib.LineMC = function() {
	this.initialize();

	// Line
	this.instance = new lib.LineBMP();
	this.instance.setTransform(-256,-8);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-256,-8,512,16);


(lib.LightMC = function() {
	this.initialize();

	// Light
	this.instance = new lib.LightBMP();
	this.instance.setTransform(-150,-150);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-150,-150,300,300);


(lib.LightBurstMC = function() {
	this.initialize();

	// LightBurst
	this.instance = new lib.LightBurstBMP();
	this.instance.setTransform(0,-392.5,5,5,45);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-392.4,-392.5,784.9,784.9);


(lib.GradationOverlayMC = function() {
	this.initialize();

	// GradationOverlay
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#000000","#D1D1D1","#000000"],[0.212,0.502,0.851],-206.3,-115.6,125.6,216.3).s().dr(-256,-91.35,512,182.7);
	this.shape.setTransform(256,91.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,512,182.7);


(lib.FlareMC = function() {
	this.initialize();

	// Flare
	this.instance = new lib.FlareBMP();
	this.instance.setTransform(-80,-80);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-80,-80,160,160);


(lib.StarGr = function() {
	this.initialize();

	// Star
	this.instance = new lib.StarBMP();
	this.instance.setTransform(-12,-12,0.107,0.107);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-12,-12,24,24);


(lib.Star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// StarMotion
	this.instance = new lib.StarGr("synched",0);
	this.instance.setTransform(0,0,0.532,0.532);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.64,scaleY:1.64,alpha:0.181},0).wait(1).to({scaleX:2.1,scaleY:2.1,alpha:0.723},0).wait(1).to({scaleX:1.57,scaleY:1.57,alpha:0.624},0).wait(1).to({scaleX:1.13,scaleY:1.13,alpha:0.18},0).wait(1).to({scaleX:0.79,scaleY:0.79,alpha:0.563},0).wait(1).to({scaleX:0.54,scaleY:0.54,alpha:0.132},0).wait(1).to({scaleX:0.39,scaleY:0.39,alpha:0.026},0).wait(1).to({scaleX:0.35,scaleY:0.35,alpha:0},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-6.4,12.8,12.8);


(lib.LogoGr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Kirari
	this.instance = new lib.LightBurstMC();
	this.instance.setTransform(18.6,-31.7,0.05,0.05);
	this.instance.compositeOperation = "lighter";
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(15).to({_off:false},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:19.3,alpha:0.988},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:20,alpha:0.976},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:20.6,alpha:0.964},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:21.2,alpha:0.952},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:21.8,alpha:0.94},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:22.3,alpha:0.929},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:22.8,alpha:0.917},0).wait(1).to({scaleX:0.1,scaleY:0.1,x:23.3,alpha:0.905},0).wait(1).to({scaleX:0.1,scaleY:0.1,x:23.8,alpha:0.893},0).wait(1).to({scaleX:0.1,scaleY:0.1,x:24.2,alpha:0.881},0).wait(1).to({scaleX:0.1,scaleY:0.1,x:24.7,alpha:0.869},0).wait(1).to({scaleX:0.1,scaleY:0.1,x:25,alpha:0.857},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:25.4,alpha:0.845},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:25.8,alpha:0.833},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:26.1,alpha:0.821},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:26.4,alpha:0.81},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:26.7,alpha:0.798},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:27,alpha:0.786},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:27.3,alpha:0.774},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:27.5,alpha:0.762},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:27.8,alpha:0.75},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:28,alpha:0.738},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:28.2,alpha:0.726},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:28.4,alpha:0.714},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:28.5,alpha:0.702},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:28.7,alpha:0.69},0).wait(1).to({scaleX:0.08,scaleY:0.08,x:28.9,alpha:0.679},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29,alpha:0.667},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29.2,alpha:0.655},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29.3,alpha:0.643},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29.4,alpha:0.631},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29.5,alpha:0.619},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29.6,alpha:0.607},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:29.7,alpha:0.595},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:29.8,alpha:0.583},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:29.9,alpha:0.571},0).wait(1).to({scaleX:0.06,scaleY:0.06,alpha:0.56},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:30,alpha:0.548},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:30.1,alpha:0.536},0).wait(1).to({scaleX:0.06,scaleY:0.06,alpha:0.524},0).wait(1).to({scaleX:0.06,scaleY:0.06,x:30.2,alpha:0.512},0).wait(1).to({scaleX:0.06,scaleY:0.06,alpha:0.5},0).wait(1).to({scaleX:0.05,scaleY:0.05,x:30.3,alpha:0.488},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.476},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.464},0).wait(1).to({scaleX:0.05,scaleY:0.05,x:30.4,alpha:0.452},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.44},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.429},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.417},0).wait(1).to({scaleX:0.05,scaleY:0.05,x:30.5,alpha:0.405},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.393},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.381},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.369},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.357},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.345},0).wait(1).to({scaleX:0.04,scaleY:0.04,x:30.6,alpha:0.333},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.321},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.31},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.298},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.286},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.274},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.262},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.25},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.238},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.226},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.214},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.202},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.19},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.179},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.167},0).wait(1).to({scaleX:0.02,scaleY:0.02,y:-31.6,alpha:0.155},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.143},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.131},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.119},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.107},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.095},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.083},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.071},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.06},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.048},0).wait(1).to({scaleX:0,scaleY:0,alpha:0.036},0).wait(1).to({scaleX:0,scaleY:0,alpha:0.024},0).wait(1).to({scaleX:0,scaleY:0,alpha:0.012},0).wait(1).to({scaleX:0,scaleY:0,x:-30.6,y:31.7,alpha:0},0).to({_off:true},1).wait(50));

	// Kirari
	this.instance_1 = new lib.LightBurstMC();
	this.instance_1.setTransform(286.4,19.3,0.05,0.05);
	this.instance_1.compositeOperation = "lighter";
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(15).to({_off:false},0).wait(1).to({scaleX:0.07,scaleY:0.07,y:16.5,alpha:0.988},0).wait(1).to({scaleX:0.09,scaleY:0.09,y:13.9,alpha:0.976},0).wait(1).to({scaleX:0.11,scaleY:0.11,y:11.4,alpha:0.964},0).wait(1).to({scaleX:0.13,scaleY:0.13,y:9.1,alpha:0.952},0).wait(1).to({scaleX:0.14,scaleY:0.14,y:6.8,alpha:0.94},0).wait(1).to({scaleX:0.16,scaleY:0.16,y:4.7,alpha:0.929},0).wait(1).to({scaleX:0.18,scaleY:0.18,y:2.7,alpha:0.917},0).wait(1).to({scaleX:0.2,scaleY:0.2,y:0.8,alpha:0.905},0).wait(1).to({scaleX:0.2,scaleY:0.2,y:-1.1,alpha:0.893},0).wait(1).to({scaleX:0.2,scaleY:0.2,y:-2.8,alpha:0.881},0).wait(1).to({scaleX:0.19,scaleY:0.19,y:-4.4,alpha:0.869},0).wait(1).to({scaleX:0.19,scaleY:0.19,y:-6,alpha:0.857},0).wait(1).to({scaleX:0.19,scaleY:0.19,y:-7.4,alpha:0.845},0).wait(1).to({scaleX:0.18,scaleY:0.18,y:-8.8,alpha:0.833},0).wait(1).to({scaleX:0.18,scaleY:0.18,y:-10.1,alpha:0.821},0).wait(1).to({scaleX:0.18,scaleY:0.18,y:-11.4,alpha:0.81},0).wait(1).to({scaleX:0.18,scaleY:0.18,y:-12.5,alpha:0.798},0).wait(1).to({scaleX:0.17,scaleY:0.17,y:-13.6,alpha:0.786},0).wait(1).to({scaleX:0.17,scaleY:0.17,y:-14.7,alpha:0.774},0).wait(1).to({scaleX:0.17,scaleY:0.17,y:-15.6,alpha:0.762},0).wait(1).to({scaleX:0.17,scaleY:0.17,y:-16.6,alpha:0.75},0).wait(1).to({scaleX:0.16,scaleY:0.16,y:-17.4,alpha:0.738},0).wait(1).to({scaleX:0.16,scaleY:0.16,y:-18.2,alpha:0.726},0).wait(1).to({scaleX:0.16,scaleY:0.16,y:-19,alpha:0.714},0).wait(1).to({scaleX:0.16,scaleY:0.16,y:-19.7,alpha:0.702},0).wait(1).to({scaleX:0.15,scaleY:0.15,y:-20.3,alpha:0.69},0).wait(1).to({scaleX:0.15,scaleY:0.15,y:-20.9,alpha:0.679},0).wait(1).to({scaleX:0.15,scaleY:0.15,y:-21.5,alpha:0.667},0).wait(1).to({scaleX:0.14,scaleY:0.14,y:-22,alpha:0.655},0).wait(1).to({scaleX:0.14,scaleY:0.14,y:-22.5,alpha:0.643},0).wait(1).to({scaleX:0.14,scaleY:0.14,y:-23,alpha:0.631},0).wait(1).to({scaleX:0.14,scaleY:0.14,y:-23.4,alpha:0.619},0).wait(1).to({scaleX:0.13,scaleY:0.13,y:-23.8,alpha:0.607},0).wait(1).to({scaleX:0.13,scaleY:0.13,y:-24.2,alpha:0.595},0).wait(1).to({scaleX:0.13,scaleY:0.13,y:-24.5,alpha:0.583},0).wait(1).to({scaleX:0.13,scaleY:0.13,y:-24.8,alpha:0.571},0).wait(1).to({scaleX:0.12,scaleY:0.12,y:-25.1,alpha:0.56},0).wait(1).to({scaleX:0.12,scaleY:0.12,y:-25.4,alpha:0.548},0).wait(1).to({scaleX:0.12,scaleY:0.12,y:-25.6,alpha:0.536},0).wait(1).to({scaleX:0.12,scaleY:0.12,y:-25.8,alpha:0.524},0).wait(1).to({scaleX:0.11,scaleY:0.11,y:-26,alpha:0.512},0).wait(1).to({scaleX:0.11,scaleY:0.11,y:-26.2,alpha:0.5},0).wait(1).to({scaleX:0.11,scaleY:0.11,y:-26.4,alpha:0.488},0).wait(1).to({scaleX:0.11,scaleY:0.11,y:-26.6,alpha:0.476},0).wait(1).to({scaleX:0.1,scaleY:0.1,y:-26.7,alpha:0.464},0).wait(1).to({scaleX:0.1,scaleY:0.1,y:-26.8,alpha:0.452},0).wait(1).to({scaleX:0.1,scaleY:0.1,y:-26.9,alpha:0.44},0).wait(1).to({scaleX:0.1,scaleY:0.1,y:-27,alpha:0.429},0).wait(1).to({scaleX:0.09,scaleY:0.09,y:-27.1,alpha:0.417},0).wait(1).to({scaleX:0.09,scaleY:0.09,y:-27.2,alpha:0.405},0).wait(1).to({scaleX:0.09,scaleY:0.09,y:-27.3,alpha:0.393},0).wait(1).to({scaleX:0.08,scaleY:0.08,alpha:0.381},0).wait(1).to({scaleX:0.08,scaleY:0.08,y:-27.4,alpha:0.369},0).wait(1).to({scaleX:0.08,scaleY:0.08,alpha:0.357},0).wait(1).to({scaleX:0.08,scaleY:0.08,y:-27.5,alpha:0.345},0).wait(1).to({scaleX:0.07,scaleY:0.07,alpha:0.333},0).wait(1).to({scaleX:0.07,scaleY:0.07,alpha:0.321},0).wait(1).to({scaleX:0.07,scaleY:0.07,y:-27.6,alpha:0.31},0).wait(1).to({scaleX:0.07,scaleY:0.07,alpha:0.298},0).wait(1).to({scaleX:0.06,scaleY:0.06,alpha:0.286},0).wait(1).to({scaleX:0.06,scaleY:0.06,alpha:0.274},0).wait(1).to({scaleX:0.06,scaleY:0.06,alpha:0.262},0).wait(1).to({scaleX:0.06,scaleY:0.06,y:-27.7,alpha:0.25},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.238},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.226},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.214},0).wait(1).to({scaleX:0.05,scaleY:0.05,alpha:0.202},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.19},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.179},0).wait(1).to({scaleX:0.04,scaleY:0.04,alpha:0.167},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.155},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.143},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.131},0).wait(1).to({scaleX:0.03,scaleY:0.03,alpha:0.119},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.107},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.095},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.083},0).wait(1).to({scaleX:0.02,scaleY:0.02,alpha:0.071},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.06},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.048},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.036},0).wait(1).to({scaleX:0.01,scaleY:0.01,alpha:0.024},0).wait(1).to({scaleX:0,scaleY:0,alpha:0.012},0).wait(1).to({scaleX:0,scaleY:0,x:-286.4,y:27.7,alpha:0},0).to({_off:true},1).wait(50));

	// Kirari
	this.instance_2 = new lib.LightBurstMC();
	this.instance_2.setTransform(-246.8,-53,0.2,0.2);
	this.instance_2.compositeOperation = "lighter";
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(15).to({_off:false},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:-246.3,y:-53.3,alpha:0.988},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-245.7,y:-53.4,alpha:0.976},0).wait(1).to({scaleX:0.31,scaleY:0.31,x:-245.1,y:-53.5,alpha:0.964},0).wait(1).to({scaleX:0.35,scaleY:0.35,x:-244.5,alpha:0.952},0).wait(1).to({scaleX:0.39,scaleY:0.39,x:-243.9,alpha:0.94},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-243.4,alpha:0.929},0).wait(1).to({scaleX:0.46,scaleY:0.46,x:-242.8,y:-53.4,alpha:0.917},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:-242.2,alpha:0.905},0).wait(1).to({scaleX:0.49,scaleY:0.49,x:-241.6,y:-53.3,alpha:0.893},0).wait(1).to({scaleX:0.49,scaleY:0.49,x:-241,y:-53.2,alpha:0.881},0).wait(1).to({scaleX:0.48,scaleY:0.48,x:-240.4,y:-53.1,alpha:0.869},0).wait(1).to({scaleX:0.47,scaleY:0.47,x:-239.8,y:-53,alpha:0.857},0).wait(1).to({scaleX:0.47,scaleY:0.47,x:-239.3,y:-52.8,alpha:0.845},0).wait(1).to({scaleX:0.46,scaleY:0.46,x:-238.7,y:-52.7,alpha:0.833},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:-238.1,y:-52.5,alpha:0.821},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:-237.6,y:-52.3,alpha:0.81},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:-237,y:-52.1,alpha:0.798},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-236.5,y:-51.9,alpha:0.786},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-235.9,y:-51.7,alpha:0.774},0).wait(1).to({scaleX:0.42,scaleY:0.42,x:-235.3,y:-51.5,alpha:0.762},0).wait(1).to({scaleX:0.41,scaleY:0.41,x:-234.8,y:-51.2,alpha:0.75},0).wait(1).to({scaleX:0.41,scaleY:0.41,x:-234.3,y:-51,alpha:0.738},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-233.7,y:-50.7,alpha:0.726},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-233.2,y:-50.5,alpha:0.714},0).wait(1).to({scaleX:0.39,scaleY:0.39,x:-232.7,y:-50.2,alpha:0.702},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:-232.2,y:-49.9,alpha:0.69},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:-231.6,y:-49.6,alpha:0.679},0).wait(1).to({scaleX:0.37,scaleY:0.37,x:-231.1,y:-49.3,alpha:0.667},0).wait(1).to({scaleX:0.36,scaleY:0.36,x:-230.6,y:-49,alpha:0.655},0).wait(1).to({scaleX:0.36,scaleY:0.36,x:-230.1,y:-48.7,alpha:0.643},0).wait(1).to({scaleX:0.35,scaleY:0.35,x:-229.6,y:-48.4,alpha:0.631},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:-229.2,y:-48,alpha:0.619},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:-228.7,y:-47.7,alpha:0.607},0).wait(1).to({scaleX:0.33,scaleY:0.33,x:-228.2,y:-47.3,alpha:0.595},0).wait(1).to({scaleX:0.32,scaleY:0.32,x:-227.7,y:-47,alpha:0.583},0).wait(1).to({scaleX:0.32,scaleY:0.32,x:-227.3,y:-46.6,alpha:0.571},0).wait(1).to({scaleX:0.31,scaleY:0.31,x:-226.8,y:-46.2,alpha:0.56},0).wait(1).to({scaleX:0.3,scaleY:0.3,x:-226.4,y:-45.8,alpha:0.548},0).wait(1).to({scaleX:0.3,scaleY:0.3,x:-226,y:-45.4,alpha:0.536},0).wait(1).to({scaleX:0.29,scaleY:0.29,x:-225.6,y:-44.9,alpha:0.524},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-225.2,y:-44.5,alpha:0.512},0).wait(1).to({scaleX:0.28,scaleY:0.28,x:-224.8,y:-44,alpha:0.5},0).wait(1).to({scaleX:0.27,scaleY:0.27,x:-224.5,y:-43.6,alpha:0.488},0).wait(1).to({scaleX:0.26,scaleY:0.26,x:-224.1,y:-43.1,alpha:0.476},0).wait(1).to({scaleX:0.26,scaleY:0.26,x:-223.8,y:-42.6,alpha:0.464},0).wait(1).to({scaleX:0.25,scaleY:0.25,x:-223.5,y:-42.1,alpha:0.452},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:-223.2,y:-41.6,alpha:0.44},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:-222.9,y:-41,alpha:0.429},0).wait(1).to({scaleX:0.23,scaleY:0.23,x:-222.6,y:-40.5,alpha:0.417},0).wait(1).to({scaleX:0.22,scaleY:0.22,x:-222.4,y:-40,alpha:0.405},0).wait(1).to({scaleX:0.22,scaleY:0.22,x:-222.1,y:-39.4,alpha:0.393},0).wait(1).to({scaleX:0.21,scaleY:0.21,x:-221.9,y:-38.9,alpha:0.381},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:-221.7,y:-38.3,alpha:0.369},0).wait(1).to({scaleX:0.2,scaleY:0.2,x:-221.5,y:-37.8,alpha:0.357},0).wait(1).to({scaleX:0.19,scaleY:0.19,x:-221.3,y:-37.2,alpha:0.345},0).wait(1).to({scaleX:0.18,scaleY:0.18,x:-221.1,y:-36.7,alpha:0.333},0).wait(1).to({scaleX:0.18,scaleY:0.18,x:-221,y:-36.1,alpha:0.321},0).wait(1).to({scaleX:0.17,scaleY:0.17,x:-220.8,y:-35.5,alpha:0.31},0).wait(1).to({scaleX:0.16,scaleY:0.16,x:-220.7,y:-34.9,alpha:0.298},0).wait(1).to({scaleX:0.16,scaleY:0.16,x:-220.5,y:-34.4,alpha:0.286},0).wait(1).to({scaleX:0.15,scaleY:0.15,x:-220.4,y:-33.8,alpha:0.274},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:-220.3,y:-33.2,alpha:0.262},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:-220.2,y:-32.6,alpha:0.25},0).wait(1).to({scaleX:0.13,scaleY:0.13,x:-220.1,y:-32,alpha:0.238},0).wait(1).to({scaleX:0.13,scaleY:0.13,y:-31.4,alpha:0.226},0).wait(1).to({scaleX:0.12,scaleY:0.12,x:-220,y:-30.9,alpha:0.214},0).wait(1).to({scaleX:0.11,scaleY:0.11,y:-30.3,alpha:0.202},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:-219.9,y:-29.7,alpha:0.19},0).wait(1).to({scaleX:0.1,scaleY:0.1,y:-29.1,alpha:0.179},0).wait(1).to({scaleX:0.09,scaleY:0.09,y:-28.5,alpha:0.167},0).wait(1).to({scaleX:0.09,scaleY:0.09,x:-219.8,y:-27.9,alpha:0.155},0).wait(1).to({scaleX:0.08,scaleY:0.08,y:-27.3,alpha:0.143},0).wait(1).to({scaleX:0.07,scaleY:0.07,x:-219.9,y:-26.7,alpha:0.131},0).wait(1).to({scaleX:0.07,scaleY:0.07,y:-26.1,alpha:0.119},0).wait(1).to({scaleX:0.06,scaleY:0.06,y:-25.5,alpha:0.107},0).wait(1).to({scaleX:0.05,scaleY:0.05,y:-24.9,alpha:0.095},0).wait(1).to({scaleX:0.05,scaleY:0.05,x:-220,y:-24.3,alpha:0.083},0).wait(1).to({scaleX:0.04,scaleY:0.04,x:-220.1,y:-23.8,alpha:0.071},0).wait(1).to({scaleX:0.03,scaleY:0.03,x:-220.2,y:-23.2,alpha:0.06},0).wait(1).to({scaleX:0.03,scaleY:0.03,x:-220.3,y:-22.6,alpha:0.048},0).wait(1).to({scaleX:0.02,scaleY:0.02,x:-220.4,y:-22,alpha:0.036},0).wait(1).to({scaleX:0.01,scaleY:0.01,x:-220.5,y:-21.4,alpha:0.024},0).wait(1).to({scaleX:0.01,scaleY:0.01,x:-220.7,y:-20.9,alpha:0.012},0).wait(1).to({scaleX:0,scaleY:0,x:220.9,y:20.3,alpha:0},0).to({_off:true},1).wait(50));

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EAmpAIsQgygMgogZQgpgZgbgnQgbgngDg3ICvAAQANAyAlASQAkAVAvgBQAmAAAbgMQAcgKARgXQARgVAIgdQAIgdAAgiIAAhWIgCAAQgOAagVATQgVATgaAMQg1AYg8AAQhHAAg1gZQg1gagigrQgigugQg7QgPg7AAhBQAAg+ATg6QASg7AigtQAjgrA0gaQA0gbBDAAQBAgBAxAYQAwAZAhA3IACAAIAAhVICpAAIAAJbQAAAngLAyQgKAygjAqQgjAshDAeQhCAehvAAQgwAAgxgMgEAnYgC+QgbAQgSAaQgSAagIAgQgIAhAAAlIAHBEQAHAiARAbQAQAcAdARQAbARApAAQAmAAAcgOQAdgPATgZQASgaAKggQAJgfAAghQAAgogHglQgIgigSgcQgRgcgdgRQgcgPgsAAQgmAAgbAOgAhfIsQgxgMgpgZQgogZgbgnQgbgngEg3ICwAAQANAyAkASQAlAVAtgBQAmAAAbgMQAcgKASgXQAQgVAIgdQAIgdAAgiIAAhWIgDAAQgOAagVATQgUATgbAMQg1AYg4AAQhJAAg0gZQg1gagigrQgigugQg7QgPg7AAhBQAAg+ASg6QASg7AjgtQAjgrA0gaQA0gbBDAAQA/gBAvAYQAxAZAgA3IADAAIAAhVICoAAIAAJbQAAAngKAyQgKAygkAqQgiAshDAeQhCAehwAAQgtAAgygMgAgui+QgcAQgSAaQgSAagIAgQgIAhAAAlIAHBEQAGAiARAbQARAcAcARQAcARAnAAQAmAAAcgOQAdgPASgZQATgaAKggQAJgfAAghQgBgogGglQgJgigQgcQgSgcgcgRQgdgPgsAAQgkAAgaAOgAxbFJQg2gLgqgaQgqgagbgsQgbgsgChAICoAAQABAdALAVQAMAUAUANQARAOAZAFIAzAHIAogEIAlgOQARgKALgQQAMgPAAgYQAAgog2gUQg1gUhfgUIhMgUQgkgMgegSQgdgTgRgdQgRgdAAgrQAAg/AZgoQAYgoAogYQAogWAygKQAygKA0ABQA2gBAxALQAxAKAmAXQAoAYAZAnQAZAoAGA8IiqAAQgEgzgigSQgjgTgvABIghABIggAIIgYATQgKAMAAATQAAAYARAQQARAOAdAKIDWA3QAlAMAdAUQAbATATAfQARAfAAAtQgBA/gZAsQgZAqgpAcQgqAag1AKQg1ALg3AAQg5AAg1gMgA8qE9Qg+gZgqgtQgqgtgYg/QgWg9AAhMQAAhHAXg/QAYg+AsguQArgtA9gaQA9gbBJAAQBTgBA+AhQAeARAaAUQAYAWATAbQApA1ASBFQARBEgGBKInTAAQACArAMAgQAKAeAVAUQAoAnBLAAQA1AAAngbQAngbAJgeICdAAQgTA7gdApQgdAqgnAZQhOAyhuAAQhMAAg9gYgA7si+QgcAPgRAVQgRAVgHAYIgJArIEiAAQgMhEgggkQgRgRgYgJQgXgIghAAQgrAAgcAOgAezFEIAAlqIgGhHQgGgdgNgWQgMgSgXgLQgVgJghAAQhIAAggArQgRAWgIAjQgJAkAAAxIAAFRIixAAIAAqEICpAAIAABaIADAAQAjg6A1gZQA2gZA5AAQBGgBAvAUQAtAUAbAiQAZAiALAyQALAyAAA7IAAGMgATJFEIAAqEICxAAIAAKEgAOLFEIAAlqIgFhHQgHgdgNgWQgMgSgWgLQgXgJgfAAQhJAAggArQgRAWgIAjQgIAkAAAxIAAFRIixAAIAAqEICoAAIAABaIADAAQAjg6A1gZQA3gZA4AAQBHgBAuAUQAtAUAbAiQAaAiAKAyQAMAyAAA7IAAGMgApZFEIAAqEICyAAIAAKEgEgtYAFEIAAt7IGCAAIBTAHQAoAHAlANQAnAOAfAUQAhAVAaAcQAcAcAWAiQAUAiAQAqQAeBTAABvQAABhgZBQQgMAqgTAlQgTAigZAeQgyA9hMAiQgnARgrAIQguAJgzAAgEgqTACfICwAAQAqAAAogOQAngNAgghQAfgfATg0QATgygBhJQAAhDgMg3QgOg2gegoQgdglgygVQgxgVhJgBIiMAAgATJmmIAAiRICxAAIAACRgApZmmIAAiRICyAAIAACRg");
	mask.setTransform(0,-0.1);

	// GradationOverlay
	this.instance_3 = new lib.GradationOverlayMC();
	this.instance_3.setTransform(-458,-5.9,1,1,0,0,0,151.3,91.4);
	this.instance_3.compositeOperation = "lighter";
	this.instance_3._off = true;

	this.instance_3.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).wait(1).to({regX:256,x:-353.3},0).wait(1).to({x:-353.1},0).wait(1).to({x:-352.8},0).wait(1).to({x:-352.4},0).wait(1).to({x:-351.9},0).wait(1).to({x:-351.3},0).wait(1).to({x:-350.6},0).wait(1).to({x:-349.8},0).wait(1).to({x:-348.9},0).wait(1).to({x:-347.9},0).wait(1).to({x:-346.7},0).wait(1).to({x:-345.5},0).wait(1).to({x:-344.1},0).wait(1).to({x:-342.7},0).wait(1).to({x:-341.1},0).wait(1).to({x:-339.4},0).wait(1).to({x:-337.6},0).wait(1).to({x:-335.7},0).wait(1).to({x:-333.7},0).wait(1).to({x:-331.6},0).wait(1).to({x:-329.3},0).wait(1).to({x:-327},0).wait(1).to({x:-324.6},0).wait(1).to({x:-322},0).wait(1).to({x:-319.4},0).wait(1).to({x:-316.6},0).wait(1).to({x:-313.7},0).wait(1).to({x:-310.7},0).wait(1).to({x:-307.6},0).wait(1).to({x:-304.4},0).wait(1).to({x:-301.1},0).wait(1).to({x:-297.7},0).wait(1).to({x:-294.2},0).wait(1).to({x:-290.5},0).wait(1).to({x:-286.8},0).wait(1).to({x:-282.9},0).wait(1).to({x:-278.9},0).wait(1).to({x:-274.9},0).wait(1).to({x:-270.7},0).wait(1).to({x:-266.4},0).wait(1).to({x:-262},0).wait(1).to({x:-257.5},0).wait(1).to({x:-252.9},0).wait(1).to({x:-248.1},0).wait(1).to({x:-243.3},0).wait(1).to({x:-238.4},0).wait(1).to({x:-233.3},0).wait(1).to({x:-228.1},0).wait(1).to({x:-222.9},0).wait(1).to({x:-217.5},0).wait(1).to({x:-212.1},0).wait(1).to({x:-206.4},0).wait(1).to({x:-200.7},0).wait(1).to({x:-194.9},0).wait(1).to({x:-189},0).wait(1).to({x:-183},0).wait(1).to({x:-176.8},0).wait(1).to({x:-170.6},0).wait(1).to({x:-164.2},0).wait(1).to({x:-157.7},0).wait(1).to({x:-151.2},0).wait(1).to({x:-144.5},0).wait(1).to({x:-137.7},0).wait(1).to({x:-130.8},0).wait(1).to({x:-123.8},0).wait(1).to({x:-116.7},0).wait(1).to({x:-109.5},0).wait(1).to({x:-102.1},0).wait(1).to({x:-94.7},0).wait(1).to({x:-87.1},0).wait(1).to({x:-79.5},0).wait(1).to({x:-71.7},0).wait(1).to({x:-63.8},0).wait(1).to({x:-55.8},0).wait(1).to({x:-47.8},0).wait(1).to({x:-39.6},0).wait(1).to({x:-31.2},0).wait(1).to({x:-22.8},0).wait(1).to({x:-14.3},0).wait(1).to({x:-5.7},0).wait(1).to({x:3.1},0).wait(1).to({x:11.9},0).wait(1).to({x:21},0).wait(1).to({x:30},0).wait(1).to({x:39.2},0).wait(1).to({x:48.4},0).wait(1).to({x:57.8},0).wait(1).to({x:67.4},0).wait(1).to({x:77},0).wait(1).to({x:86.7},0).wait(1).to({x:96.5},0).wait(1).to({x:106.5},0).wait(1).to({x:116.5},0).wait(1).to({x:126.7},0).wait(1).to({x:136.9},0).wait(1).to({x:147.3},0).wait(1).to({x:157.8},0).wait(1).to({x:168.4},0).wait(1).to({x:179.1},0).wait(1).to({x:189.9},0).wait(1).to({x:200.8},0).wait(1).to({x:211.8},0).wait(1).to({x:223},0).wait(1).to({x:234.2},0).wait(1).to({x:245.6},0).wait(1).to({x:257},0).wait(1).to({x:268.6},0).wait(1).to({x:280.2},0).wait(1).to({x:292},0).wait(1).to({x:303.9},0).wait(1).to({x:315.9},0).wait(1).to({x:328},0).wait(1).to({x:340.3},0).wait(1).to({x:352.6},0).wait(1).to({x:365},0).wait(1).to({x:377.6},0).wait(1).to({x:390.2},0).wait(1).to({x:403},0).wait(1).to({x:415.9},0).wait(1).to({x:428.9},0).wait(1).to({x:441.9},0).wait(1).to({x:455.1},0).wait(1).to({x:468.4},0).wait(1).to({x:481.9},0).wait(1).to({x:495.4},0).wait(1).to({x:509},0).wait(1).to({x:522.8},0).wait(1).to({x:536.6},0).wait(1).to({x:550.5},0).wait(1).to({x:564.6},0).wait(1));

	// LogoBMP
	this.instance_4 = new lib.LogoBMP();
	this.instance_4.setTransform(-290.5,-57);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(150));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-290.5,-57,581,114);


// stage content:
(lib.textmotion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Flare
	this.instance = new lib.FlareMC();
	this.instance.setTransform(941.4,532.7,2,1.961);
	this.instance.alpha = 0.25;
	this.instance.compositeOperation = "lighter";
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(27).to({_off:false},0).wait(1).to({x:941.3,y:531.7,alpha:0.253},0).wait(1).to({y:530.7,alpha:0.255},0).wait(1).to({y:529.6,alpha:0.258},0).wait(1).to({y:528.6,alpha:0.26},0).wait(1).to({y:527.5,alpha:0.263},0).wait(1).to({y:526.5,alpha:0.265},0).wait(1).to({y:525.4,alpha:0.268},0).wait(1).to({y:524.4,alpha:0.27},0).wait(1).to({y:523.3,alpha:0.273},0).wait(1).to({y:522.2,alpha:0.276},0).wait(1).to({y:521.1,alpha:0.278},0).wait(1).to({y:520,alpha:0.281},0).wait(1).to({y:518.8,alpha:0.283},0).wait(1).to({y:517.7,alpha:0.286},0).wait(1).to({y:516.5,alpha:0.288},0).wait(1).to({y:515.3,alpha:0.291},0).wait(1).to({y:514.1,alpha:0.293},0).wait(1).to({y:512.8,alpha:0.296},0).wait(1).to({y:511.6,alpha:0.298},0).wait(1).to({y:510.3,alpha:0.301},0).wait(1).to({y:508.9,alpha:0.304},0).wait(1).to({y:507.6,alpha:0.306},0).wait(1).to({y:506.2,alpha:0.309},0).wait(1).to({y:504.8,alpha:0.311},0).wait(1).to({y:503.3,alpha:0.314},0).wait(1).to({y:501.8,alpha:0.316},0).wait(1).to({y:500.3,alpha:0.319},0).wait(1).to({y:498.7,alpha:0.321},0).wait(1).to({y:497.1,alpha:0.324},0).wait(1).to({y:495.5,alpha:0.327},0).wait(1).to({y:493.8,alpha:0.329},0).wait(1).to({y:492,alpha:0.332},0).wait(1).to({y:490.3,alpha:0.334},0).wait(1).to({y:488.4,alpha:0.337},0).wait(1).to({y:486.6,alpha:0.339},0).wait(1).to({y:484.6,alpha:0.342},0).wait(1).to({y:482.6,alpha:0.344},0).wait(1).to({y:480.6,alpha:0.347},0).wait(1).to({y:478.5,alpha:0.349},0).wait(1).to({y:476.4,alpha:0.352},0).wait(1).to({y:474.2,alpha:0.355},0).wait(1).to({y:471.9,alpha:0.357},0).wait(1).to({y:469.6,alpha:0.36},0).wait(1).to({y:467.2,alpha:0.362},0).wait(1).to({y:464.8,alpha:0.365},0).wait(1).to({y:462.3,alpha:0.367},0).wait(1).to({y:459.7,alpha:0.37},0).wait(1).to({y:457,alpha:0.372},0).wait(1).to({y:454.3,alpha:0.375},0).wait(1).to({y:451.5,alpha:0.378},0).wait(1).to({y:448.7,alpha:0.38},0).wait(1).to({y:445.8,alpha:0.383},0).wait(1).to({y:442.7,alpha:0.385},0).wait(1).to({y:439.7,alpha:0.388},0).wait(1).to({y:436.5,alpha:0.39},0).wait(1).to({y:433.3,alpha:0.393},0).wait(1).to({y:430,alpha:0.395},0).wait(1).to({y:426.6,alpha:0.398},0).wait(1).to({y:423.1,alpha:0.401},0).wait(1).to({y:419.5,alpha:0.403},0).wait(1).to({y:415.9,alpha:0.406},0).wait(1).to({y:412.1,alpha:0.408},0).wait(1).to({y:408.3,alpha:0.411},0).wait(1).to({y:404.4,alpha:0.413},0).wait(1).to({y:400.4,alpha:0.416},0).wait(1).to({y:396.3,alpha:0.418},0).wait(1).to({y:392.3,alpha:0.421},0).wait(1).to({y:388.4,alpha:0.423},0).wait(1).to({y:384.5,alpha:0.426},0).wait(1).to({y:380.8,alpha:0.429},0).wait(1).to({y:377.2,alpha:0.431},0).wait(1).to({y:373.6,alpha:0.434},0).wait(1).to({y:370.1,alpha:0.436},0).wait(1).to({y:366.7,alpha:0.439},0).wait(1).to({y:363.4,alpha:0.441},0).wait(1).to({y:360.2,alpha:0.444},0).wait(1).to({y:357,alpha:0.446},0).wait(1).to({y:353.9,alpha:0.449},0).wait(1).to({y:350.9,alpha:0.452},0).wait(1).to({y:348,alpha:0.454},0).wait(1).to({y:345.1,alpha:0.457},0).wait(1).to({y:342.4,alpha:0.459},0).wait(1).to({y:339.6,alpha:0.462},0).wait(1).to({y:337,alpha:0.464},0).wait(1).to({y:334.4,alpha:0.467},0).wait(1).to({y:331.9,alpha:0.469},0).wait(1).to({y:329.5,alpha:0.472},0).wait(1).to({y:327.1,alpha:0.474},0).wait(1).to({y:324.8,alpha:0.477},0).wait(1).to({y:322.5,alpha:0.48},0).wait(1).to({y:320.3,alpha:0.482},0).wait(1).to({y:318.2,alpha:0.485},0).wait(1).to({y:316.1,alpha:0.487},0).wait(1).to({y:314,alpha:0.49},0).wait(1).to({y:312.1,alpha:0.492},0).wait(1).to({y:310.1,alpha:0.495},0).wait(1).to({y:308.2,alpha:0.497},0).wait(1).to({y:306.4,alpha:0.5},0).wait(1).to({y:304.6,alpha:0.485},0).wait(1).to({y:302.9,alpha:0.47},0).wait(1).to({y:301.2,alpha:0.455},0).wait(1).to({y:299.5,alpha:0.439},0).wait(1).to({y:297.9,alpha:0.424},0).wait(1).to({y:296.4,alpha:0.409},0).wait(1).to({y:294.8,alpha:0.394},0).wait(1).to({y:293.3,alpha:0.379},0).wait(1).to({y:291.9,alpha:0.364},0).wait(1).to({y:290.5,alpha:0.348},0).wait(1).to({y:289.1,alpha:0.333},0).wait(1).to({y:287.7,alpha:0.318},0).wait(1).to({y:286.4,alpha:0.303},0).wait(1).to({y:285.1,alpha:0.288},0).wait(1).to({y:283.8,alpha:0.273},0).wait(1).to({y:282.6,alpha:0.258},0).wait(1).to({y:281.4,alpha:0.242},0).wait(1).to({y:280.2,alpha:0.227},0).wait(1).to({y:279,alpha:0.212},0).wait(1).to({y:277.8,alpha:0.197},0).wait(1).to({y:276.7,alpha:0.182},0).wait(1).to({y:275.6,alpha:0.167},0).wait(1).to({y:274.5,alpha:0.152},0).wait(1).to({y:273.4,alpha:0.136},0).wait(1).to({y:272.3,alpha:0.121},0).wait(1).to({y:271.2,alpha:0.106},0).wait(1).to({y:270.2,alpha:0.091},0).wait(1).to({y:269.1,alpha:0.076},0).wait(1).to({y:268.1,alpha:0.061},0).wait(1).to({y:267.1,alpha:0.045},0).wait(1).to({y:266,alpha:0.03},0).wait(1).to({y:265,alpha:0.015},0).wait(1).to({y:264,alpha:0},0).to({_off:true},1).wait(81));

	// Flare
	this.instance_1 = new lib.FlareMC();
	this.instance_1.setTransform(687,439,0.51,0.5);
	this.instance_1.alpha = 0.25;
	this.instance_1.compositeOperation = "lighter";
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(27).to({_off:false},0).wait(1).to({x:686.9,y:438.6,alpha:0.258},0).wait(1).to({y:438.3,alpha:0.265},0).wait(1).to({y:437.9,alpha:0.273},0).wait(1).to({y:437.6,alpha:0.281},0).wait(1).to({y:437.2,alpha:0.288},0).wait(1).to({y:436.9,alpha:0.296},0).wait(1).to({y:436.5,alpha:0.304},0).wait(1).to({y:436.2,alpha:0.311},0).wait(1).to({y:435.8,alpha:0.319},0).wait(1).to({y:435.4,alpha:0.327},0).wait(1).to({y:435.1,alpha:0.334},0).wait(1).to({y:434.7,alpha:0.342},0).wait(1).to({y:434.3,alpha:0.349},0).wait(1).to({y:433.9,alpha:0.357},0).wait(1).to({y:433.5,alpha:0.365},0).wait(1).to({y:433.1,alpha:0.372},0).wait(1).to({y:432.7,alpha:0.38},0).wait(1).to({y:432.3,alpha:0.388},0).wait(1).to({y:431.9,alpha:0.395},0).wait(1).to({y:431.4,alpha:0.403},0).wait(1).to({y:431,alpha:0.411},0).wait(1).to({y:430.5,alpha:0.418},0).wait(1).to({y:430.1,alpha:0.426},0).wait(1).to({y:429.6,alpha:0.434},0).wait(1).to({y:429.1,alpha:0.441},0).wait(1).to({y:428.6,alpha:0.449},0).wait(1).to({y:428.1,alpha:0.457},0).wait(1).to({x:686.8,y:427.6,alpha:0.464},0).wait(1).to({y:427,alpha:0.472},0).wait(1).to({y:426.5,alpha:0.48},0).wait(1).to({y:425.9,alpha:0.487},0).wait(1).to({y:425.3,alpha:0.495},0).wait(1).to({y:424.7,alpha:0.503},0).wait(1).to({y:424.1,alpha:0.51},0).wait(1).to({y:423.5,alpha:0.518},0).wait(1).to({y:422.8,alpha:0.526},0).wait(1).to({y:422.2,alpha:0.533},0).wait(1).to({y:421.5,alpha:0.541},0).wait(1).to({y:420.8,alpha:0.548},0).wait(1).to({y:420.1,alpha:0.556},0).wait(1).to({y:419.3,alpha:0.564},0).wait(1).to({y:418.6,alpha:0.571},0).wait(1).to({y:417.8,alpha:0.579},0).wait(1).to({y:417,alpha:0.587},0).wait(1).to({x:686.7,y:416.2,alpha:0.594},0).wait(1).to({y:415.3,alpha:0.602},0).wait(1).to({y:414.5,alpha:0.61},0).wait(1).to({y:413.6,alpha:0.617},0).wait(1).to({y:412.7,alpha:0.625},0).wait(1).to({y:411.7,alpha:0.633},0).wait(1).to({y:410.8,alpha:0.64},0).wait(1).to({y:409.8,alpha:0.648},0).wait(1).to({y:408.8,alpha:0.656},0).wait(1).to({y:407.8,alpha:0.663},0).wait(1).to({y:406.7,alpha:0.671},0).wait(1).to({x:686.6,y:405.6,alpha:0.679},0).wait(1).to({y:404.5,alpha:0.686},0).wait(1).to({y:403.4,alpha:0.694},0).wait(1).to({y:402.2,alpha:0.702},0).wait(1).to({y:401,alpha:0.709},0).wait(1).to({y:399.8,alpha:0.717},0).wait(1).to({y:398.5,alpha:0.724},0).wait(1).to({y:397.2,alpha:0.732},0).wait(1).to({y:395.9,alpha:0.74},0).wait(1).to({y:394.6,alpha:0.747},0).wait(1).to({x:686.5,y:393.2,alpha:0.755},0).wait(1).to({y:391.9,alpha:0.763},0).wait(1).to({y:390.6,alpha:0.77},0).wait(1).to({y:389.3,alpha:0.778},0).wait(1).to({y:388,alpha:0.786},0).wait(1).to({y:386.8,alpha:0.793},0).wait(1).to({y:385.6,alpha:0.801},0).wait(1).to({y:384.4,alpha:0.809},0).wait(1).to({x:686.4,y:383.3,alpha:0.816},0).wait(1).to({y:382.2,alpha:0.824},0).wait(1).to({y:381.1,alpha:0.832},0).wait(1).to({y:380,alpha:0.839},0).wait(1).to({y:379,alpha:0.847},0).wait(1).to({y:378,alpha:0.855},0).wait(1).to({y:377,alpha:0.862},0).wait(1).to({y:376.1,alpha:0.87},0).wait(1).to({y:375.1,alpha:0.878},0).wait(1).to({y:374.2,alpha:0.885},0).wait(1).to({y:373.3,alpha:0.893},0).wait(1).to({y:372.5,alpha:0.901},0).wait(1).to({x:686.3,y:371.6,alpha:0.908},0).wait(1).to({y:370.8,alpha:0.916},0).wait(1).to({y:370,alpha:0.923},0).wait(1).to({y:369.2,alpha:0.931},0).wait(1).to({y:368.5,alpha:0.939},0).wait(1).to({y:367.7,alpha:0.946},0).wait(1).to({y:367,alpha:0.954},0).wait(1).to({y:366.3,alpha:0.962},0).wait(1).to({y:365.6,alpha:0.969},0).wait(1).to({y:365,alpha:0.977},0).wait(1).to({y:364.3,alpha:0.985},0).wait(1).to({y:363.7,alpha:0.992},0).wait(1).to({y:363.1,alpha:1},0).wait(1).to({y:362.5,alpha:0.97},0).wait(1).to({y:361.9,alpha:0.939},0).wait(1).to({y:361.3,alpha:0.909},0).wait(1).to({x:686.2,y:360.8,alpha:0.879},0).wait(1).to({y:360.2,alpha:0.848},0).wait(1).to({y:359.7,alpha:0.818},0).wait(1).to({y:359.2,alpha:0.788},0).wait(1).to({y:358.7,alpha:0.758},0).wait(1).to({y:358.2,alpha:0.727},0).wait(1).to({y:357.7,alpha:0.697},0).wait(1).to({y:357.3,alpha:0.667},0).wait(1).to({y:356.8,alpha:0.636},0).wait(1).to({y:356.4,alpha:0.606},0).wait(1).to({y:355.9,alpha:0.576},0).wait(1).to({y:355.5,alpha:0.545},0).wait(1).to({y:355.1,alpha:0.515},0).wait(1).to({y:354.7,alpha:0.485},0).wait(1).to({y:354.3,alpha:0.455},0).wait(1).to({y:353.9,alpha:0.424},0).wait(1).to({y:353.5,alpha:0.394},0).wait(1).to({y:353.1,alpha:0.364},0).wait(1).to({y:352.7,alpha:0.333},0).wait(1).to({y:352.4,alpha:0.303},0).wait(1).to({y:352,alpha:0.273},0).wait(1).to({y:351.6,alpha:0.242},0).wait(1).to({y:351.3,alpha:0.212},0).wait(1).to({y:350.9,alpha:0.182},0).wait(1).to({y:350.6,alpha:0.152},0).wait(1).to({y:350.2,alpha:0.121},0).wait(1).to({x:686.1,y:349.9,alpha:0.091},0).wait(1).to({y:349.5,alpha:0.061},0).wait(1).to({y:349.2,alpha:0.03},0).wait(1).to({y:348.8,alpha:0},0).to({_off:true},1).wait(81));

	// Flare
	this.instance_2 = new lib.FlareMC();
	this.instance_2.setTransform(762,453);
	this.instance_2.alpha = 0.25;
	this.instance_2.compositeOperation = "lighter";
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).wait(1).to({x:761.9,y:452.5,alpha:0.255},0).wait(1).to({y:452,alpha:0.26},0).wait(1).to({y:451.6,alpha:0.265},0).wait(1).to({y:451.1,alpha:0.27},0).wait(1).to({y:450.6,alpha:0.276},0).wait(1).to({y:450.2,alpha:0.281},0).wait(1).to({y:449.7,alpha:0.286},0).wait(1).to({y:449.2,alpha:0.291},0).wait(1).to({y:448.7,alpha:0.296},0).wait(1).to({y:448.2,alpha:0.301},0).wait(1).to({y:447.7,alpha:0.306},0).wait(1).to({y:447.2,alpha:0.311},0).wait(1).to({y:446.7,alpha:0.316},0).wait(1).to({y:446.2,alpha:0.321},0).wait(1).to({y:445.7,alpha:0.327},0).wait(1).to({y:445.1,alpha:0.332},0).wait(1).to({y:444.6,alpha:0.337},0).wait(1).to({y:444,alpha:0.342},0).wait(1).to({y:443.4,alpha:0.347},0).wait(1).to({y:442.9,alpha:0.352},0).wait(1).to({y:442.3,alpha:0.357},0).wait(1).to({y:441.6,alpha:0.362},0).wait(1).to({y:441,alpha:0.367},0).wait(1).to({y:440.4,alpha:0.372},0).wait(1).to({y:439.7,alpha:0.378},0).wait(1).to({y:439.1,alpha:0.383},0).wait(1).to({y:438.4,alpha:0.388},0).wait(1).to({y:437.7,alpha:0.393},0).wait(1).to({y:436.9,alpha:0.398},0).wait(1).to({y:436.2,alpha:0.403},0).wait(1).to({y:435.4,alpha:0.408},0).wait(1).to({y:434.6,alpha:0.413},0).wait(1).to({y:433.8,alpha:0.418},0).wait(1).to({y:433,alpha:0.423},0).wait(1).to({y:432.2,alpha:0.429},0).wait(1).to({y:431.3,alpha:0.434},0).wait(1).to({y:430.4,alpha:0.439},0).wait(1).to({y:429.5,alpha:0.444},0).wait(1).to({x:761.8,y:428.6,alpha:0.449},0).wait(1).to({y:427.6,alpha:0.454},0).wait(1).to({y:426.6,alpha:0.459},0).wait(1).to({y:425.6,alpha:0.464},0).wait(1).to({y:424.5,alpha:0.469},0).wait(1).to({y:423.5,alpha:0.474},0).wait(1).to({y:422.4,alpha:0.48},0).wait(1).to({y:421.2,alpha:0.485},0).wait(1).to({y:420.1,alpha:0.49},0).wait(1).to({y:418.9,alpha:0.495},0).wait(1).to({y:417.7,alpha:0.5},0).wait(1).to({y:416.4,alpha:0.505},0).wait(1).to({y:415.1,alpha:0.51},0).wait(1).to({y:413.8,alpha:0.515},0).wait(1).to({y:412.4,alpha:0.52},0).wait(1).to({y:411.1,alpha:0.526},0).wait(1).to({y:409.6,alpha:0.531},0).wait(1).to({y:408.2,alpha:0.536},0).wait(1).to({y:406.7,alpha:0.541},0).wait(1).to({y:405.2,alpha:0.546},0).wait(1).to({x:761.7,y:403.6,alpha:0.551},0).wait(1).to({y:402,alpha:0.556},0).wait(1).to({y:400.3,alpha:0.561},0).wait(1).to({y:398.7,alpha:0.566},0).wait(1).to({y:396.9,alpha:0.571},0).wait(1).to({y:395.2,alpha:0.577},0).wait(1).to({y:393.4,alpha:0.582},0).wait(1).to({y:391.5,alpha:0.587},0).wait(1).to({y:389.7,alpha:0.592},0).wait(1).to({y:388,alpha:0.597},0).wait(1).to({y:386.2,alpha:0.602},0).wait(1).to({y:384.6,alpha:0.607},0).wait(1).to({y:382.9,alpha:0.612},0).wait(1).to({y:381.3,alpha:0.617},0).wait(1).to({x:761.6,y:379.7,alpha:0.622},0).wait(1).to({y:378.2,alpha:0.628},0).wait(1).to({y:376.7,alpha:0.633},0).wait(1).to({y:375.3,alpha:0.638},0).wait(1).to({y:373.8,alpha:0.643},0).wait(1).to({y:372.5,alpha:0.648},0).wait(1).to({y:371.1,alpha:0.653},0).wait(1).to({y:369.8,alpha:0.658},0).wait(1).to({y:368.5,alpha:0.663},0).wait(1).to({y:367.2,alpha:0.668},0).wait(1).to({y:366,alpha:0.673},0).wait(1).to({y:364.8,alpha:0.679},0).wait(1).to({y:363.7,alpha:0.684},0).wait(1).to({y:362.5,alpha:0.689},0).wait(1).to({y:361.4,alpha:0.694},0).wait(1).to({y:360.4,alpha:0.699},0).wait(1).to({y:359.3,alpha:0.704},0).wait(1).to({y:358.3,alpha:0.709},0).wait(1).to({y:357.3,alpha:0.714},0).wait(1).to({y:356.3,alpha:0.719},0).wait(1).to({x:761.5,y:355.4,alpha:0.724},0).wait(1).to({y:354.5,alpha:0.73},0).wait(1).to({y:353.6,alpha:0.735},0).wait(1).to({y:352.7,alpha:0.74},0).wait(1).to({y:351.9,alpha:0.745},0).wait(1).to({y:351.1,alpha:0.75},0).wait(1).to({y:350.3,alpha:0.727},0).wait(1).to({y:349.5,alpha:0.705},0).wait(1).to({y:348.7,alpha:0.682},0).wait(1).to({y:348,alpha:0.659},0).wait(1).to({y:347.2,alpha:0.636},0).wait(1).to({y:346.5,alpha:0.614},0).wait(1).to({y:345.8,alpha:0.591},0).wait(1).to({y:345.2,alpha:0.568},0).wait(1).to({y:344.5,alpha:0.545},0).wait(1).to({y:343.9,alpha:0.523},0).wait(1).to({y:343.3,alpha:0.5},0).wait(1).to({y:342.6,alpha:0.477},0).wait(1).to({y:342,alpha:0.455},0).wait(1).to({y:341.5,alpha:0.432},0).wait(1).to({y:340.9,alpha:0.409},0).wait(1).to({y:340.3,alpha:0.386},0).wait(1).to({y:339.8,alpha:0.364},0).wait(1).to({y:339.2,alpha:0.341},0).wait(1).to({y:338.7,alpha:0.318},0).wait(1).to({y:338.2,alpha:0.295},0).wait(1).to({y:337.7,alpha:0.273},0).wait(1).to({y:337.2,alpha:0.25},0).wait(1).to({y:336.7,alpha:0.227},0).wait(1).to({y:336.2,alpha:0.205},0).wait(1).to({y:335.7,alpha:0.182},0).wait(1).to({y:335.2,alpha:0.159},0).wait(1).to({y:334.7,alpha:0.136},0).wait(1).to({y:334.3,alpha:0.114},0).wait(1).to({y:333.8,alpha:0.091},0).wait(1).to({y:333.3,alpha:0.068},0).wait(1).to({y:332.9,alpha:0.045},0).wait(1).to({y:332.4,alpha:0.023},0).wait(1).to({y:331.9,alpha:0},0).to({_off:true},1).wait(81));

	// Line
	this.instance_3 = new lib.LineMC();
	this.instance_3.setTransform(282,345,3,3);
	this.instance_3.alpha = 0.328;
	this.instance_3.compositeOperation = "lighter";
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(27).to({_off:false},0).wait(1).to({y:345.2,alpha:0.357},0).wait(1).to({y:345.5,alpha:0.381},0).wait(1).to({y:345.7,alpha:0.405},0).wait(1).to({y:345.9,alpha:0.429},0).wait(1).to({y:346.2,alpha:0.452},0).wait(1).to({y:346.4,alpha:0.476},0).wait(1).to({y:346.6,alpha:0.5},0).wait(1).to({y:346.9,alpha:0.524},0).wait(1).to({y:347.1,alpha:0.548},0).wait(1).to({y:347.3,alpha:0.571},0).wait(1).to({y:347.6,alpha:0.595},0).wait(1).to({y:347.8,alpha:0.619},0).wait(1).to({y:348.1,alpha:0.643},0).wait(1).to({y:348.4,alpha:0.667},0).wait(1).to({y:348.6,alpha:0.69},0).wait(1).to({y:348.9,alpha:0.714},0).wait(1).to({y:349.2,alpha:0.738},0).wait(1).to({y:349.4,alpha:0.762},0).wait(1).to({y:349.7,alpha:0.786},0).wait(1).to({y:350,alpha:0.81},0).wait(1).to({y:350.3,alpha:0.833},0).wait(1).to({y:350.6,alpha:0.857},0).wait(1).to({y:350.9,alpha:0.881},0).wait(1).to({y:351.2,alpha:0.905},0).wait(1).to({y:351.6,alpha:0.929},0).wait(1).to({y:351.9,alpha:0.952},0).wait(1).to({y:352.2,alpha:0.976},0).wait(1).to({y:352.6,alpha:1},0).wait(1).to({y:352.9,alpha:0.99},0).wait(1).to({y:353.3,alpha:0.981},0).wait(1).to({y:353.7,alpha:0.971},0).wait(1).to({y:354.1,alpha:0.961},0).wait(1).to({y:354.5,alpha:0.951},0).wait(1).to({y:354.9,alpha:0.942},0).wait(1).to({y:355.3,alpha:0.932},0).wait(1).to({y:355.7,alpha:0.922},0).wait(1).to({y:356.2,alpha:0.913},0).wait(1).to({y:356.6,alpha:0.903},0).wait(1).to({y:357.1,alpha:0.893},0).wait(1).to({y:357.6,alpha:0.883},0).wait(1).to({y:358.1,alpha:0.874},0).wait(1).to({y:358.6,alpha:0.864},0).wait(1).to({y:359.1,alpha:0.854},0).wait(1).to({y:359.6,alpha:0.845},0).wait(1).to({y:360.2,alpha:0.835},0).wait(1).to({y:360.7,alpha:0.825},0).wait(1).to({y:361.3,alpha:0.816},0).wait(1).to({y:361.9,alpha:0.806},0).wait(1).to({y:362.5,alpha:0.796},0).wait(1).to({y:363.1,alpha:0.786},0).wait(1).to({y:363.8,alpha:0.777},0).wait(1).to({y:364.4,alpha:0.767},0).wait(1).to({y:365.1,alpha:0.757},0).wait(1).to({y:365.8,alpha:0.748},0).wait(1).to({y:366.5,alpha:0.738},0).wait(1).to({y:367.2,alpha:0.728},0).wait(1).to({y:367.9,alpha:0.718},0).wait(1).to({y:368.7,alpha:0.709},0).wait(1).to({y:369.5,alpha:0.699},0).wait(1).to({y:370.3,alpha:0.689},0).wait(1).to({y:371.1,alpha:0.68},0).wait(1).to({y:371.9,alpha:0.67},0).wait(1).to({y:372.8,alpha:0.66},0).wait(1).to({y:373.6,alpha:0.65},0).wait(1).to({y:374.5,alpha:0.641},0).wait(1).to({y:375.5,alpha:0.631},0).wait(1).to({y:376.3,alpha:0.621},0).wait(1).to({y:377.2,alpha:0.612},0).wait(1).to({y:378.1,alpha:0.602},0).wait(1).to({y:378.9,alpha:0.592},0).wait(1).to({y:379.7,alpha:0.583},0).wait(1).to({y:380.5,alpha:0.573},0).wait(1).to({y:381.3,alpha:0.563},0).wait(1).to({y:382.1,alpha:0.553},0).wait(1).to({y:382.8,alpha:0.544},0).wait(1).to({y:383.5,alpha:0.534},0).wait(1).to({y:384.2,alpha:0.524},0).wait(1).to({y:384.9,alpha:0.515},0).wait(1).to({y:385.6,alpha:0.505},0).wait(1).to({y:386.2,alpha:0.495},0).wait(1).to({y:386.9,alpha:0.485},0).wait(1).to({y:387.5,alpha:0.476},0).wait(1).to({y:388.1,alpha:0.466},0).wait(1).to({y:388.7,alpha:0.456},0).wait(1).to({y:389.3,alpha:0.447},0).wait(1).to({y:389.8,alpha:0.437},0).wait(1).to({y:390.4,alpha:0.427},0).wait(1).to({y:390.9,alpha:0.417},0).wait(1).to({y:391.4,alpha:0.408},0).wait(1).to({y:391.9,alpha:0.398},0).wait(1).to({y:392.4,alpha:0.388},0).wait(1).to({y:392.9,alpha:0.379},0).wait(1).to({y:393.4,alpha:0.369},0).wait(1).to({y:393.8,alpha:0.359},0).wait(1).to({y:394.3,alpha:0.35},0).wait(1).to({y:394.7,alpha:0.34},0).wait(1).to({y:395.1,alpha:0.33},0).wait(1).to({y:395.5,alpha:0.32},0).wait(1).to({y:395.9,alpha:0.311},0).wait(1).to({y:396.3,alpha:0.301},0).wait(1).to({y:396.7,alpha:0.291},0).wait(1).to({y:397.1,alpha:0.282},0).wait(1).to({y:397.4,alpha:0.272},0).wait(1).to({y:397.8,alpha:0.262},0).wait(1).to({y:398.1,alpha:0.252},0).wait(1).to({y:398.4,alpha:0.243},0).wait(1).to({y:398.8,alpha:0.233},0).wait(1).to({y:399.1,alpha:0.223},0).wait(1).to({y:399.4,alpha:0.214},0).wait(1).to({y:399.7,alpha:0.204},0).wait(1).to({y:400,alpha:0.194},0).wait(1).to({y:400.3,alpha:0.184},0).wait(1).to({y:400.6,alpha:0.175},0).wait(1).to({y:400.8,alpha:0.165},0).wait(1).to({y:401.1,alpha:0.155},0).wait(1).to({y:401.4,alpha:0.146},0).wait(1).to({y:401.6,alpha:0.136},0).wait(1).to({y:401.9,alpha:0.126},0).wait(1).to({y:402.2,alpha:0.117},0).wait(1).to({y:402.4,alpha:0.107},0).wait(1).to({y:402.7,alpha:0.097},0).wait(1).to({y:402.9,alpha:0.087},0).wait(1).to({y:403.1,alpha:0.078},0).wait(1).to({y:403.4,alpha:0.068},0).wait(1).to({y:403.6,alpha:0.058},0).wait(1).to({y:403.8,alpha:0.049},0).wait(1).to({y:404.1,alpha:0.039},0).wait(1).to({y:404.3,alpha:0.029},0).wait(1).to({y:404.5,alpha:0.019},0).wait(1).to({y:404.8,alpha:0.01},0).wait(1).to({y:405,alpha:0},0).to({_off:true},1).wait(81));

	// Light
	this.instance_4 = new lib.LightMC();
	this.instance_4.setTransform(277.8,342.9);
	this.instance_4.alpha = 0.328;
	this.instance_4.compositeOperation = "lighter";
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(27).to({_off:false},0).wait(1).to({scaleX:1.38,scaleY:1.38,y:343.1,alpha:0.348},0).wait(1).to({scaleX:1.5,scaleY:1.5,rotation:-0.1,y:343.4,alpha:0.363},0).wait(1).to({scaleX:1.48,scaleY:1.48,y:343.7,alpha:0.378},0).wait(1).to({scaleX:1.46,scaleY:1.46,rotation:-0.2,y:343.9,alpha:0.393},0).wait(1).to({scaleX:1.45,scaleY:1.45,y:344.2,alpha:0.408},0).wait(1).to({scaleX:1.44,scaleY:1.44,y:344.5,alpha:0.423},0).wait(1).to({scaleX:1.43,scaleY:1.43,rotation:-0.3,y:344.7,alpha:0.437},0).wait(1).to({scaleX:1.42,scaleY:1.42,y:345,alpha:0.452},0).wait(1).to({scaleX:1.41,scaleY:1.41,y:345.3,alpha:0.467},0).wait(1).to({scaleX:1.4,scaleY:1.4,rotation:-0.4,y:345.6,alpha:0.482},0).wait(1).to({scaleX:1.39,scaleY:1.39,y:345.9,alpha:0.497},0).wait(1).to({scaleX:1.39,scaleY:1.39,rotation:-0.5,y:346.2,alpha:0.512},0).wait(1).to({scaleX:1.38,scaleY:1.38,y:346.5,alpha:0.527},0).wait(1).to({scaleX:1.37,scaleY:1.37,y:346.8,alpha:0.542},0).wait(1).to({scaleX:1.37,scaleY:1.37,rotation:-0.6,y:347.1,alpha:0.557},0).wait(1).to({scaleX:1.36,scaleY:1.36,y:347.4,alpha:0.571},0).wait(1).to({scaleX:1.35,scaleY:1.35,y:347.7,alpha:0.586},0).wait(1).to({scaleX:1.35,scaleY:1.35,rotation:-0.7,y:348,alpha:0.601},0).wait(1).to({scaleX:1.34,scaleY:1.34,y:348.4,alpha:0.616},0).wait(1).to({scaleX:1.34,scaleY:1.34,rotation:-0.8,y:348.7,alpha:0.631},0).wait(1).to({scaleX:1.33,scaleY:1.33,y:349,alpha:0.646},0).wait(1).to({scaleX:1.33,scaleY:1.33,y:349.4,alpha:0.661},0).wait(1).to({scaleX:1.32,scaleY:1.32,rotation:-0.9,y:349.8,alpha:0.676},0).wait(1).to({scaleX:1.32,scaleY:1.32,x:277.7,y:350.1,alpha:0.69},0).wait(1).to({scaleX:1.32,scaleY:1.32,rotation:-1,y:350.5,alpha:0.705},0).wait(1).to({scaleX:1.31,scaleY:1.31,y:350.9,alpha:0.72},0).wait(1).to({scaleX:1.31,scaleY:1.31,y:351.3,alpha:0.735},0).wait(1).to({scaleX:1.3,scaleY:1.3,rotation:-1.1,y:351.7,alpha:0.75},0).wait(1).to({scaleX:1.3,scaleY:1.3,y:352.1,alpha:0.746},0).wait(1).to({scaleX:1.3,scaleY:1.3,y:352.5,alpha:0.743},0).wait(1).to({scaleX:1.29,scaleY:1.29,rotation:-1.2,y:353,alpha:0.739},0).wait(1).to({scaleX:1.29,scaleY:1.29,y:353.4,alpha:0.736},0).wait(1).to({scaleX:1.29,scaleY:1.29,rotation:-1.3,y:353.9,alpha:0.732},0).wait(1).to({scaleX:1.28,scaleY:1.28,y:354.4,alpha:0.729},0).wait(1).to({scaleX:1.28,scaleY:1.28,y:354.9,alpha:0.725},0).wait(1).to({scaleX:1.28,scaleY:1.28,rotation:-1.4,y:355.4,alpha:0.721},0).wait(1).to({scaleX:1.27,scaleY:1.27,y:355.9,alpha:0.718},0).wait(1).to({scaleX:1.27,scaleY:1.27,rotation:-1.5,y:356.4,alpha:0.714},0).wait(1).to({scaleX:1.27,scaleY:1.27,y:357,alpha:0.711},0).wait(1).to({scaleX:1.26,scaleY:1.26,y:357.5,alpha:0.707},0).wait(1).to({scaleX:1.26,scaleY:1.26,rotation:-1.6,y:358.1,alpha:0.704},0).wait(1).to({scaleX:1.26,scaleY:1.26,y:358.7,alpha:0.7},0).wait(1).to({scaleX:1.26,scaleY:1.26,y:359.3,alpha:0.696},0).wait(1).to({scaleX:1.25,scaleY:1.25,rotation:-1.7,y:359.9,alpha:0.693},0).wait(1).to({scaleX:1.25,scaleY:1.25,y:360.5,alpha:0.689},0).wait(1).to({scaleX:1.25,scaleY:1.25,rotation:-1.8,y:361.2,alpha:0.686},0).wait(1).to({scaleX:1.25,scaleY:1.25,y:361.9,alpha:0.682},0).wait(1).to({scaleX:1.25,scaleY:1.25,y:362.6,alpha:0.679},0).wait(1).to({scaleX:1.24,scaleY:1.24,rotation:-1.9,y:363.3,alpha:0.675},0).wait(1).to({scaleX:1.24,scaleY:1.24,x:277.6,y:364,alpha:0.671},0).wait(1).to({scaleX:1.24,scaleY:1.24,y:364.7,alpha:0.668},0).wait(1).to({scaleX:1.24,scaleY:1.24,rotation:-2,y:365.5,alpha:0.664},0).wait(1).to({scaleX:1.24,scaleY:1.24,y:366.3,alpha:0.661},0).wait(1).to({scaleX:1.23,scaleY:1.23,rotation:-2.1,y:367.1,alpha:0.657},0).wait(1).to({scaleX:1.23,scaleY:1.23,y:367.9,alpha:0.654},0).wait(1).to({scaleX:1.23,scaleY:1.23,y:368.7,alpha:0.65},0).wait(1).to({scaleX:1.23,scaleY:1.23,rotation:-2.2,y:369.6,alpha:0.646},0).wait(1).to({scaleX:1.23,scaleY:1.23,y:370.5,alpha:0.643},0).wait(1).to({scaleX:1.23,scaleY:1.23,rotation:-2.3,y:371.4,alpha:0.639},0).wait(1).to({scaleX:1.22,scaleY:1.22,y:372.3,alpha:0.636},0).wait(1).to({scaleX:1.22,scaleY:1.22,y:373.3,alpha:0.632},0).wait(1).to({scaleX:1.22,scaleY:1.22,rotation:-2.4,y:374.3,alpha:0.629},0).wait(1).to({scaleX:1.22,scaleY:1.22,y:375.3,alpha:0.625},0).wait(1).to({scaleX:1.22,scaleY:1.22,y:376.3,alpha:0.621},0).wait(1).to({scaleX:1.22,scaleY:1.22,rotation:-2.5,y:377.3,alpha:0.618},0).wait(1).to({scaleX:1.22,scaleY:1.22,x:277.5,y:378.4,alpha:0.614},0).wait(1).to({scaleX:1.22,scaleY:1.22,rotation:-2.6,y:379.4,alpha:0.611},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:380.4,alpha:0.607},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:381.4,alpha:0.604},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:-2.7,y:382.4,alpha:0.6},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:383.4,alpha:0.596},0).wait(1).to({y:384.3,alpha:0.593},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:-2.8,y:385.2,alpha:0.589},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:386.1,alpha:0.586},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:-2.9,y:387,alpha:0.582},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:387.8,alpha:0.579},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:388.6,alpha:0.575},0).wait(1).to({rotation:-3,y:389.4,alpha:0.571},0).wait(1).to({scaleX:1.2,scaleY:1.2,y:390.2,alpha:0.568},0).wait(1).to({rotation:-3.1,y:391,alpha:0.564},0).wait(1).to({scaleX:1.2,scaleY:1.2,x:277.4,y:391.7,alpha:0.561},0).wait(1).to({scaleX:1.2,scaleY:1.2,y:392.4,alpha:0.557},0).wait(1).to({rotation:-3.2,y:393.1,alpha:0.554},0).wait(1).to({y:393.8,alpha:0.55},0).wait(1).to({scaleX:1.2,scaleY:1.2,y:394.5,alpha:0.546},0).wait(1).to({rotation:-3.3,y:395.2,alpha:0.543},0).wait(1).to({y:395.8,alpha:0.539},0).wait(1).to({scaleX:1.2,scaleY:1.2,rotation:-3.4,y:396.4,alpha:0.536},0).wait(1).to({y:397,alpha:0.532},0).wait(1).to({y:397.6,alpha:0.529},0).wait(1).to({rotation:-3.5,y:398.2,alpha:0.525},0).wait(1).to({y:398.7,alpha:0.521},0).wait(1).to({y:399.3,alpha:0.518},0).wait(1).to({rotation:-3.6,y:399.8,alpha:0.514},0).wait(1).to({y:400.3,alpha:0.511},0).wait(1).to({scaleX:1.2,scaleY:1.2,rotation:-3.7,y:400.8,alpha:0.507},0).wait(1).to({y:401.3,alpha:0.504},0).wait(1).to({scaleX:1.2,scaleY:1.2,y:401.8,alpha:0.5},0).wait(1).to({scaleX:1.2,scaleY:1.2,rotation:-3.8,y:402.3,alpha:0.485},0).wait(1).to({scaleX:1.2,scaleY:1.2,y:402.7,alpha:0.47},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:-3.9,y:403.2,alpha:0.455},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:403.6,alpha:0.439},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:404,alpha:0.424},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:-4,y:404.4,alpha:0.409},0).wait(1).to({scaleX:1.21,scaleY:1.21,y:404.8,alpha:0.394},0).wait(1).to({scaleX:1.21,scaleY:1.21,x:277.3,y:405.2,alpha:0.379},0).wait(1).to({scaleX:1.21,scaleY:1.21,rotation:-4.1,y:405.6,alpha:0.364},0).wait(1).to({scaleX:1.22,scaleY:1.22,y:405.9,alpha:0.348},0).wait(1).to({scaleX:1.22,scaleY:1.22,rotation:-4.2,y:406.3,alpha:0.333},0).wait(1).to({scaleX:1.22,scaleY:1.22,y:406.7,alpha:0.318},0).wait(1).to({scaleX:1.23,scaleY:1.23,y:407,alpha:0.303},0).wait(1).to({scaleX:1.23,scaleY:1.23,rotation:-4.3,y:407.3,alpha:0.288},0).wait(1).to({scaleX:1.23,scaleY:1.23,y:407.7,alpha:0.273},0).wait(1).to({scaleX:1.24,scaleY:1.24,rotation:-4.4,y:408,alpha:0.258},0).wait(1).to({scaleX:1.24,scaleY:1.24,y:408.3,alpha:0.242},0).wait(1).to({scaleX:1.25,scaleY:1.25,y:408.6,alpha:0.227},0).wait(1).to({scaleX:1.25,scaleY:1.25,rotation:-4.5,y:408.9,alpha:0.212},0).wait(1).to({scaleX:1.26,scaleY:1.26,y:409.2,alpha:0.197},0).wait(1).to({scaleX:1.26,scaleY:1.26,y:409.5,alpha:0.182},0).wait(1).to({scaleX:1.27,scaleY:1.27,rotation:-4.6,y:409.8,alpha:0.167},0).wait(1).to({scaleX:1.28,scaleY:1.28,y:410.1,alpha:0.152},0).wait(1).to({scaleX:1.29,scaleY:1.29,rotation:-4.7,y:410.4,alpha:0.136},0).wait(1).to({scaleX:1.3,scaleY:1.3,y:410.7,alpha:0.121},0).wait(1).to({scaleX:1.31,scaleY:1.31,y:411,alpha:0.106},0).wait(1).to({scaleX:1.33,scaleY:1.33,rotation:-4.8,y:411.2,alpha:0.091},0).wait(1).to({scaleX:1.35,scaleY:1.35,y:411.5,alpha:0.076},0).wait(1).to({scaleX:1.37,scaleY:1.37,y:411.8,alpha:0.061},0).wait(1).to({scaleX:1.4,scaleY:1.4,rotation:-4.9,y:412,alpha:0.045},0).wait(1).to({scaleX:1.46,scaleY:1.46,y:412.3,alpha:0.03},0).wait(1).to({scaleX:1.2,scaleY:1.2,rotation:-5,y:412.6,alpha:0.015},0).wait(1).to({scaleX:1.2,scaleY:1.2,y:412.9,alpha:0},0).to({_off:true},1).wait(81));

	// Star
	this.instance_5 = new lib.Star("synched",0);
	this.instance_5.setTransform(215.2,440);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(30).to({_off:false},0).to({_off:true},9).wait(201));

	// Star
	this.instance_6 = new lib.Star("synched",0);
	this.instance_6.setTransform(304,331,0.803,0.803,52.2);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(33).to({_off:false},0).to({_off:true},9).wait(198));

	// Star
	this.instance_7 = new lib.Star("synched",0);
	this.instance_7.setTransform(805.5,443.3,1.757,1.757,9.9);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(36).to({_off:false},0).to({_off:true},9).wait(195));

	// Star
	this.instance_8 = new lib.Star("synched",0);
	this.instance_8.setTransform(324.3,303.2,1.814,1.814,6.7);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(39).to({_off:false},0).to({_off:true},9).wait(192));

	// Star
	this.instance_9 = new lib.Star("synched",0);
	this.instance_9.setTransform(436,412,0.803,0.803,52.2);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(42).to({_off:false},0).to({_off:true},9).wait(189));

	// Star
	this.instance_10 = new lib.Star("synched",0);
	this.instance_10.setTransform(583,332,0.703,0.703,21.2);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(45).to({_off:false},0).to({_off:true},9).wait(186));

	// Star
	this.instance_11 = new lib.Star("synched",0);
	this.instance_11.setTransform(469,342,0.42,0.42,15.2);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(48).to({_off:false},0).to({_off:true},9).wait(183));

	// Star
	this.instance_12 = new lib.Star("synched",0);
	this.instance_12.setTransform(212,318.6,0.862,0.862,21.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(51).to({_off:false},0).to({_off:true},9).wait(180));

	// Star
	this.instance_13 = new lib.Star("synched",0);
	this.instance_13.setTransform(615,337,0.903,0.903,14.7);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(54).to({_off:false},0).to({_off:true},9).wait(177));

	// Star
	this.instance_14 = new lib.Star("synched",0);
	this.instance_14.setTransform(693,430,0.462,0.462);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(57).to({_off:false},0).to({_off:true},9).wait(174));

	// Star
	this.instance_15 = new lib.Star("synched",0);
	this.instance_15.setTransform(669,449,0.914,0.914,24.4);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(60).to({_off:false},0).to({_off:true},9).wait(171));

	// Star
	this.instance_16 = new lib.Star("synched",0);
	this.instance_16.setTransform(732,322,0.903,0.903,14.7);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(63).to({_off:false},0).to({_off:true},9).wait(168));

	// Star
	this.instance_17 = new lib.Star("synched",0);
	this.instance_17.setTransform(447,349,0.903,0.903);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(66).to({_off:false},0).to({_off:true},9).wait(165));

	// Star
	this.instance_18 = new lib.Star("synched",0);
	this.instance_18.setTransform(414.3,305.5,0.862,0.862,6.7);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(69).to({_off:false},0).to({_off:true},9).wait(162));

	// Star
	this.instance_19 = new lib.Star("synched",0);
	this.instance_19.setTransform(530,368,0.408,0.408,-20);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(72).to({_off:false},0).to({_off:true},9).wait(159));

	// Star
	this.instance_20 = new lib.Star("synched",0);
	this.instance_20.setTransform(807.5,415.1,0.903,0.903);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(75).to({_off:false},0).to({_off:true},9).wait(156));

	// Star
	this.instance_21 = new lib.Star("synched",0);
	this.instance_21.setTransform(410.1,351,0.889,0.889,52.2);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(78).to({_off:false},0).to({_off:true},9).wait(153));

	// Star
	this.instance_22 = new lib.Star("synched",0);
	this.instance_22.setTransform(577.6,399,1.137,1.137,38.7);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(81).to({_off:false},0).to({_off:true},9).wait(150));

	// Star
	this.instance_23 = new lib.Star("synched",0);
	this.instance_23.setTransform(450.8,342.6,0.494,0.494,5.2);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(84).to({_off:false},0).to({_off:true},9).wait(147));

	// Star
	this.instance_24 = new lib.Star("synched",0);
	this.instance_24.setTransform(415.9,426.9,1.137,1.137,21.2);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(87).to({_off:false},0).to({_off:true},9).wait(144));

	// Star
	this.instance_25 = new lib.Star("synched",0);
	this.instance_25.setTransform(534,408,0.332,0.332,-10);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(90).to({_off:false},0).to({_off:true},10).wait(140));

	// Star
	this.instance_26 = new lib.Star("synched",0);
	this.instance_26.setTransform(469,301.5,1.319,1.319,31.9);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(93).to({_off:false},0).to({_off:true},10).wait(137));

	// Star
	this.instance_27 = new lib.Star("synched",0);
	this.instance_27.setTransform(396,312.1,0.889,0.889,66.9);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(96).to({_off:false},0).to({_off:true},10).wait(134));

	// Star
	this.instance_28 = new lib.Star("synched",0);
	this.instance_28.setTransform(635,437.6,0.862,0.862,6.7);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(99).to({_off:false},0).to({_off:true},11).wait(130));

	// Star
	this.instance_29 = new lib.Star("synched",0);
	this.instance_29.setTransform(525,330,1,1,14.7);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(102).to({_off:false},0).to({_off:true},11).wait(127));

	// Star
	this.instance_30 = new lib.Star("synched",0);
	this.instance_30.setTransform(315.3,326.7,0.884,0.884,25.7);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(105).to({_off:false},0).to({_off:true},11).wait(124));

	// Star
	this.instance_31 = new lib.Star("synched",0);
	this.instance_31.setTransform(664.1,346,1,1,-20.5);
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(108).to({_off:false},0).to({_off:true},11).wait(121));

	// Star
	this.instance_32 = new lib.Star("synched",0);
	this.instance_32.setTransform(609.1,371,0.889,0.889,66.9);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(111).to({_off:false},0).to({_off:true},11).wait(118));

	// Star
	this.instance_33 = new lib.Star("synched",0);
	this.instance_33.setTransform(811.1,441,0.804,0.804,3.2);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(114).to({_off:false},0).to({_off:true},11).wait(115));

	// Star
	this.instance_34 = new lib.Star("synched",0);
	this.instance_34.setTransform(232.1,366.7,1.319,1.319);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(117).to({_off:false},0).to({_off:true},11).wait(112));

	// Star
	this.instance_35 = new lib.Star("synched",0);
	this.instance_35.setTransform(338.1,448,1,1,14.5);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(120).to({_off:false},0).to({_off:true},11).wait(109));

	// Star
	this.instance_36 = new lib.Star("synched",0);
	this.instance_36.setTransform(769,368,1,1,14.7);
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(123).to({_off:false},0).to({_off:true},11).wait(106));

	// Star
	this.instance_37 = new lib.Star("synched",0);
	this.instance_37.setTransform(405.8,359.6,1.319,1.319,14.5);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(126).to({_off:false},0).to({_off:true},11).wait(103));

	// LogoGr
	this.instance_38 = new lib.LogoGr("single",0);
	this.instance_38.setTransform(512,384,3,3);
	this.instance_38.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1).to({regX:-36.8,regY:-53.4,scaleX:2.23,scaleY:2.23,x:429.9,y:264.9,alpha:0.366},0).wait(1).to({scaleX:1.96,scaleY:1.96,x:439.8,y:279.2,alpha:0.494},0).wait(1).to({scaleX:1.78,scaleY:1.78,x:446.6,y:289.1,alpha:0.582},0).wait(1).to({scaleX:1.64,scaleY:1.64,x:451.8,y:296.6,alpha:0.649},0).wait(1).to({scaleX:1.52,scaleY:1.52,x:456,y:302.7,alpha:0.704},0).wait(1).to({scaleX:1.43,scaleY:1.43,x:459.5,y:307.8,alpha:0.749},0).wait(1).to({scaleX:1.35,scaleY:1.35,x:462.5,y:312.1,alpha:0.787},0).wait(1).to({scaleX:1.28,scaleY:1.28,x:465,y:315.8,alpha:0.82},0).wait(1).to({scaleX:1.22,scaleY:1.22,x:467.1,y:318.9,alpha:0.848},0).wait(1).to({scaleX:1.17,scaleY:1.17,x:469,y:321.6,alpha:0.872},0).wait(1).to({scaleX:1.12,scaleY:1.12,x:470.7,y:324,alpha:0.893},0).wait(1).to({scaleX:1.09,scaleY:1.09,x:472.1,y:326,alpha:0.912},0).wait(1).to({scaleX:1.05,scaleY:1.05,x:473.3,y:327.8,alpha:0.927},0).wait(1).to({scaleX:1.02,scaleY:1.02,x:474.4,y:329.4,alpha:0.941},0).wait(1).to({scaleX:1,scaleY:1,x:475.3,y:330.7,alpha:0.953},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:476,y:331.8,alpha:0.963},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:476.7,y:332.8,alpha:0.971},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:477.3,y:333.6,alpha:0.979},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:477.7,y:334.2,alpha:0.984},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:478.1,y:334.8,alpha:0.989},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:478.4,y:335.2,alpha:0.993},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:478.6,y:335.5,alpha:0.996},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:478.7,y:335.7,alpha:0.998},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:478.8,y:335.8,alpha:0.999},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:478.9,y:335.9,alpha:1},0).wait(1).to({scaleX:0.9,scaleY:0.9,y:336},0).wait(1).to({regX:0,regY:0,x:512,y:384,mode:"synched",loop:false},0).to({scaleX:0.8,scaleY:0.8,mode:"single"},212,cjs.Ease.get(1)).wait(1));

	// BackGround
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#3F2B46","#000000"],[0,1],0,0.5,0,0,0.5,640.3).s().dr(-512,-384,1024,768);
	this.shape.setTransform(512,384);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(240));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(152.5,384,1743,768);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;