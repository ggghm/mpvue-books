const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
  const {id} = ctx.request.query
  // 查询对应的 id 的项
  await mysql('books')  // 直接取出下面的表
          .where('id', id)    // 限制查询范围的语句
          .increment('count', 1)   // 累加
}
