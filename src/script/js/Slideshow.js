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

        this.parent = $(".m-product-list");
    }

    Slideshow.prototype.init = function () {
        var _this = this;
        $.post(
            "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/getdate.php",
            function (d) {
                _this.stru(d);
                let $son = _this.parent.children();
                $son.each(function (index, element) {
                    $(this).on("click", function () {
                        var id = d[index].ID;
                        //window.open("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/dist/details.html?sid=" + id);

                    })
                })
            },
            "json",
        );

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

        })

        //自动轮播
        this.timer = setInterval(function () {
            _this.rightclick()
        }, 3000);

    }

    //渲染结构
    Slideshow.prototype.stru =function(d){
        let _this = this;
        $(d).each(function (index, element) {
            console.log(element.ID)
            //渲染结构
            if (index == 0 || index % 4 == 0) {
                _this.parent.append($(`
                    
                    <div class="m-goods-item-container first pro-item-category">
                        <a href="details.html?sid=${element.ID}">
                            <div class="category-img-container">
                                <div class="product-img">
                                    <div class="m-product-image-container undefined" style="width: 264px; height: 198px;">
                                        <div class="img-container" style="padding: 45px 70px 28px; width: 124px; height: 125px;">
                                            <img  width="125" height="125" data-original="${element.url}" class="lazy"
                                            alt="${element.name}" style="height: 125px; width: 125px; margin-left: -0.5px;">
                                        </div>
                                    </div>
                                </div>
                                <p class="pro-desc">${element.intro}</p>
                            </div>
                            <div class="category-box">
                            <div class="m-goods-common-tag-con"><span class="common-tag common-tag-text"
                                    style="background-color: rgb(217, 107, 108);">特惠</span><span
                                    class="common-tag common-tag-text"
                                    style="background-color: rgb(217, 107, 108);">满减</span></div>
                                <p class="pro-info" title="${element.name}）">${element.name}</p>
                                <p class="pro-price"><span class="pro-unit">¥</span><span class="m-num">${element.price}</span><span
                                    class="pro-flag">起</span></p>
                            </div>
                        <a>
                    </div>
                `))
            } else {
                _this.parent.append($(`
                
                <div class="m-goods-item-container  pro-item-category">
                    <a href="details.html?sid=${element.ID}">
                        <div class="category-img-container">
                            <div class="product-img">
                                <div class="m-product-image-container undefined" style="width: 264px; height: 198px;">
                                    <div class="img-container" style="padding: 45px 70px 28px; width: 124px; height: 125px;">
                                        <img width="125" height="125" data-original="${element.url}" class="lazy"
                                        alt="${element.name}" style="height: 125px; width: 125px; margin-left: -0.5px;">
                                    </div>
                                </div>
                            </div>
                            <p class="pro-desc">${element.intro}</p>
                        </div>
                        <div class="category-box">
                        <div class="m-goods-common-tag-con"><span class="common-tag common-tag-text"
                                style="background-color: rgb(217, 107, 108);">特惠</span><span
                                class="common-tag common-tag-text"
                                style="background-color: rgb(217, 107, 108);">满减</span></div>
                            <p class="pro-info" title="贝医生牙刷（青春版）">${element.name}</p>
                            <p class="pro-price"><span class="pro-unit">¥</span><span class="m-num">${element.price}</span><span
                                class="pro-flag">起</span></p>
                        </div>
                    <a>
                </div>
                
            `))
            }

            //懒加载
            $(function () {//和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn"//图片显示方式
                });
            });
        })
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