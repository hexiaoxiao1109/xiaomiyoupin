

//class
; (function ($) {

    class Magnifier {
        constructor() {
            this.spic = $(".spic");
            this.sf = $(".spic .sf");
            this.bf = $(".bf");
            this.bpic = $(".bf img");
            this.ali = $("#list li");
            this.ul = $("#list ul");
            this.left = $("#left");
            this.right = $("#right");
            this.l = null;
            this.t = null;
            this.imgurl = null;
            this.num = 5;
            this.right = $(".sku-container")
        }
        init() {
            var _this = this;
            this.spic.hover(function () {
                _this.appear();
                //小放大镜出现之后求其大小
                _this.sfsize();
                console.log((_this.sf.width())/2)
                //让小放大镜移动并限定其移动范围
                $(this).on('mousemove', function (ev) { 
                    _this.sfmove(ev);
                    _this.bpicmove(ev)
                })
            }, function () {
                _this.disappear();
            });
            //鼠标划过图片列表,小图片和大图片更换地址
            this.ali.hover(function () {
                $(this).find("img").addClass("redborder").parent().siblings().find("img").removeClass("redborder")
                _this.imgurl = $(this).find("img").attr("src");
                _this.spic.find("img").attr("src", _this.imgurl);
                _this.bpic.attr("src", _this.imgurl);
            })
            //图片列表的左右箭头点击事件
            this.right.on("click", function () {
                _this.rightarrow()
            });
            this.left.on("click", function () {
                _this.leftarrow()
            })

        }

        //小放大镜和大放大镜的出现与消失
        appear() {
            this.sf.css('visibility', 'visible');
            this.bf.css('visibility', 'visible');
            this.right.css('display','none');
        }
        disappear() {
            this.sf.css('visibility', 'hidden');
            this.bf.css('visibility', 'hidden');
            this.right.css('display','block');
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

        //下面图片列表的左右箭头点击事件
        rightarrow() {
            if (this.num < this.ali.length) {
                this.num++;
                this.left.css("color", "#333");
                if (this.num == this.ali.length) {
                    this.right.css("color", "#fff");
                }
            }
            this.ul.stop(true, true).animate({
                left: -this.ul.find("li").outerWidth() * (this.num - 5),
            })
        }
        leftarrow() {
            if (this.num > 5) {
                this.num--;
                this.right.css("color", "#333");
                if (this.num == 5) {
                    this.left.css("color", "#fff");
                }
            }
            this.ul.stop(true, true).animate({
                left: -this.ul.find("li").outerWidth() * (this.num - 5),
            })
        }
    }

    new Magnifier().init()

})(jQuery);

