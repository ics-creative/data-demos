/// <reference path="Away3D.next.d.ts" />
var view3d;
var image;
var mesh;

var lastPanAngle;
var lastTiltAngle;
var lastMouseX;
var lastMouseY;
var isMouseDown;
var controller;

function init() {
    // 画像読み込み
    image = new Image();
    image.onload = onLoadImage;
    image.src = "imgs/earthmap1k.jpg";
}

function onLoadImage() {
    // 3Dの土台を作成します
    view3d = new away.containers.View3D();

    // HTMLの<img>オブジェクトからテクスチャを作成
    var ts = new away.textures.HTMLImageElementTexture(image, false);

    // マテリアルを作成します
    var material = new away.materials.TextureMaterial(ts);

    // ライトを作成します
    var light = new away.lights.DirectionalLight();
    light.ambient = 0.2;
    light.specular = 0.5;

    // マテリアルにライトを適用します
    material.lightPicker = new away.materials.StaticLightPicker([light]);

    // 球体の形状を作成します
    var geometry = new away.primitives.SphereGeometry(300, 30, 30);

    // 形状とマテリアルからメッシュを作成します
    mesh = new away.entities.Mesh(geometry, material);

    // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
    view3d.scene.addChild(mesh);

    // 星屑を作成します
    var colorMaterial = new away.materials.ColorMaterial(0xFFFFFF);
    for (var i = 0; i < 500; i++) {
        var star = new away.entities.Sprite3D(colorMaterial, 5, 5);
        star.x = 3000 * (Math.random() - 0.5);
        star.y = 3000 * (Math.random() - 0.5);
        star.z = 3000 * (Math.random() - 0.5);
        star.material = colorMaterial;
        view3d.scene.addChild(star);
    }

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
    mesh.rotationY -= 0.5;
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
