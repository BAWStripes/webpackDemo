var $ = require('./jquery.min');
var goTop = require('./com/gotop');
var carousel = require('./com/carousel');
var waterfall = require('./com/waterfall');

new goTop($('nav'));
new carousel.init($('.carousel'), $(window).width(), $(window).height());
new waterfall.init($('.waterfall'));
