var $ = require('./libs/zepto.js')
var template = require('./libs/template-web.js')

var myTpl = require('../templates/my.html')
var util = require('./util.js')

var my = {
  getMyList: function () {
    var html = template.render(myTpl, {})
    util.renderBody(html)
  }
}

module.exports = my
