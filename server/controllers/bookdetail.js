const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'csessioninfo.user_info')
    // 连表查询，同时查询两个表，把cSessionInfo里面的项目加进去，
    // 前提是'books.openid', 'cSessionInfo.open_id'一样
        .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
        .where('id', id) // 取出这一个id
        .first() // 直接取出数组的第一项
    // console.log(detail)
    // 本来 userInfo 是一个字符串，现在将它转为对象
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, { // 将两个对象拼接在一起
    // 这里会直接覆盖原来内容是字符串的字段
        tags: detail.tags.split(','),
        summary: detail.summary.split('\n'),
        Url: info.avatarUrl
    }) // detail是一个数组，里面包含了一个对象，每次获取数据集的看下数据形式

    // 查询对应的 id 的项
    await mysql('books') // 直接取出下面的表
        .where('id', id) // 限制查询范围的语句
        .increment('count', 1) // 累加
}
