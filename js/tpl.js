
(function(window, undefined) {
	
	require.config({

		baseUrl: '/horizontal-scrolling',
		paths: {
			Zepto:'./js/zepto.min',
			hzScroll: './js/hzScroll'
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



