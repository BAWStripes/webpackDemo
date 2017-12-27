module.exports = function () {

    let $ = require('../jquery.min');

    function Carousel($ct, width, height) {
        this.$ct = $ct;
        this.$width = width;
        this.$height = height;
        this.bind();
        this.bindClick();
    }

    Carousel.prototype.bind = function () {
        this.$ct.width(this.$width);
        this.$ct.height(this.$height);
        this.$prebtn = this.$ct.find('.btnPre');
        this.$nextbtn = this.$ct.find('.btnNext');
        this.$imgCt = this.$ct.find('.img-ct');
        this.$imgs = this.$ct.find('.img-ct').children('.carousel-img');
        this.$imgs.width(this.$width);
        this.$imgs.height(this.$height);
        this.imgCount = this.$imgs.length;
        this.imgWidth = this.$imgs.width(this.width).width();
        this.pageindex = 0; //设置参数判断当前的画面在第几副图
        this.$btns = this.$ct.find('.btnWrap').children('.btn');
        this.pageAnimate = false; //设置参数判断是否在动画中
        this.$imgCt.append(this.$imgs.first().clone());
        this.$imgCt.prepend(this.$imgs.last().clone());
        console.log(this.imgWidth);
        this.$imgCt.width(this.imgWidth * (this.imgCount + 2));
        this.$imgCt.css({ left: -this.imgWidth });
        console.log(this.pageindex);
    };

    Carousel.prototype.play = function (len) {
        if (this.pageAnimate) {
            return;
        }
        var _this = this;
        console.log(len, this.imgWidth, this.imgCount);
        this.pageindex += len;
        this.pageAnimate = true; //判断是否在动画中
        this.$imgCt.animate({
            left: '-=' + this.imgWidth * len
        }, function () {
            if (_this.pageindex === _this.imgCount) {

                _this.pageindex = 0;
                _this.$imgCt.css({ left: -_this.imgWidth });
            }
            if (_this.pageindex === -1) {
                _this.pageindex = _this.imgCount - 1;
                console.log(_this.pageindex);
                _this.$imgCt.css({ left: -_this.imgWidth * _this.imgCount });
            }

            _this.setButton();
        });
    };

    Carousel.prototype.setButton = function () {
        this.$btns.removeClass('active').eq(this.pageindex).addClass('active');
        this.pageAnimate = false;
    };

    Carousel.prototype.bindClick = function () {
        var _this = this;
        this.$btns.on('click', function () {
            var index = $(this).index();
            console.log(index);
            _this.play(index - _this.pageindex);
        });

        this.$prebtn.on('click', function () {
            _this.play(-1);
        });

        this.$nextbtn.on('click', function () {
            _this.play(1);
        });
    };
    Carousel2 = function () {
        return {
            init: function ($ct, width, height) {
                $ct.each(function (idx, ct) {
                    new Carousel($(ct), width, height);
                });
            }
        };
    }();
    return Carousel2;
}();

//# sourceMappingURL=carousel-compiled.js.map