const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
  const {id} = ctx.request.query
  const detail = await mysql('books')
                        .select()
                        .where('id', id)
                        .first()
  // console.log(detail)
  ctx.state.data = detail // detail是一个数组，里面包含了一个对象，每次获取数据集的看下数据形式






  // 查询对应的 id 的项
  await mysql('books')  // 直接取出下面的表
          .where('id', id)    // 限制查询范围的语句
          .increment('count', 1)   // 累加
}
