const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // 评论页和图画页都通过这个接口获取数据
    const {bookid, openid} = ctx.request.query
    // const mysqlSelect = await mysql('comments')会将 mysqlSelect变成Promise对象
    const mysqlSelect = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id') // 第一个参数是固定语法，记住就好，后两个参数代码二者要相等
    let comments
    if (bookid) {
        comments = await mysqlSelect.where('bookid', bookid)
    } else {
        comments = await mysqlSelect.where('openid', openid)
    }
    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, info)
        })
    }
}
// 查到的user_info字段是一个字符串，要转为对象
// 同时查到的commentInfo是一个数组，里面存的一个一个的对象
// const commentInfo = commentInfo_temp.map(element => {
//   const user_info_obj = JSON.parse(element.user_info)
//   return Object.assign({}, commentInfo_temp, {
//     userImageUrl: user_info_obj.avatarUrl
//   })
// })
// ctx.state.data = commentInfo
