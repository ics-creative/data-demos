/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="TouchManager.ts" />

var view:away.containers.View;
var mesh:away.entities.Mesh;
var loader3d:away.containers.Loader;

var lastPanAngle:number;
var lastTiltAngle:number;
var lastMouseX:number;
var lastMouseY:number;
var isMouseDown:boolean;
var controller:away.controllers.HoverController;

function init() {
	// タッチ対応にさせる
	var tm = new utils.TouchManager();
	tm.enableTouch();
	tm.addListener(document.body);

	// 3Dの土台を作成します
	var renderer = new away.render.DefaultRenderer();
	view = new away.containers.View(renderer);
	view.width = window.innerWidth;
	view.height = window.innerHeight;

	// AWDフォーマットの解析を有効にします
	away.library.AssetLibrary.enableParser(away.parsers.AWDParser);

	// 3Dモデリングデータを読み込み表示します
	loader3d = new away.containers.Loader();
	loader3d.y = -100;
	loader3d.load(new away.net.URLRequest("../models/masterchief.awd"));
	view.scene.addChild(loader3d); // 3D空間に追加


	// 床を用意します
	var prefab = new away.prefabs.PrimitivePlanePrefab(500, 500);
	var plane = <away.entities.Mesh> prefab.getNewObject();
	plane.material = new away.materials.TriangleMethodMaterial(0x333333);
	plane.y = -102;
	view.scene.addChild(plane);

	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();

	// カメラコントローラーを用意します
	controller = new away.controllers.HoverController(view.camera, null, 0, 0);
	controller.distance = 200;

	document.onmousedown = onMouseDown;
	document.onmouseup = onMouseUp;
	document.onmousemove = onMouseMove;
	window.onresize = onResize;
	onResize(); // サイズをウインドウにフィットさせる
}

// 毎フレーム時に実行されるループイベントです
function tick(time:number) {
	view.render(); // レンダリング
}

// マウスを押したとき
function onMouseDown(event) {
	lastPanAngle = controller.panAngle;
	lastTiltAngle = controller.tiltAngle;
	lastMouseX = event.clientX;
	lastMouseY = event.clientY;
	isMouseDown = true;
}

// マウスを離したとき
function onMouseUp(event) {
	isMouseDown = false;
}

// マウスを動かした時
function onMouseMove(event) {
	if (isMouseDown) {
		controller.panAngle = 0.3 * (event.clientX - lastMouseX) + lastPanAngle;
		controller.tiltAngle = 0.3 * (event.clientY - lastMouseY) + lastTiltAngle;
	}
}

// サイズをフィットさせる
function onResize() {
	view.width = window.innerWidth;
	view.height = window.innerHeight;
}

// ページが読み込まれてから実行します
window.onload = init;