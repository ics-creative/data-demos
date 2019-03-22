/// <reference path="ShaderObject.ts" />
/// <reference path="VertexAttributeObject.ts" />
/// <reference path="UniformObject.ts" />
module project{
	/**
	 * 描画するパーティクルのシェーダークラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class ParticleShader extends nineball.webgl.engine.ShaderObject{
		init(){
			this.vShaderSource=
				"attribute vec3 position0;"
					+"attribute vec3 position1;"
					+"attribute vec3 color;"
					+"varying vec4 vColor;"
					+"uniform mat4 mvpMatrix;"
					+"uniform float pointSize;"
					+"uniform float timeScale;"
					+"uniform float colorScale;"
					+"void main(void){"
					+"	vec3 diff=(vec3(1,1,1)-color)*colorScale;"
					+"	vColor=vec4(color+diff,1);"
					+"	vec3 position=position0+(position1-position0)*timeScale;"
					+"	gl_Position=mvpMatrix*vec4(position,1.0);"
					+"	gl_PointSize=pointSize;"
					+"}";

			this.fShaderSource=
				"precision mediump float;"
					+"varying vec4 vColor;"
					+"void main(void){"
					+"	gl_FragColor=vColor;"
					+"}";


			var uniform:nineball.webgl.engine.UniformObject
			uniform=new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_MATRIX,"mvpMatrix");
			this.uniformList[0]=uniform;

			uniform=new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_VALUE,"pointSize");
			this.uniformList[1]=uniform;

			uniform=new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_VALUE,"timeScale");
			this.uniformList[2]=uniform;

			uniform=new nineball.webgl.engine.UniformObject(nineball.webgl.engine.UniformObject.TYPE_VALUE,"colorScale");
			this.uniformList[3]=uniform;

			var attribute:nineball.webgl.engine.VertexAttributeObject;
			attribute=new nineball.webgl.engine.VertexAttributeObject("position0",3);
			this.attributeList[0]=attribute;

			attribute=new nineball.webgl.engine.VertexAttributeObject("position1",3);
			this.attributeList[1]=attribute;

			attribute=new nineball.webgl.engine.VertexAttributeObject("color",3);
			this.attributeList[2]=attribute;

			this.createProgram();
		}
	}
}