import 'dart:html' as html;
import 'dart:math';
import 'package:stagexl/stagexl.dart';
import 'package:stats/stats.dart';

Stage stage;
RenderLoop renderLoop;
ResourceManager resourceManager;

int CHILD_NUM = 10;
int CHILD_RADIUS = 50;
int STAGE_H = 600;
int STAGE_W = 800;
int maxCount = 5;
BitmapData image;
html.SpanElement textNumObj;
html.NumberInputElement numInputObj;
Stats stats;
List<MyContainer> objList;

void main()
{
  //------------------------------------------------------------------
  // Initialize the Display List
  //------------------------------------------------------------------

  stage = new Stage("myStage", html.document.query('#stage'));

  renderLoop = new RenderLoop();
  renderLoop.addStage(stage);

  //------------------------------------------------------------------
  // Use the Resource class to load some Bitmaps
  //------------------------------------------------------------------

  resourceManager = new ResourceManager()
    ..addBitmapData("Piyo", "commons/piyo.png");

  //------------------------------------------------------------------
  // Draw buttons for different masks and start animation
  //------------------------------------------------------------------

  resourceManager.load().then((result)
  {
    image = resourceManager.getBitmapData("Piyo") as BitmapData;
    
    // init property
    initializeElement();

    // start animations
    generateObj();
    stage.onEnterFrame.listen(handleTick);
  });
}

void initializeElement()
{
  numInputObj = html.document.query("#inputNumObj");
  numInputObj.onChange.listen((e) => checkAndAddObj());
  maxCount = numInputObj.valueAsNumber.round();
  
  textNumObj = html.document.query("#textNumObj");
  
  stats = new Stats();
  html.document.query("#containerStats").append(stats.container);
}

void checkAndAddObj()
{
  maxCount = (numInputObj.valueAsNumber as double).round();
  generateObj();
}

void generateObj()
{
  resetObj();

  objList = new List<MyContainer>();
  
  for (int i = 0; i < maxCount; i++)
  {
    MyContainer container = new MyContainer();
    container.x = new Random().nextDouble() * STAGE_W;
    container.vy = 5 * new Random().nextDouble();
    container.vr = 5 * new Random().nextDouble() * PI / 180;
    objList.add(container);
    stage.addChild(container);
    for (int j = 0; j < CHILD_NUM; j++)
    {
      Bitmap child = new Bitmap(image);
      child.pivotX = 16;
      child.pivotY = 16;
      num rad = j / CHILD_NUM * 360;
      child.x = CHILD_RADIUS * cos(rad * PI / 180);
      child.y = CHILD_RADIUS * sin(rad * PI / 180);
      child.rotation = rad * PI / 180;
      child.scaleX = child.scaleY = j / CHILD_NUM + 0.5;
      child.alpha = j / CHILD_NUM + 0.1;
      container.addChild(child);
    }
  }

  int numCount = (maxCount * CHILD_NUM);
  textNumObj.innerHtml = numCount.toString();
}

void resetObj(){
  while(stage.numChildren > 0)
  {
    stage.removeChildAt(0);
  }
}

void handleTick(EnterFrameEvent e)
{
  // Wrap your rendering with begin() and end() to produce the performance graph
  stats.begin();
  
  int len= (objList as List).length;
  for (int i = 0; i < len; i++)
  {
    MyContainer container = (objList as List)[i];
    container.y += container.vy;
    container.rotation -= container.vr;
    if (container.y > STAGE_H)
      container.y = 0;
  }
  
  // TODO: Canvas or WebGL Rendering happens here!
  stats.end();
}

class MyContainer extends Sprite
{
  num vy = 0;
  num vr = 0;
}