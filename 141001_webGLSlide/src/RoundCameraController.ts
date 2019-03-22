/// <reference path="Camera.ts" />
module nineball.webgl.controller {
	/**
	 * Cameraクラスインスタンスをマウス、タッチ入力で制御するクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class RoundCameraController {
		static RAD:number = Math.PI / 180;
		//parameter
		radiusMin:number = 1.0;
		radiusOffset:number = 0.1;
		gestureRadiusFactor:number = 20;

		//camera
		radius:number = 2;
		private _camera:nineball.webgl.engine.Camera;
		private _stage:HTMLCanvasElement;
		private _target:Float32Array;
		private _theta:number = 0;
		private _oldX:number = 0;
		private _phi:number = 90;
		private _oldY:number = 0;

		private targetTheta=0;
		private targetPhi=90;

		//for mouse
		isMouseDown:Boolean;

		//for touch
		private _identifier;
		private _oldRadius:number;
		private _isGestureChange:Boolean;

		constructor(camera:nineball.webgl.engine.Camera, stage:HTMLCanvasElement) {
			this._camera = camera;
			this._stage = stage;
			this._target = new Float32Array([0,0,0]);
			this.enable();
			this._upDateCamera();
		}

		enable():void
		{
			document.addEventListener("keydown", (event) => {
				this._keyHandler(event);
			});
			document.addEventListener("mouseup", (event) => {
				this._upHandler(event);
			});
			this._stage.addEventListener("mousedown", (event) => {
				this._downHandler(event);
			});
			this._stage.addEventListener("mousemove", (event) => {
				this._moveHandler(event);
			});
			this._stage.addEventListener("mousewheel", (event) => {
				this._wheelHandler(event);
			});
			//touch
			if("ontouchstart" in window){
				this._stage.addEventListener("touchstart", (event) => {
					this._touchStartHandler(event);
				});
				this._stage.addEventListener("touchmove", (event) => {
					this._touchMoveHandler(event);
				});
				document.addEventListener("touchend", (event) => {
					this._touchEndHandler(event);
				});
			}
			if("ongesturestart" in window){
				this._stage.addEventListener("gesturestart",  (event) => {
					this._gestureStartHandler(event);
				});
				this._stage.addEventListener("gesturechange",  (event) => {
					this._gestureChangeHandler(event);
				});
				document.addEventListener("gestureend",  (event) => {
					this._gestureEndHandler(event);
				});
			}
		}

		//
		private _keyHandler(e):void
		{
			switch (e.keyCode)
			{
				case 38:
					this.radius -= this.radiusOffset;
					if (this.radius < this.radiusMin)
					{
						this.radius = this.radiusMin;
					}
					this._upDateCamera();
					break;
				case 40:
					this.radius += this.radiusOffset;
					this._upDateCamera();
					break;
				default:
					break;
			}
		}

		private _upHandler(e):void
		{
			this.isMouseDown = false;
		}

		private _downHandler(e):void
		{
			this.isMouseDown = true;
			var rect = e.target.getBoundingClientRect();
			this._oldX = e.clientX - rect.left;
			this._oldY = e.clientY - rect.top;
		}

		private _wheelHandler(e):void
		{
			if (e.wheelDelta > 0)
			{
				this.radius -= this.radiusOffset;
				if (this.radius < this.radiusMin)
				{
					this.radius = this.radiusMin;
				}
			}
			else
			{
				this.radius += this.radiusOffset;
			}
			this._upDateCamera();
		}

		private _moveHandler(e):void
		{
			if (this.isMouseDown)
			{
				var rect = e.target.getBoundingClientRect();
				var stageX = e.clientX - rect.left;
				var stageY = e.clientY - rect.top;

				this.inputXY(stageX,stageY);
			}
		}

		private _touchStartHandler(e):void
		{
			e.preventDefault();
			if(!this.isMouseDown){
				var touches = e.changedTouches;
				var touch=touches[0];
				this.isMouseDown = true;
				this._identifier=touch.identifier;
				var target = touch.target;
				this._oldX = touch.pageX - target.offsetLeft;
				this._oldY = touch.pageY - target.offsetTop;
			}
		}

		private _touchMoveHandler(e):void
		{
			e.preventDefault();
			if(this._isGestureChange){
				return;
			}
			var touches = e.changedTouches;
			var touchLength:number=touches.length;
			for(var i:number=0;i<touchLength;i++){
				var touch=touches[i];
				if(touch.identifier==this._identifier){
					var target = touch.target;
					var stageX = touch.pageX - target.offsetLeft;
					var stageY = touch.pageY - target.offsetTop;
					this.inputXY(stageX,stageY);
					break;
				}
			}
		}

		private _touchEndHandler(e):void
		{
			e.preventDefault();
			this.isMouseDown = false;
		}

		private _gestureStartHandler(e):void
		{
			this._isGestureChange=true;
			this.isMouseDown=true;
			this._oldRadius=this.radius;
		}

		private _gestureChangeHandler(e):void
		{
			e.preventDefault();
			e.stopImmediatePropagation();
			this.radius = this._oldRadius+this.gestureRadiusFactor*this.radiusOffset*(1-e.scale);
			if (this.radius < this.radiusMin)
			{
				this.radius = this.radiusMin;
			}
			this._upDateCamera();
		}

		private _gestureEndHandler(e):void
		{
			this._isGestureChange=false;
			this.isMouseDown=false;
			this._identifier=-1;
		}

		private inputXY(newX:number,newY:number){
			this._theta -= (newX - this._oldX) *0.3;
			this._oldX = newX;
			this._phi -= (newY - this._oldY) *0.3;
			this._oldY = newY;
			//
//			if (this._theta < 0)
//			{
//				this._theta += 360;
//			}
//			else if (this._theta > 360)
//			{
//				this._theta -= 360;
//			}
			if (this._phi < 20)
			{
				this._phi = 20;
			}
			else if (this._phi > 160)
			{
				this._phi = 160;
			}
			this._upDateCamera();
		}

		private _upDateCamera():void
		{
//			var t:number = this._theta * RoundCameraController.RAD;
//			var p:number = this._phi * RoundCameraController.RAD;
//			var rsin:number = this.radius * Math.sin(p);
//			this._camera.x = rsin * Math.sin(t) + this._target[0];
//			this._camera.z = rsin * Math.cos(t) + this._target[2];
//			this._camera.y = this.radius * Math.cos(p) + this._target[1];
//
//			this._camera.lookAt(this._target);
		}

		upDate():void
		{
			this.targetTheta+=(this._theta-this.targetTheta)*0.1;
			this.targetPhi+=(this._phi-this.targetPhi)*0.1;
			var t:number = this.targetTheta * RoundCameraController.RAD;
			var p:number = this.targetPhi * RoundCameraController.RAD;

			var rsin:number = this.radius * Math.sin(p);
			this._camera.x = rsin * Math.sin(t) + this._target[0];
			this._camera.z = rsin * Math.cos(t) + this._target[2];
			this._camera.y = this.radius * Math.cos(p) + this._target[1];

			this._camera.lookAt(this._target);
		}

		rotate(dTheta:number, dPhi:number):void
		{
			this._theta += dTheta;
			this._phi += dPhi;
			this._upDateCamera();
		}
	}
}