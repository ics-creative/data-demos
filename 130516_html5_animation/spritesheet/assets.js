(function(window) {
Dragon = function() {
	this.initialize();
}
Dragon._SpriteSheet = new createjs.SpriteSheet({images: ["spritesheet/assets.png"], frames: [[0,0,350,381,0,123.05000000000001,367.1],[350,0,350,380,0,123.05000000000001,367.1],[1400,379,349,379,0,123.05000000000001,366.1],[1404,0,350,379,0,124.05000000000001,366.1],[350,380,349,379,0,124.05000000000001,366.1],[1048,754,349,378,0,124.05000000000001,366.1],[349,759,348,378,0,124.05000000000001,366.1],[1395,1133,347,377,0,124.05000000000001,366.1],[1043,1507,347,375,0,124.05000000000001,366.1],[0,1512,346,374,0,124.05000000000001,366.1],[1037,1882,346,372,0,124.05000000000001,366.1],[343,2259,345,370,0,124.05000000000001,366.1],[688,2629,345,369,0,124.05000000000001,366.1],[1033,2627,344,371,0,124.05000000000001,366.1],[0,2629,344,371,0,124.05000000000001,365.1],[1034,2254,343,373,0,124.05000000000001,365.1],[0,1886,343,374,0,124.05000000000001,365.1],[692,1513,345,374,0,126.05000000000001,365.1],[0,1137,348,375,0,129.05,365.1],[1397,758,351,375,0,133.05,365.1],[1050,0,354,375,0,136.05,365.1],[1045,1132,350,375,0,132.05,365.1],[348,1137,348,375,0,129.05,365.1],[346,1885,344,374,0,125.05000000000001,365.1],[1377,2256,343,373,0,124.05000000000001,365.1],[690,1887,344,372,0,124.05000000000001,365.1],[344,2629,344,371,0,124.05000000000001,365.1],[688,2259,345,370,0,124.05000000000001,366.1],[1377,2629,345,369,0,124.05000000000001,366.1],[1383,1885,346,371,0,124.05000000000001,366.1],[346,1512,346,373,0,124.05000000000001,366.1],[1390,1510,347,375,0,124.05000000000001,366.1],[696,1137,347,376,0,124.05000000000001,366.1],[0,760,348,377,0,124.05000000000001,366.1],[697,759,348,378,0,124.05000000000001,366.1],[699,380,349,379,0,124.05000000000001,366.1],[1050,375,350,379,0,124.05000000000001,366.1],[0,381,349,379,0,123.05000000000001,366.1],[700,0,350,380,0,123.05000000000001,367.1],[0,0,350,381,0,123.05000000000001,367.1]]});
var Dragon_p = Dragon.prototype = new createjs.BitmapAnimation();
Dragon_p.BitmapAnimation_initialize = Dragon_p.initialize;
Dragon_p.initialize = function() {
	this.BitmapAnimation_initialize(Dragon._SpriteSheet);
	this.paused = false;
}
window.Dragon = Dragon;
}(window));

