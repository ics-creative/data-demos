/// <reference path="Away3D.next.d.ts" />
var view3d;
var mesh;
var count = 0;
var geometyList;

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
        new away.primitives.SphereGeometry(),
        new away.primitives.CubeGeometry(),
        new away.primitives.PlaneGeometry(),
        new away.primitives.CapsuleGeometry(),
        new away.primitives.ConeGeometry(),
        new away.primitives.CylinderGeometry(),
        new away.primitives.TorusGeometry()
    ];

    document.body.onclick = changeGeometry;
    changeGeometry();
}

function changeGeometry() {
    mesh.geometry = geometyList[count];

    count++;
    if (count >= geometyList.length)
        count = 0;
}

// 毎フレーム時に実行されるループイベントです
function tick(time) {
    mesh.rotationX += 1;
    mesh.rotationY += 0.5;
    view3d.render(); // レンダリング
}

// ページが読み込まれてから実行します
window.onload = init;
