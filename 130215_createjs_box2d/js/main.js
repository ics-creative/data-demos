const box2d = {
  b2Vec2: Box2D.Common.Math.b2Vec2,
  b2AABB: Box2D.Collision.b2AABB,
  b2BodyDef: Box2D.Dynamics.b2BodyDef,
  b2Body: Box2D.Dynamics.b2Body,
  b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
  b2Fixture: Box2D.Dynamics.b2Fixture,
  b2World: Box2D.Dynamics.b2World,
  b2MassData: Box2D.Collision.Shapes.b2MassData,
  b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
  b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
  b2DebugDraw: Box2D.Dynamics.b2DebugDraw,
  b2MouseJointDef: Box2D.Dynamics.Joints.b2MouseJointDef
};

const NUM_OBJECT = 20;
const SCALE = 30;
let stage, world;
const GROUND_W = 960;
const GROUND_H = 20;
const CIRCLE_RADIUS = 64;
let mouseJoint = null;
let ground = null;
const mousePoint = new box2d.b2Vec2();
let lastPressObject;

function init() {
  const canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  // enable touch action
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
  }

  // init Physics
  setupPhysics();

  // init objects
  const bgBmp = new createjs.Bitmap("imgs/bg.png");
  stage.addChild(bgBmp);

  for (let i = 0; i < NUM_OBJECT; i++) {
    createBall();
  }

  stage.on("stagemousedown", handleMouseDown);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.addEventListener("tick", handleTick);
}

function handleMouseDown(event) {
  const mouseX = event.stageX;
  const mouseY = event.stageY;
  mousePoint.Set(mouseX / SCALE, mouseY / SCALE);
  const hitBody = getBodyAtMouse();

  if (hitBody) {

    //if joint exists then create
    const def = new box2d.b2MouseJointDef();

    def.bodyA = ground;
    def.bodyB = hitBody;
    def.target = mousePoint;

    def.collideConnected = true;
    def.maxForce = 1000 * hitBody.GetMass();
    def.dampingRatio = 0;

    mouseJoint = world.CreateJoint(def);

    lastPressObject = hitBody.GetUserData();
    createjs.Tween.get(lastPressObject, {override: true})
        .to({scaleX: 1.4, scaleY: 1.4}, 600, createjs.Ease.elasticOut);
    stage.addChild(lastPressObject);

    hitBody.SetAwake(true);
  }

  stage.on("stagemousemove", handleMouseMove);
  stage.on("stagemouseup", handleMouseUp);
}


function handleMouseMove(event) {
  // canvas 上の座標に変換
  const mouseX = event.stageX;
  const mouseY = event.stageY;
  mousePoint.Set(mouseX / SCALE, mouseY / SCALE);

  if (mouseJoint) {
    mouseJoint.SetTarget(mousePoint);
  }
}

function handleMouseUp(event) {
  // dispose event handler
  stage.off("stagemousemove", handleMouseMove);
  stage.off("stagemouseup", handleMouseUp);

  isMousePressed = false;

  if (mouseJoint) {
    world.DestroyJoint(mouseJoint);
    mouseJoint = false;

    if (lastPressObject) {
      createjs.Tween.get(lastPressObject, {override: true})
          .to({scaleX: 1, scaleY: 1}, 300, createjs.Ease.cubicOut);
    }
  }
}

function createBall() {
  // create shape
  const bmp = new createjs.Bitmap("imgs/icon_" + (Math.random() * 6 >> 0) + ".png");
  bmp.regX = CIRCLE_RADIUS / 2;
  bmp.regY = CIRCLE_RADIUS / 2;
  stage.addChild(bmp);

  // create ground
  const fixDef = new box2d.b2FixtureDef(0);
  fixDef.density = 1;
  fixDef.friction = 0.6;
  fixDef.restitution = 0.6;
  const bodyDef = new box2d.b2BodyDef();
  bodyDef.type = box2d.b2Body.b2_dynamicBody;
  bodyDef.position.x = Math.random() * GROUND_W / SCALE;
  bodyDef.position.y = (Math.random() * 300 + 100) / SCALE;
  bodyDef.userData = bmp;
  fixDef.shape = new box2d.b2CircleShape(CIRCLE_RADIUS / 2 / SCALE);
  world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function setupPhysics() {
  world = new box2d.b2World(new box2d.b2Vec2(0, 100), true);

  createWall(960 / 2, 0, GROUND_W, GROUND_H);
  createWall(0, 540 / 2, GROUND_H, GROUND_W);
  createWall(960, 540 / 2, GROUND_H, GROUND_W);
  ground = createWall(960 / 2, 540, GROUND_W, GROUND_H);
}

function createWall(x, y, w, h) {
  // create ground shape
  const shape = new createjs.Shape();
  shape.graphics.beginFill("#000").drawRect(0, 0, w, h);
  shape.regX = w / 2;
  shape.regY = h / 2;
  stage.addChild(shape);

  // create ground
  const fixDef = new box2d.b2FixtureDef(0);
  fixDef.density = 1;
  fixDef.friction = 0.5;
  const bodyDef = new box2d.b2BodyDef();
  bodyDef.type = box2d.b2Body.b2_staticBody;
  bodyDef.position.x = x / SCALE;
  bodyDef.position.y = y / SCALE;
  bodyDef.userData = shape;
  fixDef.shape = new box2d.b2PolygonShape();
  fixDef.shape.SetAsBox(w / 2 / SCALE, h / 2 / SCALE);
  const ground = world.CreateBody(bodyDef);
  ground.CreateFixture(fixDef);
  return ground;
}

function getBodyAtMouse(includeStatic) {
  const aabb = new box2d.b2AABB();
  aabb.lowerBound.Set(mousePoint.x - 0.001, mousePoint.y - 0.001);
  aabb.upperBound.Set(mousePoint.x + 0.001, mousePoint.y + 0.001);

  let body = null;

  // Query the world for overlapping shapes.
  function getBodyCallback(fixture) {
    const shape = fixture.GetShape();

    if (fixture.GetBody().GetType() != box2d.b2Body.b2_staticBody || includeStatic) {
      const inside = shape.TestPoint(fixture.GetBody().GetTransform(), mousePoint);

      if (inside) {
        body = fixture.GetBody();
        return false;
      }
    }

    return true;
  }

  world.QueryAABB(getBodyCallback, aabb);
  return body;
}

function handleTick() {

  world.Step(1 / 60, 10, 10);

  // Box2Dの計算結果を描画に反映
  let body = world.GetBodyList();
  while (body) {
    const obj = body.GetUserData();
    if (obj) {
      const position = body.GetPosition();
      obj.x = position.x * SCALE;
      obj.y = position.y * SCALE;
      obj.rotation = body.GetAngle() * 180 / Math.PI;
    }
    body = body.GetNext();
  }

  stage.update();
}
