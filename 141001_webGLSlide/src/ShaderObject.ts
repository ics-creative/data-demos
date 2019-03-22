/// <reference path="../libs/glMatrix.d.ts" />
/// <reference path="VertexAttributeObject.ts" />
/// <reference path="UniformObject.ts" />
module nineball.webgl.engine {
	/**
	 * レンダリングするシェーダーをまとめたオブジェクトクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class ShaderObject{
		context:WebGLRenderingContext;

		program:WebGLProgram;
		vShader:WebGLShader;
		fShader:WebGLShader;
		uniformList:UniformObject[];
		attributeList:VertexAttributeObject[];

		vShaderSource:string;
		fShaderSource:string;

		constructor($context:WebGLRenderingContext){
			this.context=$context;

			this.uniformList=[];
			this.attributeList=[];
			this.init();
		}

		init(){

		}

		createProgram(){
			var vShader=this.creatShader(this.vShaderSource,this.context.VERTEX_SHADER);
			var fShader=this.creatShader(this.fShaderSource,this.context.FRAGMENT_SHADER);

			this.program=this.context.createProgram();
			this.context.attachShader(this.program,vShader);
			this.context.attachShader(this.program,fShader);

			this.context.linkProgram(this.program);

			var i:number;
			var length:number;

			length=this.attributeList.length;
			for (i = 0; i < length; i++) {
				var attribute:VertexAttributeObject=this.attributeList[i];
				attribute.location=this.context.getAttribLocation(this.program,attribute.name);
			}

			length=this.uniformList.length;
			for (i = 0; i < length; i++) {
				var uniform:UniformObject=this.uniformList[i];
				uniform.location=this.context.getUniformLocation(this.program,uniform.name);
			}
		}

		bindShader(){
			this.bindProgram();
			this.bindUniform();
		}

		bindProgram(){
			if(this.context.getProgramParameter(this.program,this.context.LINK_STATUS)){
				this.context.useProgram(this.program);
			}else{
				console.log(this.context.getProgramInfoLog(this.program));
			}
		}

		bindUniform(){
			var length:number=this.uniformList.length;
			for (var i = 0; i < length; i++) {
				var uniform:UniformObject=this.uniformList[i];
				switch(uniform.type){
					case UniformObject.TYPE_MATRIX:
						this.context.uniformMatrix4fv(uniform.location,false,uniform.matrix);
						break;
					case UniformObject.TYPE_VALUE:
						this.context.uniform1f(uniform.location,uniform.value);
						break;
					default:
						break
				}
			}
		}

		//
		creatShader(source:string,type:number):WebGLShader {
			var shader:WebGLShader=this.context.createShader(type);
			this.context.shaderSource(shader,source);
			this.context.compileShader(shader);

			if(this.context.getShaderParameter(shader,this.context.COMPILE_STATUS)){
				return shader;
			}else{
				console.log(type==this.context.VERTEX_SHADER,this.context.getShaderInfoLog(shader));
				return null;
			}
		}
	}
}