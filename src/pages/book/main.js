import Vue from 'vue'
import App from './Book'

const app = new Vue(App)
app.$mount()
// 允许下拉刷新,一些页面的配置项要放在这里面
export default{
  config: {
    enablePullDownRefresh: true
  }
}
