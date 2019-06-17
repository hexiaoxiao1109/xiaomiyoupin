"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
    var cart = function () {
        function cart() {
            _classCallCheck(this, cart);

            this.has = $(".has-good-container");
            this.ul = $(".merchant-item-container");
            this.li = $(".good-item-container"); //商品列表(模板列表用于被克隆)
            this.alltxt = $(".all-txt"); //全选
            this.cookiesid = $.cookie("cookiesid");
            this.cookienum = $.cookie("cookienum");

            this.img = $(".image");
            this.name = $(".good-name");
            this.pirce = $(".price span");
            this.num = null;
            this.totalprice = $(".subtotal");
            // this.del = $(".m-icons-close-hover:visible");
            this.sum = 0; //用于计算总价
            this.allnum = 0; //用于计算总数量
            this.had = $(".already-select");
        }

        _createClass(cart, [{
            key: "init",
            value: function init() {
                var _this = this;

                //当cookie没有cookiesid时(没有商品加入购物车时)
                if (!this.cookiesid) {
                    this.has.addClass("hidden"); //将商品列表隐藏
                } else {

                    var sidarr = this.cookiesid.split(",");
                    var numarr = this.cookienum.split(",");

                    $.ajax({
                        type: "get",
                        url: "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/cart.php",
                        data: {
                            //将cookie里的数组传给后端，后端从数据库里获取对应id的数据返回给前端
                            sid: sidarr
                        }
                    }).done(function (d) {
                        //返回的数据是多条json格式拼接成的字符窜
                        var $newarr = $(d.split("}")); // 将返回的数据分割成数组
                        var all = []; //  用来接受数据

                        // 将接受到的数据转成数组 
                        $newarr.each(function (index, element) {
                            if (element != "") {
                                //最后一项为空""不能转数组  排除
                                $.parseJSON(element + "}"); // 将每一项数据转成数组
                                all[index] = $.parseJSON(element + "}");
                            }
                        });

                        //渲染结构
                        $(all).each(function (index, element) {
                            _this.num = parseInt($(numarr).eq(index)[0]); //number
                            _this.allnum += _this.num; //计算总的商品数量
                            //nav的cart图标
                            $("<span class=\"m-cart-news\">" + _this.allnum + "</span>").appendTo($(".m-icons-cart-hover"));
                            //console.log(sidarr.indexOf(element.ID));//  index获取不到索引值 ????
                            //克隆模板，并赋值
                            var $clonebox = _this.li.clone(true, true).prependTo(_this.ul).removeClass("hidden"); //克隆隐藏的列表详情 并让他显示
                            $clonebox.find(".image").find("img").attr({ "src": element.url, "alt": element.name }); //图片
                            $clonebox.find(".name").find("p").html(element.name); //商品名
                            $clonebox.find(".price").find("span").html("￥" + element.price); //价格
                            $clonebox.find(".num").find("span").html(_this.num); //数量
                            $clonebox.find(".subtotal").find("span").html("￥" + _this.num * element.price); //单价商品总价

                            //全部商品的总价
                            _this.sum += parseInt($(".subtotal span:visible").html().split("￥")[1]);
                            $(element).parents().find(".totol-price-con b").html("￥" + _this.sum);
                            _this.had.html("\u5DF2\u9009" + _this.allnum + "\u4EF6");

                            if (_this.num > 1) {
                                //减符号的状态
                                $(".reduce").addClass(".m-icons-reduce-active").removeClass(".m-icons-reduce");
                            }
                        });

                        //计算最后的总价
                        $(".total-after-prefer b").html("￥" + _this.sum);

                        // 减
                        $(".reduce:visible ").each(function (index, element) {
                            $(element).on("click", function () {
                                _this.reduce($(this));
                            });
                        });
                        // 加
                        $(".add:visible ").each(function (index, element) {
                            $(element).on("click", function () {
                                _this.add($(this));
                            });
                        });
                        //删除
                        $(".m-icons-close-hover:visible").each(function (index, element) {
                            var $name = $(this).parents(".cart-good-items").find(".name p:visible").html();
                            var $thisID = null;
                            $(element).on("click", function () {

                                var $name = $(this).parents(".merchant-item-container .good-item-container").find(".name p:visible").html();
                                var $_this = $(this).parents(".good-item-container");
                                $(all).each(function (i, e) {
                                    if (e.name == $name) {
                                        $thisID = e.ID; //获取到目标元素的ID值
                                        if (confirm("你确认要删除该商品吗？")) {
                                            //确认删除
                                            var $index = sidarr.indexOf($thisID);
                                            sidarr.splice($index, 1); //删除索引值
                                            numarr.splice($index, 1); //删除对应的数量值
                                            $_this.remove();
                                            //重新存cookie  会将之前相同name的cookie覆盖
                                            $.cookie('cookiesid', sidarr, { expires: 7 });
                                            $.cookie('cookienum', numarr, { expires: 7 });

                                            location.reload(true); //刷新页面
                                        }
                                    }
                                });
                            });
                        });
                    });
                    $(".checkout ").on("click", function () {
                        if (confirm("你确定要去结算吗？")) {
                            alert("但是后面的还没写");
                        }
                    });
                }
            }

            //总价计算

        }, {
            key: "total",
            value: function total(element, num) {
                var $sum = 0;
                var $price = element.parents(".cart-good-items").find(".price span").html().split("￥")[1]; //获取单价
                element.parents(".cart-good-items").find(".subtotal span").html("￥" + $price * num); //计算单个总价
                element.parents().find(".subtotal span:visible");
                element.parents().find(".subtotal span:visible").each(function (i, e) {
                    $sum += parseInt($(e).html().split("￥")[1]);
                });
                element.parents().find(".totol-price-con b").html("￥" + $sum);
            }

            //数量加减
            //加

        }, {
            key: "add",
            value: function add(element) {
                var num = element.parent().find("span").html();
                var allNum = 0;
                num++;
                if (num > 4) {
                    num = 5;
                    element.removeClass("m-icons-add-active").addClass("m-icons-add");
                };
                if (num < 5) {
                    element.parent().find(".reduce").removeClass("m-icons-reduce").addClass("m-icons-reduce-active");
                };
                element.parent().find("span").html(num);
                $(element).parents(".merchant-item-container").find(".num span:visible").each(function (i, e) {
                    allNum += parseInt($(e).html());
                });
                //重新计算单个商品的总价
                this.total(element, num);
                this.had.html("\u5DF2\u9009" + allNum + "\u4EF6"); //商品总数
            }
            // 减

        }, {
            key: "reduce",
            value: function reduce(element) {
                var num = element.parent().find("span").html();
                var allNum = 0;
                num--;
                if (num < 2) {
                    num = 1;
                    element.removeClass("m-icons-reduce-active").addClass("m-icons-reduce");
                };
                if (num > 1) {
                    element.parent().find(".add").removeClass("m-icons-add").addClass("m-icons-add-active");
                }
                element.parent().find("span").html(num);
                $(element).parents(".merchant-item-container").find(".num span:visible").each(function (i, e) {
                    allNum += parseInt($(e).html());
                });
                //重新计算单个商品的总价
                this.total(element, num);
                this.had.html("\u5DF2\u9009" + allNum + "\u4EF6"); //商品总数
            }
        }]);

        return cart;
    }();

    ;

    new cart().init();
})(jQuery);