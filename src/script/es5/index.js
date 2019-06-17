"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
    var rendering = function () {
        function rendering() {
            // this.parent = $(".m-product-list");
            // this.auto = $("#autocomplete");

            _classCallCheck(this, rendering);
        }

        _createClass(rendering, [{
            key: "init",
            value: function init() {

                var _this = this;
                //从数据库获取数据
                //$.post()方法：参1：路径，参2：数据，参3：回调函数， 参4：返回内容的格式
                // $.post(
                //     "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/getdate.php",
                //     function (d) {
                //         _this.stru(d);
                //         let $son = _this.parent.children();
                //         $son.each(function (index, element) {
                //             $(this).on("click", function () {
                //                 var id = d[index].ID;
                //                 window.open("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/dist/details.html?sid=" + id);

                //             })
                //         })
                //     },
                //     "json",
                // );
                console.log(2);
            }

            //渲染结构

        }, {
            key: "stru",
            value: function stru(d) {
                var _this = this;
                $(d).each(function (index, element) {
                    //渲染结构
                    if (index == 0 || index % 4 == 0) {
                        _this.parent.append($("\n                        \n                        <div class=\"m-goods-item-container first pro-item-category\">\n                            <div class=\"category-img-container\">\n                                <div class=\"product-img\">\n                                    <div class=\"m-product-image-container undefined\" style=\"width: 264px; height: 198px;\">\n                                        <div class=\"img-container\" style=\"padding: 45px 70px 28px; width: 124px; height: 125px;\">\n                                            <img  width=\"125\" height=\"125\" data-original=\"" + element.url + "\" class=\"lazy\"\n                                            alt=\"" + element.name + "\" style=\"height: 125px; width: 125px; margin-left: -0.5px;\">\n                                        </div>\n                                    </div>\n                                </div>\n                                <p class=\"pro-desc\">" + element.intro + "</p>\n                            </div>\n                            <div class=\"category-box\">\n                            <div class=\"m-goods-common-tag-con\"><span class=\"common-tag common-tag-text\"\n                                    style=\"background-color: rgb(217, 107, 108);\">\u7279\u60E0</span><span\n                                    class=\"common-tag common-tag-text\"\n                                    style=\"background-color: rgb(217, 107, 108);\">\u6EE1\u51CF</span></div>\n                                <p class=\"pro-info\" title=\"" + element.name + "\uFF09\">" + element.name + "</p>\n                                <p class=\"pro-price\"><span class=\"pro-unit\">\xA5</span><span class=\"m-num\">" + element.price + "</span><span\n                                    class=\"pro-flag\">\u8D77</span></p>\n                            </div>\n                        </div>\n                    "));
                    } else {
                        _this.parent.append($("\n                    \n                    <div class=\"m-goods-item-container  pro-item-category\">\n                        <div class=\"category-img-container\">\n                            <div class=\"product-img\">\n                                <div class=\"m-product-image-container undefined\" style=\"width: 264px; height: 198px;\">\n                                    <div class=\"img-container\" style=\"padding: 45px 70px 28px; width: 124px; height: 125px;\">\n                                        <img width=\"125\" height=\"125\" data-original=\"" + element.url + "\" class=\"lazy\"\n                                        alt=\"" + element.name + "\" style=\"height: 125px; width: 125px; margin-left: -0.5px;\">\n                                    </div>\n                                </div>\n                            </div>\n                            <p class=\"pro-desc\">" + element.intro + "</p>\n                        </div>\n                        <div class=\"category-box\">\n                        <div class=\"m-goods-common-tag-con\"><span class=\"common-tag common-tag-text\"\n                                style=\"background-color: rgb(217, 107, 108);\">\u7279\u60E0</span><span\n                                class=\"common-tag common-tag-text\"\n                                style=\"background-color: rgb(217, 107, 108);\">\u6EE1\u51CF</span></div>\n                            <p class=\"pro-info\" title=\"\u8D1D\u533B\u751F\u7259\u5237\uFF08\u9752\u6625\u7248\uFF09\">" + element.name + "</p>\n                            <p class=\"pro-price\"><span class=\"pro-unit\">\xA5</span><span class=\"m-num\">" + element.price + "</span><span\n                                class=\"pro-flag\">\u8D77</span></p>\n                        </div>\n                    </div>\n                    \n                "));
                    }

                    //懒加载
                    $(function () {
                        //和拼接的元素放在一起。
                        $("img.lazy").lazyload({
                            effect: "fadeIn" //图片显示方式
                        });
                    });
                });
            }
        }]);

        return rendering;
    }();

    new rendering().init();
})(jQuery);