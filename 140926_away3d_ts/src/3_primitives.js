/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />
var view;
var container;
var count = 0;
var prefabList;
function init() {
    // 3Dの土台を作成します
    var renderer = new away.render.DefaultRenderer();
    view = new away.containers.View(renderer);
    view.width = window.innerWidth; // 画面全体で表示
    view.height = window.innerHeight;
    // カメラを少し上空に配置し、原点方向を向かせる
    view.camera.z = -600;
    view.camera.y = 300;
    view.camera.lookAt(new away.geom.Vector3D(0, 0, 0));
    // ライトを作成します
    var light = new away.entities.DirectionalLight();
    light.ambient = 0.25;
    // マテリアルを作成します
    var material = new away.materials.TriangleMethodMaterial(0xFF0000);
    // マテリアルにライトを適用します
    material.lightPicker = new away.materials.StaticLightPicker([light]);
    material.bothSides = true;
    // アニメーションさせるためにループイベントを指定します
    var raf = new away.utils.RequestAnimationFrame(tick, this);
    raf.start();
    // ジオメトリを先に作っておく
    prefabList = [
        new away.prefabs.PrimitiveSpherePrefab(),
        new away.prefabs.PrimitiveCubePrefab(),
        new away.prefabs.PrimitivePlanePrefab(),
        new away.prefabs.PrimitiveCapsulePrefab(),
        new away.prefabs.PrimitiveConePrefab(),
        new away.prefabs.PrimitiveCylinderPrefab(),
        new away.prefabs.PrimitiveTorusPrefab()
    ];
    container = new away.containers.DisplayObjectContainer();
    view.scene.addChild(container);
    var i = 0;
    prefabList.map(function (v) {
        // 形状とマテリアルからメッシュを作成します
        var mesh = v.getNewObject();
        mesh.material = material;
        // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
        container.addChild(mesh);
        // 円周上に配置
        mesh.x = 300 * Math.sin(i / prefabList.length * Math.PI * 2);
        mesh.z = 300 * Math.cos(i / prefabList.length * Math.PI * 2);
        i++;
    });
}
// 毎フレーム時に実行されるループイベントです
function tick() {
    container.rotationY += 0.5;
    view.render(); // レンダリング
}
// ページが読み込まれてから実行します
window.onload = init;