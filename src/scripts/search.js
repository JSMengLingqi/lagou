var $ = require('./libs/zepto.js')
var template = require('./libs/template-web.js')

var searchTpl = require('../templates/search.html')
var util = require('./util.js')

var search = {
  getSearchList: function () {
    var html = template.render(searchTpl, {})
    util.renderBody(html)
  }
}

module.exports = search
