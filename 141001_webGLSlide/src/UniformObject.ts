module nineball.webgl.engine {
	/**
	 * シェーダーに渡すuniform情報をまとめたオブジェクトクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class UniformObject{
		static TYPE_VALUE:number=0;
		static TYPE_MATRIX:number=1;

		type:number;
		name:string;
		location:WebGLUniformLocation;
		value:number;
		matrix:Float32Array;

		constructor($type:number,$name:string){
			this.name=$name;
			this.type=$type;
		}
	}
}