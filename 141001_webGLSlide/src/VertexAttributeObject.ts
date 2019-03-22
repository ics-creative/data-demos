module nineball.webgl.engine {
	/**
	 * シェーダーに渡すattribute情報をまとめたオブジェクトクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class VertexAttributeObject{
		name:string;
		stride:number;
		location:number;

		constructor($name:string,$stride:number){
			this.name=$name;
			this.stride=$stride;
		}
	}
}