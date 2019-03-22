/// <reference path="../libs/glMatrix.d.ts" />
/// <reference path="ShaderObject.ts" />
/// <reference path="VertexAttributeObject.ts" />
module nineball.webgl.engine{
	/**
	 * レンダリング対象の情報をオブジェクトにまとめたクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class RenderingObject{
		context:WebGLRenderingContext;

		vboList:WebGLBuffer[];
		ibo:WebGLBuffer;

		vboDataList:number[][];
		iboData:number[];

		shader:ShaderObject;

		constructor($context:WebGLRenderingContext) {
			this.context=$context;

			this.vboList=[];
			this.vboDataList=[];

			this.init();
		}

		init(){
		}

		attachShader($shader:ShaderObject){
			this.shader=$shader;
		}

		bindVertexbuffer(){
			var length:number=this.shader.attributeList.length;
			for (var i = 0; i < length; i++) {
				var attribute:VertexAttributeObject=this.shader.attributeList[i];
				if(attribute.location>=0){
					this.context.bindBuffer(this.context.ARRAY_BUFFER,this.vboList[i]);
					this.context.enableVertexAttribArray(attribute.location);
					this.context.vertexAttribPointer(attribute.location,attribute.stride,this.context.FLOAT,false,0,0);
				}
			}
		}
	}
}