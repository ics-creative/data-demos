/// <reference path="../libs/glMatrix.d.ts" />
module nineball.webgl.engine {
	/**
	 * プロジェクション変換行列を取得するための簡易カメラクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class Camera {
		static DIRECTION:Float32Array = new Float32Array([0, 0, 1]);
		//
		private _cameraUP:Float32Array = new Float32Array([0, 1, 0]);
		//
		private _projectionMtx:Float32Array = mat4.identity(mat4.create(null));
		private _cameraMtx:Float32Array = mat4.identity(mat4.create(null));
		private _lookMtx:Float32Array = mat4.identity(mat4.create(null));
		//
		x:number = 0;
		y:number = 0;
		z:number = 0;

		constructor(fov:number, aspect:number, zNear:number, zFar:number) {
			mat4.perspective(this._projectionMtx,fov,aspect,zNear,zFar);
		}

		getCameraMtx():Float32Array
		{
			return this._cameraMtx;
		}

		lookAt(point:Float32Array):void
		{
			mat4.identity(this._lookMtx);
			mat4.lookAt(this._lookMtx,new Float32Array([this.x,this.y,this.z]),point,this._cameraUP);
			mat4.multiply(this._cameraMtx,this._projectionMtx,this._lookMtx);
		}
	}
}