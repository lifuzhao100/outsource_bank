import store from "../stores/index_config";

let toBase64 = src => {
	return new Promise(resolve => {
		let canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = () => {
			context.drawImage(img, 0, 0);
			let dataURL = canvas.toDataURL('image/png');
			resolve(dataURL);
			canvas = null;
		};
		img.src = src;
	});
};
export default toBase64;