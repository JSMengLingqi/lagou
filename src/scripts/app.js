var $ = require('./libs/zepto.js')

var pos = require('./position.js')
var common = require('./common')

var layoutTpl = require('../templates/layout.html')
$('body').prepend(layoutTpl)

pos.getPosList()
common.tabBarAction()
