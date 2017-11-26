var $ = require('./libs/zepto.js')
var template = require('./libs/template-web.js')

var mainTpl = require('../templates/main.html')
var util = require('./util.js')

var IScroll = require('./libs/iscroll-probe')

var position = {
  getPosList: function () {
    $.ajax({
      url: '/api/listmore.php',
      data: {
        pageNo: 2,
        pageSize: 15
      },
      success: function (res) {
        var html = template.render(mainTpl, res.content.data.page)
        util.renderBody(html)
        new IScroll('.list')
      }
    })
  }
}

module.exports = position
