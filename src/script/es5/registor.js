"use strict";

!function ($) {

    var $form = $("form");
    var $ainput = $("input");
    var $aspan = $("span");

    var $userflag = false;
    var $passflag = false;
    var $repassflag = false;
    var $codeflag = false;

    $aspan.each(function (index, element) {
        $(element).css({
            "fontSize": "12px",
            "color": "#999"
        });
    });

    //验证用户名
    $ainput.eq(0).on("focus", function () {
        $aspan.eq(0).html("用户名4~12个字母或2~6个汉字").css("color", "#999");
    });
    $ainput.eq(0).on("blur", function () {
        $aspan.eq(0).html("");
        $re = /[\u4e00-\u9fa0]/g;
        $result = $(this).val().replace($re, "**");
        if (/\D/g.test($(this).val()) && $result.length <= 12 && $result.length >= 4) {
            $.ajax({
                type: "post",
                url: "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/registor.php",
                data: {
                    username: $(this).val()
                },
                success: function success(d) {
                    if (d) {
                        $aspan.eq(0).html("该用户名已存在").css("color", "red");
                    } else {
                        $aspan.eq(0).html("√").css("color", "green");
                        $userflag = true;
                    }
                }
            });
        } else {
            $aspan.eq(0).html("请输入正确的用户名").css("color", "red");
        };
    });

    //验证密码
    $ainput.eq(1).on('focus', function () {
        $aspan.eq(1).html("输入8-14位密码").css("color", "#999");
    });
    $ainput.eq(1).on('input', function () {
        $aspan.eq(1).html("");
        if ($(this).val().length >= 8 && $(this).val().length <= 14) {
            var renum = /\d+/g; //数字
            var reupper = /[A-Z]/g; //大写字母
            var relower = /[a-z]/g; //小写字母
            var reother = /[^\w\_]/g; //其他符号和"_"
            var $num = 0; //用于记录密码强度  不能是全局变量

            // //判断密码强度
            if (renum.test($(this).val())) {
                $num++;
            };
            if (reupper.test($(this).val())) {
                $num++;
            };
            if (relower.test($(this).val())) {
                $num++;
            };
            if (reother.test($(this).val())) {
                $num++;
            };
            switch ($num) {
                case 1:
                    $aspan.eq(1).html("密码强度: 弱").css("color", "red");
                    break;
                case 2:
                case 3:
                    $aspan.eq(1).html("密码强度: 中").css("color", "blue");
                    $passflag = true;
                    break;
                case 4:
                    $aspan.eq(1).html("密码强度: 强").css("color", "green");
                    $passflag = true;
                    break;
            }
        } else {
            $aspan.eq(1).html("密码长度不符").css("color", "red");
        }
    });
    $ainput.eq(1).on('blur', function () {
        if ($passflag) {
            $aspan.eq(1).html("√").css("color", "green");
            $passflag = true;
        }
        // console.log($passflag)
    });

    // //确认密码
    $ainput.eq(2).on('focus', function () {
        $aspan.eq(2).html("请确认密码").css("color", "#999");
    });
    $ainput.eq(2).on('blur', function () {
        $aspan.eq(2).html("");
        if ($ainput.eq(2).val() == $ainput.eq(1).val() && $ainput.eq(2).val() != "") {
            $aspan.eq(2).html("√").css("color", "green");
            $repassflag = true;
        } else {
            $aspan.eq(2).html("两次输入的密码不一致").css("color", "red");
        }
        // console.log($repassflag)
    });

    console.log(1 / 3 * 2);
    function rancode() {
        //随机四位验证码
        var $str = "";
        for (var i = 0; i < 4; i++) {
            var $x = "";
            var $xnum = Math.random();
            if ($xnum <= 1 / 3) {
                $x = String.fromCharCode(rannum(48, 57));
            } else if ($xnum > 1 / 3 && $xnum <= 1 / 3 * 2) {
                $x = String.fromCharCode(rannum(97, 122));
            } else {
                $x = String.fromCharCode(rannum(65, 90));
            }
            $str += $x;
        }
        function rannum(min, max) {
            return Math.round(Math.random() * (max - min)) + min;
        }
        return $str;
    };

    $aspan.eq(3).html(rancode());
    $aspan.eq(3).hover(function () {
        $(this).css("cursor", "pointer");
    });
    $aspan.eq(3).on("click", function () {
        $aspan.eq(3).html(rancode());
    });
    $ainput.eq(3).on("blur", function () {
        if ($aspan.eq(3).html() == $ainput.eq(3).val()) {
            $aspan.eq(4).html("√").css("color", "green");
            $codeflag = true;
        }
        // console.log($repassflag)
    });

    $form.on("submit", function () {
        if (!$userflag || !$passflag || !$repassflag || !$codeflag) {
            return false;
        } else {
            if (confirm("注册成功，点击确定前往登录")) {
                window.open("http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/xiaomiyoupin/src/login.html");
            }
        }
    });
}(jQuery);