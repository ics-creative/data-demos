var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
var width = 480;
var height = 320;
var wabbitTexture;
var pirateTexture;
var bunnys = [];
var gravity = 0.5 //1.5 ;
var maxX = clientWidth;
var minX = 0;
var maxY = clientHeight;
var minY = 0;
var startBunnyCount = 2;
var isAdding = false;
var count = 0;
var container;
var pixiLogo;
var amount = 5;

function onReady() {
    
    renderer = new PIXI.autoDetectRenderer(clientWidth, clientHeight, {background:0xffffff});
    stage = new PIXI.Stage(0xFFFFFF);

    if( renderer == false ) {
    }

    if ( (renderer instanceof PIXI.WebGLRenderer) && renderer.context != undefined) {
        renderer.context.mozImageSmoothingEnabled = false
        renderer.context.webkitImageSmoothingEnabled = false;

    }
    renderer.view.style["transform"] = "translatez(0)";

    document.body.appendChild(renderer.view);

    renderer.view.style.position = "absolute";
    fps = new FPSChecker();


    rabbitTexture = new PIXI.Texture.fromImage("bunny.png")
    counter = document.createElement("div");
    counter.className = "counter";

    pixiLogo = document.getElementById("pixi");

    counter.innerHTML = "Touch to Start!";


    container = new PIXI.DisplayObjectContainer();
    container = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
    stage.addChild(container);
    currentTexture = new PIXI.Texture(rabbitTexture.baseTexture, new PIXI.math.Rectangle(0, 0, 26, 37));

    document.body.appendChild(counter);

    renderer.view.style.margin = "0px";
    renderer.view.style.padding = "0px";
    
    counter.style.position = "absolute";
    counter.style.top = "20px";

    isAdding = true;
    
    document.addEventListener("touchstart",touchEventFunc);
    document.addEventListener('click', touchEventFunc);
    
    
    renderer.render(stage);

}

function touchEventFunc() {
    counter.innerHTML = "0 BUNNY";
    
    requestAnimationFrame(update);
}

function update() {

    fps.finish();
    counter.innerHTML = bunnys.length + " BUNNYS, " +  fps.getFPSText();

    if( fps.calculated() && fps.getMostRecentFrameRate() <= 30 ){
        isAdding = false;
        alert( bunnys.length + " BUNNY!");

        return ;
    }
    
    amount = fps.fps >= 40 ? 5: 1;
    
    for (var i = 0; i < amount; i++) {
        var bunny = new PIXI.Sprite(currentTexture);
        bunny.speedX = Math.random() * 10;
        bunny.speedY = (Math.random() * 10) - 5;
        bunny.anchor.y = 1;
        bunny.alpha = 0.3 + Math.random() * 0.7;
        bunnys.push(bunny);
        bunny.scale.set(0.5 + Math.random() * 0.5);
        bunny.rotation = (Math.random() - 0.5)
        
        var random = Math2.randomInt(0, container.children.length - 2);
        container.addChild(bunny) //, random);
        
        count++;
    }

    fps.begin();
    for (var i = 0; i < bunnys.length; i++) {
        var bunny = bunnys[i];
        //bunny.rotation += 0.1

        bunny.position.x += bunny.speedX;
        bunny.position.y += bunny.speedY;
        bunny.speedY += gravity;

        if (bunny.position.x > maxX) {
            bunny.speedX *= -1;
            bunny.position.x = maxX;
        } else if (bunny.position.x < minX) {
            bunny.speedX *= -1;
            bunny.position.x = minX;
        }

        if (bunny.position.y > maxY) {
            bunny.speedY *= -0.85;
            bunny.position.y = maxY;
            bunny.spin = (Math.random() - 0.5) * 0.2
            if (Math.random() > 0.5) {
                bunny.speedY -= Math.random() * 6;
            }
        } else if (bunny.position.y < minY) {
            bunny.speedY = 0;
            bunny.position.y = minY;
        }

    }

    renderer.render(stage);

   
    requestAnimationFrame(update);

}