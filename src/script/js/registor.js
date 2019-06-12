!function () {


    var form = document.querySelector("form")
    var ainput = document.querySelectorAll("input");
    var aspan = document.querySelectorAll("span");


    var userflag = false;
    var passflag = false;
    var repassflag = false;
    var codeflag = false;


    for(var i = 0; i < aspan.length;i++){
        aspan[i].style.cssText = "font-size:12px;";
    }

    //验证用户名
    ainput[0].onfocus = function () {
        aspan[0].innerHTML = "用户名最多12个字母或6个汉字";
    }
    ainput[0].onblur = function () {
        aspan[0].innerHTML = "";
        var re = /[\u4e00-\u9fa0]/g;
        var result = this.value.replace(re, "**");
        if (/\D/g.test(this.value) && result.length <= 12) {
            ajax({
                type: "post",
                url: "http://10.31.164.11/kejian/myproject/project/xiaomiyoupin/php/registor.php",
                data: {
                    username: this.value,
                }
            }).then(function (d) {
                if (d) {
                    aspan[0].innerHTML = "该用户名已存在";
                    aspan[0].style.color = "red";

                } else {

                    aspan[0].innerHTML = "√";
                    aspan[0].style.color = "green";
                    userflag = true;
                }
            })

        } else {
            aspan[0].innerHTML = "请输入正确的用户名";
            aspan[0].style.color = "red";
        }
    }

    //验证密码
    ainput[1].onfocus = function () {
        aspan[1].innerHTML = "输入8-14位密码";
        aspan[1].style.cssText = "font-size:12px;"
    }
    ainput[1].oninput = function () {
        aspan[1].innerHTML = "";
        if (this.value.length >= 8 && this.value.length <= 14) {
            var renum = /\d+/g;//数字
            var reupper = /[A-Z]/g;//大写字母
            var relower = /[a-z]/g;//小写字母
            var reother = /[^\w\_]/g;//其他符号和"_"
            var num = 0;//用于记录密码强度  不能是全局变量

            //判断密码强度
            if (renum.test(this.value)) {
                num++;
            }
            if (reupper.test(this.value)) {
                num++;
            }
            if (relower.test(this.value)) {
                num++;
            }
            if (reother.test(this.value)) {
                num++;
            }
            switch (num) {
                case 1:
                    aspan[1].innerHTML = "密码强度: 弱";
                    aspan[1].style.color = "red";
                    break;
                case 2:
                case 3:
                    aspan[1].innerHTML = "密码强度: 中";
                    aspan[1].style.color = "blue";
                    passflag = true;
                    break;
                case 4:
                    aspan[1].innerHTML = "密码强度: 强";
                    aspan[1].style.color = "green";
                    passflag = true;
                    break;
            }
        } else {
            aspan[1].innerHTML = "密码长度不符合";
            aspan[1].style.color = "red";
        }
    }
    ainput[1].onblur = function () {
        aspan[1].innerHTML = "请输入8-14位密码";
        if (passflag) {
            aspan[1].innerHTML = "√";
            aspan[1].style.color = "green";
            passflag = true;
        }
    }

    //确认密码
    ainput[2].onfocus = function () {
        aspan[2].innerHTML = "请确认密码";
        // aspan[2].style.cssText = "font-size:12px;"
    }
    ainput[2].onblur = function () {
        if (ainput[2].value == ainput[1].value && ainput[2].value != "") {
            aspan[2].innerHTML = "√";
            aspan[2].style.color = "green";
            repassflag = true;
        } else {
            aspan[2].innerHTML = "两次输入的密码不一致";
            aspan[2].style.color = "red";
        }
    }



    function rancode() {    //随机四位验证码
        var str = "";
        for (let i = 0; i < 4; i++) {
            var x = "";
            var xnum = Math.random()
            if (xnum <= 0.33) {
                x = String.fromCharCode(rannum(48, 57))
            } else if (xnum > 0.334 && xnum <= 0.66) {
                x = String.fromCharCode(rannum(97, 122))
            } else {
                x = String.fromCharCode(rannum(65, 90))
            }
            str += x;
        }
        function rannum(min, max) {
            return Math.round(Math.random() * (max - min)) + min
        }
        return str;
    }
    aspan[3].innerHTML = rancode();
    aspan[4].style.cssText = "font-size:12px;"
    aspan[3].onclick = function () {
        aspan[3].innerHTML = rancode();
    }
    ainput[3].onblur = function () {
        if (ainput[3].value == aspan[3].innerHTML) {
            aspan[3].innerHTML = "√";
            aspan[3].style.color = "green";
            codeflag = true;
        }
    }


    form.onsubmit = function () {
        if (ainput[0].value == "") {
            aspan[0].innerHTML = "请输入用户名";
            aspan[0].style.color = "red";
        }
        if (ainput[1].value == "") {
            aspan[1].innerHTML = "请输入密码";
            aspan[1].style.color = "red";
        }
        if (ainput[2].value == "") {
            aspan[2].innerHTML = "请确认密码";
            aspan[2].style.color = "red";
        }


        if (!userflag || !passflag || !repassflag || !codeflag) {
            return false;
        }

    }
}()