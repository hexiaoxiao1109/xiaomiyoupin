"use strict";

;(function ($) {

    var $username = $("#username");
    var $password = $("#password");
    var $form = $("#login-main-form");
    var $errinfo = $(".error-con");

    var $nameflag = false;
    var $passflag = false;

    $form.on("submit", function () {

        // 将账号和密码传给后端和数据库进行匹配
        $.ajax({
            type: "post",
            url: "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/login.php",
            data: {
                username: $username.val(),
                password: $password.val()
            }
        }).done(function (d) {

            if (d) {
                //匹配成功(即数据库里有该账号信息并且密码正确)
                // 匹配成功后将账号名存入cookie
                // $.cookie("username", $username.val(),{expires:7});
                $nameflag = true;
                $passflag = true;
                console.log($nameflag, $passflag);
                // if($nameflag && $passflag){
                //     alert(1)
                // }
            }
        });

        // 如果账号和密码为空时
        if ($username.val() == "") {
            $errinfo.html("账号或密码不能为空").css("color", "red");
            return false;
        };
        if ($password.val() == "") {
            $errinfo.html("账号或密码不能为空").css("color", "red");
            return false;
        };

        // 阻止浏览器的默认行为(form的submit按钮的跳转)
        //这里的$nameflag和$passflag的值不是ajax的回调函数里的值， 用异步
        if (!$nameflag || !$passflag) {
            console.log($nameflag, $passflag);
            $errinfo.html("账号或密码错误").css("color", "red");
            return false;
        }
    });
})(jQuery);