module utils{
	/**
	 * 画像からピクセルカラー値を取得するユーティリティクラスです。
	 * @auther Kentaro Kawakatsu
	 */
	export class ImageColorPicker{
		static canvas2d:HTMLCanvasElement;
		static context2d :CanvasRenderingContext2D;

		static init($canvas:HTMLCanvasElement){
			ImageColorPicker.canvas2d=$canvas;
			ImageColorPicker.context2d = ImageColorPicker.canvas2d.getContext('2d');
		}

		static getImageDataArray(image):any{
			ImageColorPicker.canvas2d.width=image.width;
			ImageColorPicker.canvas2d.height=image.height;
			ImageColorPicker.context2d.drawImage(image, 0, 0);
			return ImageColorPicker.context2d.getImageData(0, 0, image.width,image.height).data;
		}

		constructor(){

		}
	}
}