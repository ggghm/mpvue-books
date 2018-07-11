// const { mysql } = require('../qcloud')

// module.exports = async (ctx) => {
//   const books = await mysql('books')
//                   .select('books.*','cSessionInfo.user_info')
//                   .join('cSessionInfo','books.openid','cSessionInfo.open_id')
//                   .orderBy('books.id','desc')
//   // .orderBy('id', 'desc')
//   ctx.state.data = {
//     list: books.map(v => {
//       const info = JSON.parse(v.user_info)
//       // 将多个对象合并并返回一个新对象
//       return Object.assign({}, v, {
//         user_info:{
//           nickName: info.nickName
//         }
//       })
//     })
//   }
// }

const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page} = ctx.request.query // ?????
    const size = 5
    // 根据页数，一次只查出来五项
    const books = await mysql('books')
        .select('books.*') // 其实这里不用查全部信息，后期改一下，提升效率
        .limit(size)
        .offset(page * size) // 当前偏移量
        .orderBy('books.id', 'desc')
    // .orderBy('id', 'desc')
    ctx.state.data = books
}
