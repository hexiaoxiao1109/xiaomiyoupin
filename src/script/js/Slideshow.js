; !function ($) {

    function Slideshow() {
        this.wrap = $(".banner-box");
        this.ul = $(".swiper-wrapper ul");
        this.li = $(".swiper-wrapper ul li")
        this.aspan = $(".swiper-pagination span");
        this.aPic = $(".swiper-wrapper ul li img");
        this.left = $(".swiper-button-prev");
        this.right = $(".swiper-button-next ");
        this.num = 0;
        this.timer = null;
    }

    Slideshow.prototype.init = function () {
        var _this = this;

        //改变布局
        var $first = this.li.first().clone(true, true);
        var $last = this.li.last().clone(true, true);
        this.ul.append($first);
        this.ul.prepend($last);
        // console.log(this.li.length)//        8   这是没有改变布局时的li的长度
        // console.log($('.pic li').length)//   10  这是改变布局后的li的长度

        this.liwidth = this.li.eq(0).width();
        this.ul.width($('.swiper-wrapper ul li').length * this.liwidth).css({ left: -this.liwidth });

        // console.log(this.wrap)


        
      

        //左右箭头的点击
        this.left.on("click", function () {
            _this.leftclick();
        });
        this.right.on("click", function () {
            _this.rightclick();
        });

        // 点击下面的小圆
        this.aspan.on('click', function () {
            _this.num = $(this).index();
            _this.aspan.eq(_this.num).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
            _this.tabswitch();

        })

        //自动轮播
        this.timer = setInterval(function () {
            _this.rightclick()
        }, 3000);

    }

    //ul运动
    Slideshow.prototype.tabswitch = function () {
        var _this = this;
        this.ul.stop(true, true).animate({
            left: -(this.num + 1) * this.liwidth,
        }, function () {//回调函数，前面的运动结束之后执行
            //判断ul是否要重新定位
            if (_this.num == _this.aspan.length) {
                _this.ul.css({ "left": -_this.liwidth });
                _this.num = 0;
            }
            if (_this.num == -1) {
                _this.ul.css({ "left": -_this.liwidth * _this.aspan.length });
                _this.num = _this.aspan.length - 1;
            }
        });
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            _this.rightclick()
        }, 3000);
    }

    //箭头的点击
    Slideshow.prototype.leftclick = function () {
        this.num--;//jquery里index支持负数。当index()=-1时就是最后一个
        this.aspan.eq(this.num).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
        this.tabswitch();
    }
    Slideshow.prototype.rightclick = function () {
        this.num++;
        if (this.num == this.aspan.length) {
            this.aspan.eq(0).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
        } else {
            this.aspan.eq(this.num).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
        }
        this.tabswitch();
    }

    new Slideshow().init();

}(jQuery)