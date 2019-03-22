/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />

var view:away.containers.View;
var image:HTMLImageElement;
var mesh:away.entities.Mesh;

function init(){
	// <img>タグのImageオブジェクトを作って画像読み込み
	image = new Image();
	image.onload = onLoadImage;
	image.src = "../imgs/earthmap1k.jpg";
}
function onLoadImage(){
	// 3Dの土台を作成します
	var renderer = new away.render.DefaultRenderer();
	view = new away.containers.View(renderer);
	view.width = window.innerWidth; // 画面全体で表示
	view.height = window.innerHeight;

	// HTMLの<img>オブジェクトからテクスチャを作成
	var ts = new away.textures.ImageTexture(image);

	// マテリアルを作成します
	var material = new away.materials.TriangleMethodMaterial(ts);
	// ライトを作成します
	var light = new away.entities.DirectionalLight();
	// マテリアルにライトを適用します
	material.lightPicker = new away.materials.StaticLightPicker([light]);

	// 球体の形状を作成します
	var prefab = new away.prefabs.PrimitiveSpherePrefab(300);

	// 形状とマテリアルからメッシュを作成します
	mesh = <away.entities.Mesh> prefab.getNewObject();
	mesh.material = material;

	// シーンにメッシュを追加します
	view.scene.addChild(mesh);

	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();
}


// 毎フレーム時に実行されるループイベントです
function tick(){
	mesh.rotationY -= 0.5;
	view.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;