import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // ^后面代表的是首页
    pages: ['^pages/eat/main'],
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
          text: '吃 啥',
          pagePath: 'pages/eat/main',
          iconPath: 'static/img/5.png',
          selectedIconPath: 'static/img/6.png'
        }, {
          text: '住 哪',
          pagePath: 'pages/sleep/main',
          iconPath: 'static/img/11.png',
          selectedIconPath: 'static/img/12.png'
        }, {
          text: '玩什么',
          pagePath: 'pages/fun/main',
          iconPath: 'static/img/13.png',
          selectedIconPath: 'static/img/14.png'
        }
      ]
    }
  }
}
