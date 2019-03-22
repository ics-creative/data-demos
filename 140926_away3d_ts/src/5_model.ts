/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />

var view:away.containers.View;
var mesh:away.entities.Mesh;
var loader:away.containers.Loader;

function init() {

	// 3Dの土台を作成します
	var renderer = new away.render.DefaultRenderer();
	view = new away.containers.View(renderer);

	view.camera.z = -200;

	// AWDフォーマットの解析を有効にします
	away.library.AssetLibrary.enableParser(away.parsers.AWDParser);

	// 3Dモデリングデータを読み込み表示します
	loader = new away.containers.Loader();
	loader.y = -50;
	// サイズは適当に指定(モデルに応じて変更)
	loader.load(new away.net.URLRequest("../models/masterchief.awd"));
	view.scene.addChild(loader); // 3D空間に追加



	// アニメーションさせるためにループイベントを指定します
	var raf = new away.utils.RequestAnimationFrame(tick, this);
	raf.start();

	// 画面のリサイズ調整
	window.onresize = onResize;
	onResize();
}

// 毎フレーム時に実行されるループイベントです
function tick(time:number) {
	loader.rotationY -= 0.5;
	view.render(); // レンダリング
}

// サイズをフィットさせる
function onResize(){
	view.width = window.innerWidth;
	view.height = window.innerHeight;
}

// ページが読み込まれてから実行します
window.onload = init;