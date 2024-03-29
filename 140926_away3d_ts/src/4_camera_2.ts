/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />

var view:away.containers.View;
var image:HTMLImageElement;
var mesh:away.entities.Mesh;
var rot:number = 0 // 角度
var mouseX = 0; // マウス座標
function init() {
	// <img>タグのImageオブジェクトを作って画像読み込み
	image = new Image();
	image.onload = onLoadImage;
	image.src = "../imgs/earthmap1k.jpg";
}
function onLoadImage() {
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
	light.specular = 0.5; // テカリを半分ぐらいに
	light.ambient = 0.2; // 光の当たらない部分にも少し灯りを
	// マテリアルにライトを適用します
	material.lightPicker = new away.materials.StaticLightPicker([light]);

	// 球体の形状を作成します
	var prefab = new away.prefabs.PrimitiveSpherePrefab(300, 30, 30);

	// 形状とマテリアルからメッシュを作成します
	mesh = <away.entities.Mesh> prefab.getNewObject();
	mesh.material = material;

	// シーンにメッシュを追加します
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
}

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event)=> {
	mouseX = event.pageX;
});

// 毎フレーム時に実行されるループイベントです
function tick() {
	// マウスの位置に応じて角度を設定
	// マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
	var targetRot:number = ( mouseX / window.innerWidth ) * 360

	// イージングの公式を用いて滑らかにする
	// 値 += (目標値 - 現在の値) * 減速値
	rot += (targetRot - rot) * 0.02;

	// 角度に応じてカメラの位置を設定
	view.camera.x = 1000 * Math.sin(rot * Math.PI / 180);
	view.camera.z = 1000 * Math.cos(rot * Math.PI / 180);

	// 原点方向を見つめる
	view.camera.lookAt(new away.geom.Vector3D(0, 0, 0));

	// 地球は常に回転させておく
	mesh.rotationY -= 0.1;
	view.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;