const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const top = await mysql('books')
        .select('id', 'title', 'image', 'count')
        .orderBy('count', 'desc') // 倒序排列
        .limit(9)
    // koa 返回数据
    ctx.state.data = top
}
