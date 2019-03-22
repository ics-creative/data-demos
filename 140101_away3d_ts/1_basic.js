/// <reference path="Away3D.next.d.ts" />
// 変数定義
var view3d;
var mesh;

function init() {
    // 3Dの土台を作成します
    view3d = new away.containers.View3D();

    // ワイヤーフレームのメッシュを作成します
    mesh = new away.primitives.WireframeSphere(400);

    // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
    view3d.scene.addChild(mesh);

    // アニメーションさせるためにループイベントを指定します
    var raf = new away.utils.RequestAnimationFrame(tick, this);
    raf.start();
}

// 毎フレーム時に実行されるループイベントです
function tick(time) {
    // 球面をY軸方向に回転させます
    mesh.rotationY += 1;

    view3d.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;
