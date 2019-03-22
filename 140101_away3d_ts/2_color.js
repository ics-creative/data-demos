/// <reference path="Away3D.next.d.ts" />
var view3d;

function init() {
    // 3Dの土台を作成します
    view3d = new away.containers.View3D();

    // マテリアルを作成します
    var material = new away.materials.ColorMaterial(0xFF0000);

    // ライトを作成します
    var light = new away.lights.DirectionalLight();

    // マテリアルにライトを適用します
    material.lightPicker = new away.materials.StaticLightPicker([light]);

    // 球体の形状を作成します
    var geometry = new away.primitives.SphereGeometry(300);

    // 形状とマテリアルからメッシュを作成します
    var mesh = new away.entities.Mesh(geometry, material);

    // シーンにメッシュを追加します
    view3d.scene.addChild(mesh);

    // アニメーションさせるためにループイベントを指定します
    var raf = new away.utils.RequestAnimationFrame(tick, this);
    raf.start();
}

// 毎フレーム時に実行されるループイベントです
function tick(time) {
    view3d.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;
//# sourceMappingURL=2_color.js.map