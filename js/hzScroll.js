/**
 * Created by zhuziliu on 2015/12/18.
 * 功能：
 * 窗口滚动，横向滚动条按一定的规律自动滚动
 */
;var jQuery = window.jQuery || window.Zepto;
(function($,window,document,undefined){
    //插件构造函数
    var HzScroll = function(ele, opt){
        this.$ele = $(ele);
        this.defaults = {
            //maxSize: 20
        };
        this.options = $.extend({}, this.defaults, opt);
        this.$floors = $(this.options.floor);
    }
    // //定义相关方法
    HzScroll.prototype = {
        //初始化相关数据
        init: function(){
            var that = this;
            //2.获得每一个导航条的宽度
            that.$barLis = that.$ele.find('li');
            that.barNum = that.$ele.find('li').length;   //导航条的个数与楼层的个数相同
            //that.oneBarWidth = parseInt(that.$ele.find('li').width());

            //3.每个楼层的offsetTop值，放入数组
            that.floorsTop = [];
            that.floorsHeight = [];
            that.$floors.each(function(value, index){
                var $this = $(this);
                that.floorsTop.push(parseInt($this.offset().top));
                that.floorsHeight.push(parseInt($this.height()));
            });
            //初始滚动距离
            that.scrollTop = 0;
            //初始楼层
            that.floorIndex = 0;
            return this.$ele;
        },
        pageNavInit: function(){
            var that = this;
            if(that.barNum == 0){
                that.$ele.css('height', 0);
            }else{
                that.oneBarWidth = parseInt(that.$ele.width()/4.5);
                that.$barLis.width(that.oneBarWidth);
                that.$barLis.first().addClass('floor-active').addClass('temp-active');
                that.$ele.on('click', 'li', function(e){
                    var $this = $(this);
                    var range = 40;
                    var href = $this.find('a').attr("href");
                    var pos = $(href).offset().top;

                    if($this.hasClass('temp-active')){
                        range = 80;
                        if(that.$barLis.first().hasClass('temp-active')){
                            range = $(href).offset().top;
                        }
                    }else{
                        $('.temp-active').removeClass('temp-active');
                        $this.addClass('temp-active');

                        if(that.$barLis.first().hasClass('temp-active')){
                            range = $(href).offset().top;
                        }
                    }

                    document.querySelector('body').scrollTop = pos -range;

                    //禁用滚动事件
                    return false;
                });

            }
        },
        //导航滚动判断是否置顶
        isFixed: function(){
            var that = this;
            var navOffsetTop = that.$ele.offset().top;
            //导航点位部分
            var navPos = $('.page-nav-pos');
            $(window).on('scroll', function(){
                var scrollTop = $('body').scrollTop();
                if(scrollTop >= navOffsetTop){
                    that.$ele.addClass('page-nav-fixed').css('height', '50px');
                    navPos.show();
                }else{
                    that.$ele.removeClass('page-nav-fixed').css('height', '40px');
                    navPos.hide();
                }

            });
        },
        throttle: function(fn, delay, mustRunDelay) {

            var timer = null;
            var t_start;
            return function() {
                var context = this,
                    args = arguments;
                    t_curr = +new Date();
                //console.log(this.scroll);
                clearTimeout(timer);
                if (!t_start) {
                    t_start = t_curr;
                }
                if (t_curr - t_start >= mustRunDelay) {
                    fn.apply(context, args);
                    t_start = t_curr;
                } else {
                    timer = setTimeout(function() {
                        fn.apply(context, args);
                    }, delay);
                }
            };
        },
        scrollInit: function(){
            //console.log('跟着滚动');
            var that = this.scroll;    //原构造函数中的this
            var $floors = this.scroll.$floor;
            //1.获得页面的向上滚动的距离
            var scrollTop = $(window).scrollTop();

            //2.页面滚动距离是根据条件，根据页面滚动距离，判断楼层在可视区的位置
            that.$floors.each(function(index, value){

                if(scrollTop > (that.floorsTop[index-1] + that.floorsHeight[index-1] - 50) && index != 0){
                    that.floorIndex = index;
                }

            });
            if(scrollTop < that.floorsTop[1]-40){
                that.floorIndex = 0;
            }
            if(!$(that.$barLis[that.floorIndex]).hasClass('floor-active')){
                $('.floor-active').removeClass('floor-active');
                $(that.$barLis[that.floorIndex]).addClass('floor-active');
                //滚动条向左滚动
                $(this.scroll.$ele).scrollLeft(that.oneBarWidth * that.floorIndex);
            }

        },
        scroll: function(){
            var that = this;
            that.init();
            that.pageNavInit();
            that.isFixed();
            console.log('执行了');
            //事件截流，延迟500秒执行
            $(window).on('scroll', that.throttle(that.scrollInit, 500).bind({scroll: that}));

            return that.$ele;
        }
    }

    //
    $.fn.hzScroll = function(options){
        var hzScroll = new HzScroll(this, options);
        return hzScroll.scroll();
    }

})(jQuery,window,document);

