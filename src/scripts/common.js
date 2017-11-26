var $ = require('./libs/zepto.js')
var position = require('./position')
var search = require('./search')
var my = require('./my')

module.exports = {
  tabBarAction: function () {
    $('.container footer li').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active')
      setTimeout( () => {
         [position.getPosList, search.getSearchList, my.getMyList][$(this).index()]()
      }, 0)
      // if ($(this).index() == 0) {
      //   position.getPosList()
      // } else if($(this).index() == 1) {
      //   search.getSearchList()
      // } else {
      //   my.getMyList()
      // }
    })
  }
}
