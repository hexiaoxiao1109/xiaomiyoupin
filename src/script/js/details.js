

//class
; (function ($) {

    class Magnifier {
        constructor() {
            this.spic = null;
            this.sf = null;
            this.bf = null;
            this.bpic = null;
            this.div = null;
            this.ul = null;
            this.ali = null;
            this.up = null;
            this.down = null;
            this.l = null;
            this.t = null;
            this.imgurl = null;
            this.num = 4;
            this.right = $(".sku-container");
            this.car = $(".m-icons-cart-hover ")

            this.salenum = 1;
            this.input = $(".count-input")
            this.reduce = ($(".m-icons-reduce"));
            this.add = $(".m-icons-add-active");
            this.addToCar = $(".m-btn-brown");
            this.toast = $(".m-toast");
        }
        init() {
            // console.log(this.input.val())

            var _this = this;

            //获取地址栏上的sid值
            var str = location.search;
            var id = str.split("=")[1];

            //渲染结构
            $.get(
                "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/post.php",
                { sid: id },
                function (d) {

                    console.log(_this.salenum)
                    $(".banner").append($(`
                        <div class="main fl spic">
                            <img src="${d.url}">
                            <div class="sf" style="visibility:hidden"></div>
                        </div>
                        <div class="thumb fr" style="display: block;">
                            <div class="thumb-container" style="top: 0px;">
                                <div class="thumb-pic" style="border-color: rgb(132, 95, 63);">
                                    <img src="${d.url}">
                                </div>
                                <div class="thumb-pic" style="border-color: rgb(236, 236, 236);">
                                    <img src="${d.url}">
                                </div>
                                <div class="thumb-pic" style="border-color: rgb(236, 236, 236);">
                                    <img src="${d.url}">
                                </div>
                                <div class="thumb-pic" style="border-color: rgb(236, 236, 236);">
                                    <img src="${d.url}">
                                </div>
                                <div class="thumb-pic" style="border-color: rgb(236, 236, 236);">
                                    <img src="${d.url}">
                                </div>
                                <div class="thumb-pic" style="border-color: rgb(236, 236, 236);">
                                    <img src="${d.url}">
                                </div>
                            </div>
                            <div class="thumb-arrow-up hidden"><a class="m-icons m-icons-up-active " data-src="" href="javascript:;"></a></div>
                            <div class="thumb-arrow-down hidden"><a class="m-icons m-icons-down-active " data-src="" href="javascript:;"></a></div>
                        </div>
                    
                        <div class="bf" style="visibility:hidden;background:#fff" >
                            <img src="${d.url}">
                        </div>
                    `))


                    _this.right.prepend($(`
                        <div class="name clearfix">
                            <div class="good-name fl">${d.name}</div>
                        </div>
                        <div class="summary">
                            ${d.intro}
                        </div>
                        <div class="card">
                            <!-- 价格 -->
                            <div class="price-line">
                                <h5 class="sku-title">售价</h5>
                                <div class="price">
                                    <span class="money-symbol">¥</span>
                                    <span class="value">${d.price}</span>
                                    <span class="market-price">¥${d.original_price}</span>
                                </div>
                            </div>
                            <div class="service-line">
                                <h5 class="sku-title">服务</h5>
                                <div class="introduce-container">
                                    <p class="icon">!</p>
                                </div>
                                <div class="service">
                                    <div class="service-item"><a class="m-icons m-icons-service "
                                            href="javascript:;"></a><span class="service-item-text">满99包邮</span></div>
                                    <div class="service-item"><a class="m-icons m-icons-service "
                                            href="javascript:;"></a><span class="service-item-text">有品三方</span></div>
                                    <div class="service-item"><a class="m-icons m-icons-service "
                                            href="javascript:;"></a><span class="service-item-text">7天无理由</span></div>
                                    <div class="service-item">
                                        <a class="m-icons m-icons-service " href="javascript:;"></a>
                                        <span class="service-item-text">由有品配送发货</span>
                                        <span class="service-item-qualification">(查看商家资质)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="address-line">
                            <h5 class="sku-title">配送区域</h5>
                            <div class="address">
                                <div>
                                    <span>北京 北京市 海淀区</span>
                                    <span>&nbsp;有货</span>
                                    <a>修改</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style="overflow: hidden; padding: 0px 0px 12px;">
                                <div class="size-line clearfix">
                                    <h5 class="sku-title"> 颜色 </h5>
                                    <div class="size-container">
                                        <div class="tag-item-onSelected">米白</div>
                                        <div class="tag-item-onSaled">浅灰</div>
                                        <div class="tag-item-onSaled">浅绿</div>
                                        <div class="tag-item-onSaled">浅粉</div>
                                        <div class="tag-item-onSaled">暗黑</div>
                                    </div>
                                </div>
                                <!-- 尺码 -->
                                <div class="size-line clearfix">
                                    <h5 class="sku-title"> 尺码 </h5>
                                    <div class="size-container">
                                        <div class="tag-item-onSelected">XS</div>
                                        <div class="tag-item-onSaled">S</div>
                                        <div class="tag-item-onSaled">M</div>
                                        <div class="tag-item-onSaled">L</div>
                                        <div class="tag-item-onSaled">XL</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    
                    `));

                    //重新获取目标元素
                    _this.spic = $(".spic");
                    _this.sf = $(".spic .sf");
                    _this.bf = $(".bf");
                    _this.bpic = $(".bf img");
                    _this.div = $(".thumb");
                    _this.ul = $(".thumb-container");
                    _this.ali = $(".thumb-container .thumb-pic");
                    _this.up = $(".thumb-arrow-up");
                    _this.down = $(".thumb-arrow-down");
                    
                    
                    //数量加减
                    
                    _this.reduce.on("click", function () {
                        _this.salenum--;
                        _this.input.val(_this.salenum);
                        if(_this.input.val()<2){
                            _this.reduce.parent().removeClass("minus-btn-active").addClass("minus-btn");
                            _this.reduce.removeClass("m-icons-reduce-active").addClass("m-icons-reduce");
                            _this.salenum=2;

                        };
                        if(_this.input.val()<5){
                            _this.add.parent().removeClass("minus-btn").addClass("minus-btn-active");
                            _this.add.removeClass("m-icons-add").addClass("m-icons-add-active");
                        }
                    });
                    _this.add.on("click", function () {
                        _this.salenum++;
                        _this.input.val(_this.salenum);
                        if(_this.input.val()>1){
                            _this.reduce.parent().removeClass("minus-btn").addClass("minus-btn-active");
                            _this.reduce.removeClass("m-icons-reduce").addClass("m-icons-reduce-active");
                        };
                        if(_this.input.val()==5){
                            _this.add.parent().removeClass("minus-btn-active").addClass("minus-btn");
                            _this.add.removeClass("m-icons-add-active").addClass("m-icons-add");
                            _this.salenum=4;
                        }
                    });

                    _this.addToCar.on("click",function(){


                        $(`<span class="m-cart-news">   ${_this.input.val()}</span>`).appendTo(_this.car)

                    });

                    
                    
                    

                    

                    







                    //鼠标划过小图片
                    _this.spic.hover(function () {

                        //小放大镜出现之后求其大小
                        _this.appear();
                        _this.sfsize();

                        //让小放大镜移动并限定其移动范围
                        $(this).on('mousemove', function (ev) {
                            _this.sfmove(ev);
                            _this.bpicmove(ev)
                        })
                    }, function () {
                        _this.disappear();
                    });

                    //上下箭头的出现和消失
                    _this.div.hover(function () {
                        _this.up.removeClass("hidden");
                        _this.down.removeClass("hidden");
                    }, function () {
                        _this.up.addClass("hidden");
                        _this.down.addClass("hidden");
                    })
                    //鼠标划过图片列表,小图片和大图片更换地址
                    _this.ali.hover(function () {
                        $(this).css('border-color', ' rgb(132, 95, 63)').siblings().css('border-color', 'rgb(236, 236, 236)')
                        _this.imgurl = $(this).find("img").attr("src");
                        _this.spic.find("img").attr("src", _this.imgurl);
                        _this.bpic.attr("src", _this.imgurl);
                    })
                    //图片列表的左右箭头点击事件
                    _this.down.on("click", function () {
                        _this.downarrow()
                    });
                    _this.up.on("click", function () {
                        _this.uparrow()
                    })

                },
                "json",
            )

        }






        //右面图片列表的上下箭头的点击事件
        //这里的95是一个div的高度+边框+margin值(this.ali.eq(0).outerHeight(true))    4是div里可视的图片个数
        //由于一直获取不到正确的值，所以用95替代
        downarrow() {
            if (this.num < this.ali.length) {
                this.num++;
            }
            this.ul.stop(true, true).animate({
                top: -95 * (this.num - 4),
            })

        }
        uparrow() {
            if (this.num > 4) {
                this.num--;
            }
            this.ul.stop(true, true).animate({
                top: -95 * (this.num - 4),
            })
        }

        //小放大镜和大放大镜的出现与消失
        appear() {
            this.sf.css('visibility', 'visible');
            this.bf.css('visibility', 'visible');
            // this.right.css('display', 'none');

        }
        disappear() {
            this.sf.css('visibility', 'hidden');
            this.bf.css('visibility', 'hidden');
            // this.right.css('display', 'block');
        }

        //求小放大镜的大小   this.sf/this.spic=this.bf/this.bpic
        sfsize() {
            this.sf.css({
                "width": this.bf.width() / this.bpic.width() * this.spic.width(),
                "height": this.bf.height() / this.bpic.height() * this.spic.height()
            })
        }

        //小放大镜的移动
        sfmove(ev) {

            this.l = ev.pageX - this.spic.offset().left - this.sf.width() / 2;
            this.t = ev.pageY - this.spic.offset().top - this.sf.height() / 2;

            //限定范围
            if (this.l <= 0) {
                this.l = 0
            } else if (this.l >= this.spic.width() - this.sf.width()) {
                this.l = this.spic.width() - this.sf.width();
            }
            if (this.t <= 0) {
                this.t = 0
            } else if (this.t >= this.spic.height() - this.sf.height()) {
                this.t = this.spic.height() - this.sf.height();
            }

            this.sf.css({
                left: this.l,
                top: this.t
            })
        }

        //求出小放大镜在小图里移动比例，然后算出大放大镜里的大图的移动距离  ratio:比例
        bpicmove(ev) {
            var ratioX = this.l / (this.spic.width() - this.sf.width());
            var ratioY = this.t / (this.spic.width() - this.sf.width());
            this.bpic.css({
                left: (this.bf.width() - this.bpic.width()) * ratioX,
                top: (this.bf.height() - this.bpic.height()) * ratioY
            })
        }


    }

    new Magnifier().init()

})(jQuery);

