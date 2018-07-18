# mpvue-book

一个基于mpvue的图书管理小程序

主要功能：扫码添加图书，图书详情展示，图书浏览量排序，添加评论

主要技术栈：mpvue、Vue.js、Koa2、MySQL、Knex

所有图书信息来自豆瓣图书，仅做学习用途
## 效果
<figure class="half">
    <img src="https://github.com/dengtao07/mpvue-book/blob/master/gif/%E7%99%BB%E5%BD%95.gif" width="288px" height="570px">
    <div>登录</div>
    <img src="https://github.com/dengtao07/mpvue-book/blob/master/gif/%E5%9B%BE%E4%B9%A6%E5%88%97%E8%A1%A8.gif" width="288px" height="570px">
    <div>图书列表</div>
</figure>


<figure class="half">
    <img src="https://github.com/dengtao07/mpvue-book/blob/master/gif/%E8%AF%84%E8%AE%BA.gif" width="288px" height="570px">
    <div>评论</div>
    <img src="https://github.com/dengtao07/mpvue-book/blob/master/gif/%E6%88%91%E7%9A%84%E5%9B%BE%E4%B9%A6.gif" width="288px" height="570px">
    <div>我的图书</div>
</figure>

## Build Setup

``` bash
# 安装依赖
npm install

# 配置个人信息
server/config.js 中 mysql对象中 pass 改为自己的小程序appid

# 启动服务器
cd server/
npm run dev

# 编译前端代码
进入项目根路径中
npm run dev


