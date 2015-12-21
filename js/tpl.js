
(function(window, undefined) {
	
	require.config({

		baseUrl: '/wap-hd',
		paths: {
			Zepto:'/wap-hd/js/zepto.min',
			hzScroll: '/wap-hd/js/hzScroll'
		},
		shim: {
			Zepto: {exports: 'Zepto'},
			hzScroll: {deps: ['Zepto']}
		}
	});

	require([
		'hzScroll'

	], function(tplRender, coupon) {
		//floor：楼层通用选择器
		$('.page-nav').hzScroll({floor: 'div[id^=render_floor]'});
	});


})(window);



