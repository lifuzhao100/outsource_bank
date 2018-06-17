import VConsole from 'vconsole';
window.vConsole = new VConsole();
import axios from 'axios';
axios.get('/api/v1/current_location')
.then(res => {
	const { appId, timestamp, nonceStr, signature } = res.data;
	wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appId, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature,// 必填，签名
		jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
	});
	wx.ready(function(){
		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				var speed = res.speed; // 速度，以米/每秒计
				var accuracy = res.accuracy; // 位置精度
				alert(latitude + ' ' + longitude);
			}
		});
	})
})
.catch(res => {
	alert(res);
});