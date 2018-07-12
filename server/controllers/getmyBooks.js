const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openid} = ctx.request.query
    const myBooks = await mysql('books')
        .select('books.*')
        .where('books.openid', openid)
        .orderBy('books.id', 'desc')
    ctx.state.data = myBooks
}
