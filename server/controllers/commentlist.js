const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid} = ctx.request.query
    const comments = await mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id') // 第一个参数是固定语法，记住就好，后两个参数代码二者要相等
        .where('bookid', bookid)
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
