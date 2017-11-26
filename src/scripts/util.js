var $ = require('./libs/zepto.js')
module.exports = {
  renderBody: function (html) {
    $('#body').html(html)
  },
}
