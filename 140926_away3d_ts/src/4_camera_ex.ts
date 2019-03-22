/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="TouchManager.ts" />

var view:away.containers.View;
var image:HTMLImageElement;
var mesh:away.entities.Mesh;

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

	// 画像読み込み
	image = new Image();
	image.onload = onLoadImage;
	image.src = "../imgs/earthmap1k.jpg";
}

function onLoadImage() {
	// 3Dの土台を作成します
	var renderer = new away.render.DefaultRenderer();
	view = new away.containers.View(renderer);
	view.width = 800;
	view.height = 600;

	// HTMLの<img>オブジェクトからテクスチャを作成
	var ts = new away.textures.ImageTexture(image);

	// マテリアルを作成します
	var material = new away.materials.TriangleMethodMaterial(ts);
	// ライトを作成します
	var light = new away.entities.DirectionalLight();
	light.ambient = 0.2;
	light.specular = 0.5;
	// マテリアルにライトを適用します
	material.lightPicker = new away.materials.StaticLightPicker([light]);

	// 球体の形状を作成します
	var prefab = new away.prefabs.PrimitiveSpherePrefab(300, 30, 30);
	prefab.material = material;

	// 形状とマテリアルからメッシュを作成します
	mesh = <away.entities.Mesh> prefab.getNewObject();

	// 3D表示インスタンスのsceneプロパティーが3D表示空間となります
	view.scene.addChild(mesh);

	// 星屑を作成します (カメラの動きをわかりやすくするため)
	var colorMaterial = new away.materials.TriangleMethodMaterial(0xFFFFFF);
	for (var i:number = 0; i < 1000; i++) {
		var star = new away.entities.Billboard(colorMaterial);
		star.x = 3000 * (Math.random() - 0.5);
		star.y = 3000 * (Math.random() - 0.5);
		star.z = 3000 * (Math.random() - 0.5);
		star.width = star.height = 5; // 大きさを指定
		star.material = colorMaterial;
		// 常に正面を向かせる命令
		star.orientationMode = away.base.OrientationMode.CAMERA_PLANE;
		view.scene.addChild(star);
	}

	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();

	// カメラコントローラーを用意します
	controller = new away.controllers.HoverController(view.camera, null, 0, 0);

	document.onmousedown = onMouseDown;
	document.onmouseup = onMouseUp;
	document.onmousemove = onMouseMove;
	window.onresize = onResize;
	onResize(); // サイズをウインドウにフィットさせる
}


// 毎フレーム時に実行されるループイベントです
function tick(time:number) {
	mesh.rotationY -= 0.5;
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
function onResize(){
	view.width = window.innerWidth;
	view.height = window.innerHeight;
}

// ページが読み込まれてから実行します
window.onload = init;