/// <reference path="Away3D.next.d.ts" />
var view3d;
var mesh;
var loader3d;

var lastPanAngle;
var lastTiltAngle;
var lastMouseX;
var lastMouseY;
var isMouseDown;
var controller;

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

    // カメラコントローラーを用意します
    controller = new away.controllers.HoverController(view3d.camera, null, 0, 0);

    document.onmousedown = onMouseDown;
    document.onmouseup = onMouseUp;
    document.onmousemove = onMouseMove;
    window.onresize = onResize;
    onResize(); // サイズをウインドウにフィットさせる
}

// 毎フレーム時に実行されるループイベントです
function tick(time) {
    view3d.render(); // レンダリング
}

// マウスを押したとき
function onMouseDown(event) {
    lastPanAngle = controller.panAngle;
    lastTiltAngle = controller.tiltAngle;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    isMouseDown = true;
}

// マウスを離したとき
function onMouseUp(event) {
    isMouseDown = false;
}

// マウスを動かした時
function onMouseMove(event) {
    if (isMouseDown) {
        controller.panAngle = 0.3 * (event.clientX - lastMouseX) + lastPanAngle;
        controller.tiltAngle = 0.3 * (event.clientY - lastMouseY) + lastTiltAngle;
    }
}

// サイズをフィットさせる
function onResize() {
    view3d.width = window.innerWidth;
    view3d.height = window.innerHeight;
}

// ページが読み込まれてから実行します
window.onload = init;
