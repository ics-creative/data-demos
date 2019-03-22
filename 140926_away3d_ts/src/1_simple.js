/// TypeScript での定義ファイル読み込み (JavaScript では関係ありません)
///<reference path="../libs/stagegl-extensions.next.d.ts" />
var view;
var mesh;
function init() {
    // 3Dの土台を作成します
    var renderer = new away.render.DefaultRenderer();
    view = new away.containers.View(renderer);
    view.width = window.innerWidth; // 画面全体で表示
    view.height = window.innerHeight;
    // マテリアルを作成します
    var material = new away.materials.TriangleMethodMaterial(0xFF0000);
    // 球体の形状を作成します
    var prefab = new away.prefabs.PrimitiveSpherePrefab(300);
    // 形状とマテリアルからメッシュを作成します
    mesh = prefab.getNewObject();
    mesh.material = material;
    // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
    view.scene.addChild(mesh);
    // アニメーションさせるためにループイベントを指定します
    var raf = new away.utils.RequestAnimationFrame(tick, this);
    raf.start();
}
// 毎フレーム時に実行されるループイベントです
function tick() {
    mesh.rotationY += 1;
    view.render(); // レンダリング
}
// ページが読み込まれてから実行します
window.onload = init;
