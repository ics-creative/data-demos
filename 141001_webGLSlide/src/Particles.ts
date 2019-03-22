/// <reference path="../libs/glMatrix.d.ts" />
/// <reference path="ImageColorPicker.ts" />
/// <reference path="RenderingObject.ts" />
module project{
	/**
	 * 描画するパーティクルクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class Particles extends nineball.webgl.engine.RenderingObject{
		static RADIUS:number=10;
		static NUM_PARTICLES:number=65535;

		private imageList:any[];
		private currentIndex:number;

		constructor($context:WebGLRenderingContext,$imageList:any[]) {
			this.imageList=$imageList;
			super($context);
		}

		init(){
			this.currentIndex=this.imageList.length*Math.random()>>0;
			var image:any=this.imageList[this.currentIndex];
			//image
			var imageWidth:number = image.width;
			var imageHeight:number = image.height;
			var numPixels:number = imageWidth * imageHeight;
			var rate:number = Math.sqrt(numPixels / Particles.NUM_PARTICLES);
			var posScale:number=60*rate;

			var imageArr=utils.ImageColorPicker.getImageDataArray(image);

			var r:number;
			var g:number;
			var b:number;
			var x0:number;
			var y0:number;
			var z0:number;
			var x1:number;
			var y1:number;
			var z1:number;

			var vPosition0:number[]=[];
			var vPosition1:number[]=[];
			var vColor:number[]=[];
			this.iboData=[];
			for(var i=0;i<Particles.NUM_PARTICLES;i++){
				var p=i;
				//
				//color
				var cIndex=p*3;
				var imageindexX:number=(rate*i % imageWidth)>>0;
				var imageindexY:number=imageHeight-rate*(rate*i / imageWidth>>0)>>0;
				var pixIndex:number=(imageindexX+imageWidth*imageindexY)>>0;

				r=imageArr[pixIndex*4]/255;
				g=imageArr[pixIndex*4+1]/255;
				b=imageArr[pixIndex*4+2]/255;

				vColor[cIndex]=r;
				vColor[cIndex+1]=g;
				vColor[cIndex+2]=b;
				//
				var pIndex=p*3;
				//並べられた位置(状態0)
				x0 = (rate*i % imageWidth) - imageWidth / 2;
				y0 = rate*(rate*i / imageWidth>>0) - imageHeight / 2;
				z0 = 0;
				x0/=posScale;
				y0/=posScale;
				vPosition0[pIndex] = x0;
				vPosition0[pIndex+1] = y0;
				vPosition0[pIndex+2] = z0;
				//ランダムな位置(状態1)
				x1=(-0.5+Math.random())*Particles.RADIUS;;
				y1=(-0.5+Math.random())*Particles.RADIUS;;
				z1=(-0.5+Math.random())*Particles.RADIUS;;
				vPosition1[pIndex] = x1;
				vPosition1[pIndex+1] = y1;
				vPosition1[pIndex+2] = z1;
			}

			var attribute:nineball.webgl.engine.VertexAttributeObject;
			var vbo:WebGLBuffer;

			vbo=this.context.createBuffer();
			this.context.bindBuffer(this.context.ARRAY_BUFFER,vbo);
			this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(vPosition0),this.context.STATIC_DRAW);
			this.vboDataList[0]=vPosition0;
			this.vboList[0]=vbo;

			vbo=this.context.createBuffer();
			this.context.bindBuffer(this.context.ARRAY_BUFFER,vbo);
			this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(vPosition1),this.context.STATIC_DRAW);
			this.vboDataList[1]=vPosition1;
			this.vboList[1]=vbo;

			vbo=this.context.createBuffer();
			this.context.bindBuffer(this.context.ARRAY_BUFFER,vbo);
			this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(vColor),this.context.DYNAMIC_DRAW);
			this.vboDataList[2]=vColor;
			this.vboList[2]=vbo;
		}

		reset(){
			this.currentIndex+=1;
			this.currentIndex%=this.imageList.length;

			var vColor:number[]=this.vboDataList[2];

			var r:number;
			var g:number;
			var b:number;

			var image:any=this.imageList[this.currentIndex];
			var imageWidth:number = image.width;
			var imageHeight:number = image.height;
			var numPixels:number = imageWidth * imageHeight;
			var rate:number = Math.sqrt(numPixels / Particles.NUM_PARTICLES);
			var posScale:number=60*rate;
			var imageArr=utils.ImageColorPicker.getImageDataArray(image);
			for(var i=0;i<Particles.NUM_PARTICLES;i++){
				var p=i;
				//
				//color
				var cIndex=p*3;
				vColor[cIndex]=1;
				vColor[cIndex+1]=1;
				vColor[cIndex+2]=1;

				var imageindexX:number=(rate*i % imageWidth)>>0;
				var imageindexY:number=imageHeight-rate*(rate*i / imageWidth>>0)>>0;
				var pixIndex:number=(imageindexX+imageWidth*imageindexY)>>0;

				r=imageArr[pixIndex*4]/255;
				g=imageArr[pixIndex*4+1]/255;
				b=imageArr[pixIndex*4+2]/255;

				vColor[cIndex]=r;
				vColor[cIndex+1]=g;
				vColor[cIndex+2]=b;
			}
			var vbo:WebGLBuffer=this.vboList[2];
			this.context.bufferData(this.context.ARRAY_BUFFER,new Float32Array(vColor),this.context.DYNAMIC_DRAW);
		}
	}
}