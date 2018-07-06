import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // ^后面代表的是首页
    pages: ['^pages/book/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#70c760',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      selectedColor: '#70c760',
      list: [
        {
          text: '图 书',
          pagePath: 'pages/book/main',
          iconPath: 'static/img/5.png',
          selectedIconPath: 'static/img/6.png'
        }, {
          text: '评 论',
          pagePath: 'pages/comment/main',
          iconPath: 'static/img/11.png',
          selectedIconPath: 'static/img/12.png'
        }, {
          text: '我',
          pagePath: 'pages/me/main',
          iconPath: 'static/img/13.png',
          selectedIconPath: 'static/img/14.png'
        }
      ]
    }
  }
}
