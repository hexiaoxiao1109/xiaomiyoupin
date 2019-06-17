"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//class
;(function ($) {
    var Magnifier = function () {
        function Magnifier() {
            _classCallCheck(this, Magnifier);

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
            this.car = $(".m-icons-cart-hover ");

            this.salenum = 1;
            this.input = $(".count-input");
            this.reduce = $(".m-icons-reduce");
            this.add = $(".m-icons-add-active");
            this.addToCar = $(".m-btn-brown");
            this.toast = $(".m-toast");

            this.arrsid = [];
            this.arrnum = [];
        }

        _createClass(Magnifier, [{
            key: "init",
            value: function init() {
                // console.log(this.input.val())

                var _this = this;

                //获取地址栏上的sid值
                var str = location.search;
                var id = str.split("=")[1];

                //渲染结构
                $.get("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/post.php", { sid: id }, function (d) {
                    $(".banner").append($("\n                        <div class=\"main fl spic\">\n                            <img src=\"" + d.url + "\">\n                            <div class=\"sf\" style=\"visibility:hidden\"></div>\n                        </div>\n                        <div class=\"thumb fr\" style=\"display: block;\">\n                            <div class=\"thumb-container\" style=\"top: 0px;\">\n                                <div class=\"thumb-pic\" style=\"border-color: rgb(132, 95, 63);\">\n                                    <img src=\"" + d.url + "\">\n                                </div>\n                                <div class=\"thumb-pic\" style=\"border-color: rgb(236, 236, 236);\">\n                                    <img src=\"" + d.url + "\">\n                                </div>\n                                <div class=\"thumb-pic\" style=\"border-color: rgb(236, 236, 236);\">\n                                    <img src=\"" + d.url + "\">\n                                </div>\n                                <div class=\"thumb-pic\" style=\"border-color: rgb(236, 236, 236);\">\n                                    <img src=\"" + d.url + "\">\n                                </div>\n                                <div class=\"thumb-pic\" style=\"border-color: rgb(236, 236, 236);\">\n                                    <img src=\"" + d.url + "\">\n                                </div>\n                                <div class=\"thumb-pic\" style=\"border-color: rgb(236, 236, 236);\">\n                                    <img src=\"" + d.url + "\">\n                                </div>\n                            </div>\n                            <div class=\"thumb-arrow-up hidden\"><a class=\"m-icons m-icons-up-active \" data-src=\"\" href=\"javascript:;\"></a></div>\n                            <div class=\"thumb-arrow-down hidden\"><a class=\"m-icons m-icons-down-active \" data-src=\"\" href=\"javascript:;\"></a></div>\n                        </div>\n                    \n                        <div class=\"bf\" style=\"visibility:hidden;background:#fff\" >\n                            <img src=\"" + d.url + "\">\n                        </div>\n                    "));

                    _this.right.prepend($("\n                        <div class=\"name clearfix\">\n                            <div class=\"good-name fl\">" + d.name + "</div>\n                        </div>\n                        <div class=\"summary\">\n                            " + d.intro + "\n                        </div>\n                        <div class=\"card\">\n                            <!-- \u4EF7\u683C -->\n                            <div class=\"price-line\">\n                                <h5 class=\"sku-title\">\u552E\u4EF7</h5>\n                                <div class=\"price\">\n                                    <span class=\"money-symbol\">\xA5</span>\n                                    <span class=\"value\">" + d.price + "</span>\n                                    <span class=\"market-price\">\xA5" + d.original_price + "</span>\n                                </div>\n                            </div>\n                            <div class=\"service-line\">\n                                <h5 class=\"sku-title\">\u670D\u52A1</h5>\n                                <div class=\"introduce-container\">\n                                    <p class=\"icon\">!</p>\n                                </div>\n                                <div class=\"service\">\n                                    <div class=\"service-item\"><a class=\"m-icons m-icons-service \"\n                                            href=\"javascript:;\"></a><span class=\"service-item-text\">\u6EE199\u5305\u90AE</span></div>\n                                    <div class=\"service-item\"><a class=\"m-icons m-icons-service \"\n                                            href=\"javascript:;\"></a><span class=\"service-item-text\">\u6709\u54C1\u4E09\u65B9</span></div>\n                                    <div class=\"service-item\"><a class=\"m-icons m-icons-service \"\n                                            href=\"javascript:;\"></a><span class=\"service-item-text\">7\u5929\u65E0\u7406\u7531</span></div>\n                                    <div class=\"service-item\">\n                                        <a class=\"m-icons m-icons-service \" href=\"javascript:;\"></a>\n                                        <span class=\"service-item-text\">\u7531\u6709\u54C1\u914D\u9001\u53D1\u8D27</span>\n                                        <span class=\"service-item-qualification\">(\u67E5\u770B\u5546\u5BB6\u8D44\u8D28)</span>\n                                    </div>\n                                </div>\u8DE8\u57DF\n                            </div>\n                        </div>\n\n                        <div class=\"address-line\">\n                            <h5 class=\"sku-title\">\u914D\u9001\u533A\u57DF</h5>\n                            <div class=\"address\">\n                                <div>\n                                    <span>\u5317\u4EAC \u5317\u4EAC\u5E02 \u6D77\u6DC0\u533A</span>\n                                    <span>&nbsp;\u6709\u8D27</span>\n                                    <a>\u4FEE\u6539</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div>\n                            <div style=\"overflow: hidden; padding: 0px 0px 12px;\">\n                                <div class=\"size-line clearfix\">\n                                    <h5 class=\"sku-title\"> \u989C\u8272 </h5>\n                                    <div class=\"size-container\">\n                                        <div class=\"tag-item-onSelected\">\u7C73\u767D</div>\n                                        <div class=\"tag-item-onSaled\">\u6D45\u7070</div>\n                                        <div class=\"tag-item-onSaled\">\u6D45\u7EFF</div>\n                                        <div class=\"tag-item-onSaled\">\u6D45\u7C89</div>\n                                        <div class=\"tag-item-onSaled\">\u6697\u9ED1</div>\n                                    </div>\n                                </div>\n                                <!-- \u5C3A\u7801 -->\n                                <div class=\"size-line clearfix\">\n                                    <h5 class=\"sku-title\"> \u5C3A\u7801 </h5>\n                                    <div class=\"size-container\">\n                                        <div class=\"tag-item-onSelected\">XS</div>\n                                        <div class=\"tag-item-onSaled\">S</div>\n                                        <div class=\"tag-item-onSaled\">M</div>\n                                        <div class=\"tag-item-onSaled\">L</div>\n                                        <div class=\"tag-item-onSaled\">XL</div>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                        </div>\n                    "));

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
                    //减
                    _this.reduce.on("click", function () {
                        _this.salenum--;
                        _this.input.val(_this.salenum);
                        // 限定数量
                        if (_this.input.val() < 2) {
                            _this.reduce.parent().removeClass("minus-btn-active").addClass("minus-btn");
                            _this.reduce.removeClass("m-icons-reduce-active").addClass("m-icons-reduce");
                            _this.salenum = 2;
                        };
                        if (_this.input.val() < 5) {
                            _this.add.parent().removeClass("minus-btn").addClass("minus-btn-active");
                            _this.add.removeClass("m-icons-add").addClass("m-icons-add-active");
                        }
                    });
                    //加
                    _this.add.on("click", function () {
                        _this.salenum++;
                        _this.input.val(_this.salenum);
                        // 限定数量
                        if (_this.input.val() > 1) {
                            _this.reduce.parent().removeClass("minus-btn").addClass("minus-btn-active");
                            _this.reduce.removeClass("m-icons-reduce").addClass("m-icons-reduce-active");
                        };
                        if (_this.input.val() == 5) {
                            _this.add.parent().removeClass("minus-btn-active").addClass("minus-btn");
                            _this.add.removeClass("m-icons-add-active").addClass("m-icons-add");
                            _this.salenum = 4;
                        }
                    });

                    // 添加到购物车按钮
                    _this.addToCar.on("click", function () {

                        function cookietoarray() {
                            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                                //判断商品是第一次存还是多次存储
                                _this.arrsid = $.cookie('cookiesid').split(','); //cookie商品的sid
                                _this.arrnum = $.cookie('cookienum').split(','); //cookie商品的num
                            }
                        }

                        //判断当前的商品sid是否存在购物车(cookie)
                        //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较
                        //获取当前的按钮对应的商品的sid
                        var $sid = location.search.substring(1).split('=')[1];
                        cookietoarray(); //获取已经存在的cookie值。

                        //判断当前的商品的sid是否存在cookie中。
                        if ($.inArray($sid, _this.arrsid) != -1) {
                            //存在    
                            //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
                            var num = parseInt(_this.arrnum[$.inArray($sid, _this.arrsid)]) + parseInt(_this.input.val());
                            _this.arrnum[$.inArray($sid, _this.arrsid)] = num;
                            $.cookie('cookienum', _this.arrnum.toString(), { expires: 7 }); //数组存入cookie
                        } else {
                            //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
                            _this.arrsid.push($sid); //将当前的id存入数组
                            $.cookie('cookiesid', _this.arrsid.toString(), { expires: 7 }); //数组存入cookie
                            _this.arrnum.push(_this.input.val());
                            $.cookie('cookienum', _this.arrnum.toString(), { expires: 7 }); //数组存入cookie
                        }

                        // 算出cookie里的数量数组的总数
                        var allnum = $.cookie("cookienum").split(",");
                        for (var i = 0; i < allnum.length; i++) {
                            var cartnum = 0;
                            cartnum += Number(allnum[i]);
                        }

                        // 添加成功
                        $("<div class=\"m-alert m-alert-success\">\u52A0\u5165\u8D2D\u7269\u8F66\u6210\u529F</div>").appendTo(_this.toast);
                        $("<span class=\"m-cart-news\">   " + cartnum + "</span>").appendTo(_this.car);
                        // 删除 添加成功弹出框
                        setTimeout(function () {
                            _this.toast.remove("div");
                        }, 2000);
                    });

                    //鼠标划过小图片
                    _this.spic.hover(function () {

                        //小放大镜出现之后求其大小
                        _this.appear();
                        _this.sfsize();

                        //让小放大镜移动并限定其移动范围
                        $(this).on('mousemove', function (ev) {
                            _this.sfmove(ev);
                            _this.bpicmove(ev);
                        });
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
                    });
                    //鼠标划过图片列表,小图片和大图片更换地址
                    _this.ali.hover(function () {
                        $(this).css('border-color', ' rgb(132, 95, 63)').siblings().css('border-color', 'rgb(236, 236, 236)');
                        _this.imgurl = $(this).find("img").attr("src");
                        _this.spic.find("img").attr("src", _this.imgurl);
                        _this.bpic.attr("src", _this.imgurl);
                    });
                    //图片列表的左右箭头点击事件
                    _this.down.on("click", function () {
                        _this.downarrow();
                    });
                    _this.up.on("click", function () {
                        _this.uparrow();
                    });
                }, "json");
            }

            //右面图片列表的上下箭头的点击事件
            //这里的95是一个div的高度+边框+margin值(this.ali.eq(0).outerHeight(true))    4是div里可视的图片个数
            //由于一直获取不到正确的值，所以用95替代

        }, {
            key: "downarrow",
            value: function downarrow() {
                if (this.num < this.ali.length) {
                    this.num++;
                }
                this.ul.stop(true, true).animate({
                    top: -95 * (this.num - 4)
                });
            }
        }, {
            key: "uparrow",
            value: function uparrow() {
                if (this.num > 4) {
                    this.num--;
                }
                this.ul.stop(true, true).animate({
                    top: -95 * (this.num - 4)
                });
            }

            //小放大镜和大放大镜的出现与消失

        }, {
            key: "appear",
            value: function appear() {
                this.sf.css('visibility', 'visible');
                this.bf.css('visibility', 'visible');
                // this.right.css('display', 'none');
            }
        }, {
            key: "disappear",
            value: function disappear() {
                this.sf.css('visibility', 'hidden');
                this.bf.css('visibility', 'hidden');
                // this.right.css('display', 'block');
            }

            //求小放大镜的大小   this.sf/this.spic=this.bf/this.bpic

        }, {
            key: "sfsize",
            value: function sfsize() {
                this.sf.css({
                    "width": this.bf.width() / this.bpic.width() * this.spic.width(),
                    "height": this.bf.height() / this.bpic.height() * this.spic.height()
                });
            }

            //小放大镜的移动

        }, {
            key: "sfmove",
            value: function sfmove(ev) {

                this.l = ev.pageX - this.spic.offset().left - this.sf.width() / 2;
                this.t = ev.pageY - this.spic.offset().top - this.sf.height() / 2;

                //限定范围
                if (this.l <= 0) {
                    this.l = 0;
                } else if (this.l >= this.spic.width() - this.sf.width()) {
                    this.l = this.spic.width() - this.sf.width();
                }
                if (this.t <= 0) {
                    this.t = 0;
                } else if (this.t >= this.spic.height() - this.sf.height()) {
                    this.t = this.spic.height() - this.sf.height();
                }

                this.sf.css({
                    left: this.l,
                    top: this.t
                });
            }

            //求出小放大镜在小图里移动比例，然后算出大放大镜里的大图的移动距离  ratio:比例

        }, {
            key: "bpicmove",
            value: function bpicmove(ev) {
                var ratioX = this.l / (this.spic.width() - this.sf.width());
                var ratioY = this.t / (this.spic.width() - this.sf.width());
                this.bpic.css({
                    left: (this.bf.width() - this.bpic.width()) * ratioX,
                    top: (this.bf.height() - this.bpic.height()) * ratioY
                });
            }
        }]);

        return Magnifier;
    }();

    new Magnifier().init();
})(jQuery);