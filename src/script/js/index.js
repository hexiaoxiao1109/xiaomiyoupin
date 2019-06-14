; (function ($) {



    class rendering {
        constructor() {
            this.parent = $(".m-product-list");
            // this.auto = $("#autocomplete");
        }
        init() {
            
            let _this = this;
            //从数据库获取数据
            //$.post()方法：参1：路径，参2：数据，参3：回调函数， 参4：返回内容的格式
            $.post(
                "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/getdate.php",
                function (d) {
                    _this.stru(d);
                    let $son = _this.parent.children();
                    $son.each(function (index, element) {
                        $(this).on("click", function () {
                            var id = d[index].ID;
                            window.open("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/xiaomiyoupin/src/details.html?sid=" + id);

                        })
                    })
                },
                "json",
            );

        }

        //渲染结构
        stru(d) {
            let _this = this;
            $(d).each(function (index, element) {
                //渲染结构
                if (index == 0 || index % 4 == 0) {
                    _this.parent.append($(`
                        
                        <div class="m-goods-item-container first pro-item-category">
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
                        </div>
                    `))
                } else {
                    _this.parent.append($(`
                    
                    <div class="m-goods-item-container  pro-item-category">
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

        //详情页
        details() {

        }

    }
    new rendering().init()

})(jQuery)