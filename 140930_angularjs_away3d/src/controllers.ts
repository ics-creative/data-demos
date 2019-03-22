///<reference path="../libs/stagegl-extensions.next.d.ts" />
///<reference path="../angularjs/angular.d.ts" />
'use strict';

// ---------------------------------------
// AngularJS のコード
// ---------------------------------------

var phonecatApp = angular.module('MyApp', []);

phonecatApp.controller('MyController', ($scope) => {
	$scope.$watch('sliderX', function (newVal, oldVal) {
		if (view) view.camera.x = newVal;
		if($scope.checkBoxLookAt){ updateRotation(); }
	});
	$scope.$watch('sliderY', function (newVal, oldVal) {
		if (view) view.camera.y = newVal;
		if($scope.checkBoxLookAt){ updateRotation(); }
	});
	$scope.$watch('sliderZ', function (newVal, oldVal) {
		if (view) view.camera.z = newVal;
		if($scope.checkBoxLookAt){ updateRotation(); }
	});
	$scope.$watch('sliderRotX', function (newVal, oldVal) {
		if (view) view.camera.rotationX = newVal;
	});
	$scope.$watch('sliderRotY', function (newVal, oldVal) {
		if (view) view.camera.rotationY = newVal;
	});
	$scope.$watch('sliderRotZ', function (newVal, oldVal) {
		if (view) view.camera.rotationZ = newVal;
	});
	$scope.$watch('checkBoxLookAt', function (newVal, oldVal) {
		isLookAt = newVal;
	});

	function updateRotation(){
		$scope.sliderRotX = Math.round(view.camera.rotationX);
		$scope.sliderRotY = Math.round(view.camera.rotationY);
		$scope.sliderRotZ = Math.round(view.camera.rotationZ);
	}

	$scope.sliderX = 0;
	$scope.sliderY = 0;
	$scope.sliderZ = -1000;
	$scope.sliderRotX = 0;
	$scope.sliderRotY = 0;
	$scope.sliderRotZ = 0;
	$scope.isLookAt = true;
	$scope.checkBoxLookAt = true;
});


// ---------------------------------------
// Away3D のコード
// ---------------------------------------

var view:away.containers.View;
var image:HTMLImageElement;
var mesh:away.entities.Mesh;
var isLookAt:boolean = false;

function init() {

	// 画像読み込み
	image = new Image();
	image.onload = onLoadImage;
	image.src = "imgs/earthmap1k.jpg";
}

function onLoadImage() {
	// 3Dの土台を作成します
	var renderer = new away.render.DefaultRenderer();
	view = new away.containers.View(renderer);
	view.camera.projection.far = 100000;

	// HTMLの<img>オブジェクトからテクスチャを作成
	var ts = new away.textures.ImageTexture(image);

	// マテリアルを作成します
	var material = new away.materials.TriangleMethodMaterial(ts);
	// ライトを作成します
	var light = new away.entities.DirectionalLight();
//	light.y = 1000;
//	light.z = -1000;
	view.scene.addChild(light);
	// マテリアルにライトを適用します
	var lightPicker = new away.materials.StaticLightPicker([light]);
	material.lightPicker = lightPicker;

	// 地面を作成
	var earth = <away.entities.Mesh> new away.prefabs.PrimitivePlanePrefab(3000, 3000).getNewObject();
	var materialEarth = new away.materials.TriangleMethodMaterial(
		away.materials.DefaultMaterialManager.getDefaultTexture()
	);

	materialEarth.smooth = false;
	materialEarth.lightPicker = lightPicker;

	materialEarth.shadowMethod = new away.materials.ShadowSoftMethod(light, 32, 5);
	materialEarth.shadowMethod.epsilon = 0.2;
	earth.castsShadows = false;
	earth.material = materialEarth;
	earth.y = -500;
	view.scene.addChild(earth);

	// 球体の形状を作成します
	var prefab = new away.prefabs.PrimitiveSpherePrefab(300, 30, 30);
	prefab.material = material;

	// 形状とマテリアルからメッシュを作成します
	mesh = <away.entities.Mesh> prefab.getNewObject();
	mesh.castsShadows = true;

	// 3D表示インスタンスのsceneプロパティーが3D表示空間となります
	view.scene.addChild(mesh);

	// 星屑を作成します
	var colorMaterial = new away.materials.TriangleMethodMaterial(0xFFFFFF);
	for (var i:number = 0; i < 300; i++) {
		var star = new away.entities.Billboard(colorMaterial, away.base.PixelSnapping.NEVER, false);
		star.x = 3000 * (Math.random() - 0.5);
		star.y = 3000 * (Math.random() - 0.5);
		star.z = 3000 * (Math.random() - 0.5);
		star.width = 5;
		star.height = 5;
		star.material = colorMaterial;
		// 常に正面を向かせる命令
		star.orientationMode = away.base.OrientationMode.CAMERA_PLANE;
		view.scene.addChild(star);
	}

	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();

	window.onresize = onResize;
	onResize(); // サイズをウインドウにフィットさせる
}


// 毎フレーム時に実行されるループイベントです
function tick(time:number) {
	mesh.rotationY -= 0.5;
	if (isLookAt)
		view.camera.lookAt(new away.geom.Vector3D(0, 0, 0));
	view.render(); // レンダリング
}

// サイズをフィットさせる
function onResize() {
	view.width = window.innerWidth;
	view.height = window.innerHeight;
}

// ページが読み込まれてから実行します
window.addEventListener("load", ()=> {
	init();
})