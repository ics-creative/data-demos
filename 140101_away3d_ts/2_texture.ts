/// <reference path="Away3D.next.d.ts" />

var view3d:away.containers.View3D;
var image:HTMLImageElement;
var mesh:away.entities.Mesh;

function init(){
	// <img>タグのImageオブジェクトを作って画像読み込み
	image = new Image();
	image.onload = onLoadImage;
	image.src = "imgs/earthmap1k.jpg";
}

function onLoadImage(){
	// 3Dの土台を作成します
	view3d = new away.containers.View3D();

	// HTMLの<img>オブジェクトからテクスチャを作成
	var ts = new away.textures.HTMLImageElementTexture(image, false);

	// マテリアルを作成します
	var material = new away.materials.TextureMaterial(ts);
	// ライトを作成します
	var light = new away.lights.DirectionalLight();
	// マテリアルにライトを適用します
	material.lightPicker = new away.materials.StaticLightPicker([light]);

	// 球体の形状を作成します
	var geometry = new away.primitives.SphereGeometry(300);

	// 形状とマテリアルからメッシュを作成します
	mesh = new away.entities.Mesh(geometry, material);

	// シーンにメッシュを追加します
	view3d.scene.addChild(mesh);

	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();
}


// 毎フレーム時に実行されるループイベントです
function tick(time:number){
	mesh.rotationY -= 0.5;
	view3d.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;