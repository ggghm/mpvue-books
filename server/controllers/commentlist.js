const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {bookid} = ctx.request.query
  const commentInfo = await mysql('comments')
                              .select('comments.*')
                              // .where('bookid', bookid)
  ctx.state.data = commentInfo
}
