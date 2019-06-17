"use strict";

;!function ($) {

    function Slideshow() {
        this.wrap = $(".banner-box");
        this.ul = $(".swiper-wrapper ul");
        this.li = $(".swiper-wrapper ul li");
        this.aspan = $(".swiper-pagination span");
        this.aPic = $(".swiper-wrapper ul li img");
        this.left = $(".swiper-button-prev");
        this.right = $(".swiper-button-next ");
        this.num = 0;
        this.timer = null;

        this.parent = $(".m-product-list");
    }

    Slideshow.prototype.init = function () {
        var _this = this;
        $.post("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/getdate.php", function (d) {
            _this.stru(d);
            var $son = _this.parent.children();
            $son.each(function (index, element) {
                $(this).on("click", function () {
                    var id = d[index].ID;
                    //window.open("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/dist/details.html?sid=" + id);
                });
            });
        }, "json");

        //改变布局
        var $first = this.li.first().clone(true, true);
        var $last = this.li.last().clone(true, true);
        this.ul.append($first);
        this.ul.prepend($last);
        // console.log(this.li.length)//        8   这是没有改变布局时的li的长度
        // console.log($('.pic li').length)//   10  这是改变布局后的li的长度

        this.liwidth = this.li.eq(0).width();
        this.ul.width($('.swiper-wrapper ul li').length * this.liwidth).css({ left: -this.liwidth });

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
        });

        //自动轮播
        this.timer = setInterval(function () {
            _this.rightclick();
        }, 3000);
    };

    //渲染结构
    Slideshow.prototype.stru = function (d) {
        var _this = this;
        $(d).each(function (index, element) {
            console.log(element.ID);
            //渲染结构
            if (index == 0 || index % 4 == 0) {
                _this.parent.append($("\n                    \n                    <div class=\"m-goods-item-container first pro-item-category\">\n                        <a href=\"details.html?sid=" + element.ID + "\">\n                            <div class=\"category-img-container\">\n                                <div class=\"product-img\">\n                                    <div class=\"m-product-image-container undefined\" style=\"width: 264px; height: 198px;\">\n                                        <div class=\"img-container\" style=\"padding: 45px 70px 28px; width: 124px; height: 125px;\">\n                                            <img  width=\"125\" height=\"125\" data-original=\"" + element.url + "\" class=\"lazy\"\n                                            alt=\"" + element.name + "\" style=\"height: 125px; width: 125px; margin-left: -0.5px;\">\n                                        </div>\n                                    </div>\n                                </div>\n                                <p class=\"pro-desc\">" + element.intro + "</p>\n                            </div>\n                            <div class=\"category-box\">\n                            <div class=\"m-goods-common-tag-con\"><span class=\"common-tag common-tag-text\"\n                                    style=\"background-color: rgb(217, 107, 108);\">\u7279\u60E0</span><span\n                                    class=\"common-tag common-tag-text\"\n                                    style=\"background-color: rgb(217, 107, 108);\">\u6EE1\u51CF</span></div>\n                                <p class=\"pro-info\" title=\"" + element.name + "\uFF09\">" + element.name + "</p>\n                                <p class=\"pro-price\"><span class=\"pro-unit\">\xA5</span><span class=\"m-num\">" + element.price + "</span><span\n                                    class=\"pro-flag\">\u8D77</span></p>\n                            </div>\n                        <a>\n                    </div>\n                "));
            } else {
                _this.parent.append($("\n                \n                <div class=\"m-goods-item-container  pro-item-category\">\n                    <a href=\"details.html?sid=" + element.ID + "\">\n                        <div class=\"category-img-container\">\n                            <div class=\"product-img\">\n                                <div class=\"m-product-image-container undefined\" style=\"width: 264px; height: 198px;\">\n                                    <div class=\"img-container\" style=\"padding: 45px 70px 28px; width: 124px; height: 125px;\">\n                                        <img width=\"125\" height=\"125\" data-original=\"" + element.url + "\" class=\"lazy\"\n                                        alt=\"" + element.name + "\" style=\"height: 125px; width: 125px; margin-left: -0.5px;\">\n                                    </div>\n                                </div>\n                            </div>\n                            <p class=\"pro-desc\">" + element.intro + "</p>\n                        </div>\n                        <div class=\"category-box\">\n                        <div class=\"m-goods-common-tag-con\"><span class=\"common-tag common-tag-text\"\n                                style=\"background-color: rgb(217, 107, 108);\">\u7279\u60E0</span><span\n                                class=\"common-tag common-tag-text\"\n                                style=\"background-color: rgb(217, 107, 108);\">\u6EE1\u51CF</span></div>\n                            <p class=\"pro-info\" title=\"\u8D1D\u533B\u751F\u7259\u5237\uFF08\u9752\u6625\u7248\uFF09\">" + element.name + "</p>\n                            <p class=\"pro-price\"><span class=\"pro-unit\">\xA5</span><span class=\"m-num\">" + element.price + "</span><span\n                                class=\"pro-flag\">\u8D77</span></p>\n                        </div>\n                    <a>\n                </div>\n                \n            "));
            }

            //懒加载
            $(function () {
                //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });
        });
    };

    //ul运动
    Slideshow.prototype.tabswitch = function () {
        var _this = this;
        this.ul.stop(true, true).animate({
            left: -(this.num + 1) * this.liwidth
        }, function () {
            //回调函数，前面的运动结束之后执行
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
            _this.rightclick();
        }, 3000);
    };

    //箭头的点击
    Slideshow.prototype.leftclick = function () {
        this.num--; //jquery里index支持负数。当index()=-1时就是最后一个
        this.aspan.eq(this.num).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
        this.tabswitch();
    };
    Slideshow.prototype.rightclick = function () {
        this.num++;
        if (this.num == this.aspan.length) {
            this.aspan.eq(0).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
        } else {
            this.aspan.eq(this.num).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
        }
        this.tabswitch();
    };

    new Slideshow().init();
}(jQuery);