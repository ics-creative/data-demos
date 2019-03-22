/// <reference path="Away3D.next.d.ts" />

var view3d:away.containers.View3D;
var mesh:away.entities.Mesh;
var count:number = 0;
var geometyList:away.base.Geometry[];

function init() {
	view3d = new away.containers.View3D();

	view3d.camera.z = -200;

	// マテリアルを作成します
	var material = new away.materials.ColorMaterial(0xFF0000);
	// ライトを作成します
	var light = new away.lights.DirectionalLight();
	light.ambient = 0.25;
	// マテリアルにライトを適用します
	material.lightPicker = new away.materials.StaticLightPicker([light]);
	material.bothSides = true;

	// 形状とマテリアルからメッシュを作成します
	// あとでジオメトリを代入するのでとりあえずnullで
	mesh = new away.entities.Mesh(null, material);

	// 3D表示インスタンスのsceneプロパティーが3D表示空間となります
	view3d.scene.addChild(mesh);

	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();

	// ジオメトリを先に作っておく
	geometyList = [
		new away.primitives.SphereGeometry(), // 球体
		new away.primitives.CubeGeometry(), // 直方体
		new away.primitives.PlaneGeometry(), // 平面
		new away.primitives.CapsuleGeometry(), // カプセル形状
		new away.primitives.ConeGeometry(), // 三角錐
		new away.primitives.CylinderGeometry(), // 円柱
		new away.primitives.TorusGeometry() // ドーナツ形状
	];

	document.body.onclick = changeGeometry;
	changeGeometry();
}

function changeGeometry():void {
	mesh.geometry = geometyList[count];

	count++;
	if (count >= geometyList.length) count = 0;
}

// 毎フレーム時に実行されるループイベントです
function tick(time:number) {
	mesh.rotationX += 1;
	mesh.rotationY += 0.5;
	view3d.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;