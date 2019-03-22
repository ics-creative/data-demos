function Bunny(x, y, rotate, scale) {
	this.x = x;
	this.y = y;
	this.rotate = rotate;
	this.speedX = Math.random() * 5 - 2.5;
	this.speedY = (Math.random() * 5);
	this.scale = scale;
	this.degree = parseInt(this.rotate / (Math.PI / 180));
}

Bunny.prototype.getDegree = function () {
	return this.degree;
}


Bunny.prototype.getScale = function () {
	return this.scale;
}

Bunny.prototype.getX = function () {
	return parseInt(this.x);
}

Bunny.prototype.getY = function () {
	return parseInt(this.y);
}

Bunny.prototype.getRotate = function () {
	return this.rotate;
}

var gravity = 0.5;

Bunny.prototype.calc = function (minX, minY, maxX, maxY) {

	this.x += this.speedX;
	this.y += this.speedY;

	this.speedY += gravity;

	if (this.x > maxX) {
		this.speedX *= -1;
		this.x = maxX;
	}
	else if (this.x < minX) {
		this.speedX *= -1;
		this.x = minX;
	}
	if (this.y > maxY) {
		this.speedY *= -0.8;
		this.y = maxY;
		if (Math.random() > 0.5) this.speedY -= 3 + Math.random() * 4;
	}
	else if (this.y < minY) {
		this.speedY = 0;
		this.y = minY;
	}
}
