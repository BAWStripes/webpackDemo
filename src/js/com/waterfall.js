module.exports = (function(){

    let $ =require('../jquery.min');
    function WaterFall(ct) {
        this.$ct = ct;
        this.$item = this.$ct.find('.waterfall-item');
        this.$btnLoad = this.$ct.siblings('.loadMore');
        this.bind();
        this.start();
    }

    WaterFall.prototype.bind = function () {
        var _this = this;
        this.curpage = 1;
        this.perPageCount = 10;
        this.itemArr = [];
        this.colLength = parseInt(this.$ct.width() / this.$item.width());
        for (var i = 0; i < this.colLength; i++) {
            this.itemArr[i] = 0;
        }
        this.$btnLoad.click(function (e) {
            _this.start();
        })
    };

    WaterFall.prototype.start = function () {
        var _this = this;
        this.getData(function (data) {
            $.each(data, function (idx, news) {
                var $node = _this.getNode(news)
                $node.find('img').load(function () {
                    _this.$ct.append($node)
                    _this.fallFlow($node)
                })
                $node.find('img').on('click',function (e) {
                    e.preventDefault();
                })
            })
        })
    };

    WaterFall.prototype.getData = function (callback) {
        var _this = this;
        $.ajax({
            url: '//platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4',
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            data: {
                app_key: 1271687855,
                num: _this.perPageCount,
                page: _this.curpage
            }
        }).done(function (ret) {
            if (ret && ret.status && ret.status.code === '0') {
                callback(ret.data);
                _this.curpage++;
            } else {
                console.log('get error data')
            }
        })
    };

    WaterFall.prototype.getNode = function (data) {
        var html = '';
        html += '<li class="waterfall-item"><a href="' + data.url+'">';
        html += '<img src="' + data.img_url + '"></a>';
        html += '<h4>' + data.short_name + '</h4>';
        html += '<p>' + data.name + '</p></li>';
        return $(html);
    };

    WaterFall.prototype.fallFlow = function ($nodes) {
        var _this = this;
        $nodes.each(function () {
            var minValue = Math.min.apply(null, _this.itemArr);
            var minIndex = _this.itemArr.indexOf(minValue);
            $(this).css({
                top: _this.itemArr[minIndex],
                left: minIndex * $('.waterfall-item').outerWidth(true)
            });
            _this.itemArr[minIndex] += $(this).outerHeight(true)
            _this.$ct.css({height: Math.max.apply(null, _this.itemArr)})
        })
    };
    WaterFall2 = (function () {
        return {
            init: function ($ct) {
                $ct.each(function (idx, ct) {
                    new WaterFall($(ct));
                })
            }
        }
    })();
    return WaterFall2;
})();