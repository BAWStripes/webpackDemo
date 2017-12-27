module.exports = (function(){

    let $ = require('../jquery.min');

    function GoTop(ct) {
        this.ct = ct;
        this.target = $('<a class="goTop"><i class="fa fa-chevron-up"></i><span>顶部</span></a>');
        this.createNode();
        this.bind();
        this.scroll()
    }

    GoTop.prototype = {
        bind: function () {
            this.target.on('click', function () {
                $(window).scrollTop(0)
            })
        },
        createNode: function () {
            this.ct.append(this.target);
            this.target.hide();
        },
        scroll: function () {
            var _this = this;
            $(window).scroll(function () {
                if ($(window).scrollTop() > 100) {
                    _this.target.show();
                } else {
                    _this.target.hide();
                }
            })
        }
    };
    return GoTop;
})();