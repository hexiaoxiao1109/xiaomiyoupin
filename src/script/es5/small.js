"use strict";

!function ($) {

    //top资质证照和协议规则的出现隐藏
    $("#appear").hover(function () {
        $(".site-item-nav").removeClass("hidden").addClass("show");
    }, function () {
        $(".site-item-nav").removeClass("show").addClass("hidden");
    });

    //顶部悬浮
    $(window).on('scroll', function () {
        var $top = $(window).scrollTop();
        if ($top >= 500) {
            $("#fixed").addClass("m-header-fixed");
        } else {
            $("#fixed").removeClass("m-header-fixed");
        }
    });

    //回到顶部
    $(".m-fixedBar .fixed-nav li").eq($(".fixed-nav li").length - 1).on("click", function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });

    //
    $(".nav-container").hover(function () {
        $(".nav-detail").removeClass("hidden");
    }, function () {
        $(".nav-detail").addClass("hidden");
    });

    //搜索框

    $("#autocomplete").on('input', function () {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1559009682637_1461&callback=taobao',
            dataType: "jsonp",
            jsonpCallback: "taobao",
            success: function success(d) {
                var arr = [];
                var $d = $(d.result);

                $d.each(function (index, element) {
                    arr.push(element[0]);
                });
                $('#autocomplete').autocomplete({
                    source: arr
                });
            }
        });
    });
}(jQuery);