/// <reference path="Away3D.next.d.ts" />
var view3d;
var mesh;
var loader3d;

function init() {
    // 3Dの土台を作成します
    view3d = new away.containers.View3D();

    // 床を用意します
    var plane = new away.primitives.WireframePlane(2500, 2500, 20, 20, 0x666666, 1, "xz");
    plane.y = -300;
    view3d.scene.addChild(plane);

    // AWDフォーマットの解析を有効にします
    away.library.AssetLibrary.enableParser(away.loaders.AWDParser);

    // 3Dモデリングデータを読み込み表示します
    loader3d = new away.loaders.Loader3D();
    loader3d.scale(5); // サイズは適当に指定(モデルに応じて変更)
    loader3d.y = -300;
    loader3d.load(new away.net.URLRequest("models/masterchief.awd"));
    view3d.scene.addChild(loader3d); // 3D空間に追加

    // アニメーションさせるためにループイベントを指定します
    var raf = new away.utils.RequestAnimationFrame(tick, this);
    raf.start();
}

// 毎フレーム時に実行されるループイベントです
function tick(time) {
    loader3d.rotationY -= 0.5;
    view3d.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;
