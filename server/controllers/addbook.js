
// 新增图书
// 1.获取豆瓣信息
// https://api.douban.com/v2/book/isbn/9787115351531
// 2.入库
const https = require('https')
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    // 请求发起后，wx.request传入的参数data都在ctx.request.body中
    const {isbn, openid, nickName} = ctx.request.body
    if (isbn && openid && nickName) {
    // 先验证图书是否已经添加
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state.data = {
                code: -1,
                msg: '图书已存在'
            }
            return
        }
        // 从豆瓣网上抓取数据并存入mysql
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSON(url)
        const rate = bookinfo.rating.average
        const { title, image, alt, publisher, summary, price } = bookinfo
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        // console.log(bookinfo)
        const author = bookinfo.author.join(',') // 使用数组的join方法，将数组拼接为字符串
        try {
            // 向 mysql 中录入获取到的图书信息
            await mysql('books').insert({
                isbn, openid, nickName, rate, title, image, alt, publisher, summary, price, tags, author
            })
            // 现在先理解成下面这一句就是简单向外返回参数
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state.data = {
                code: -1,
                data: {
                    msg: `失败: ${e.sqlMessage}`
                }
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            // res.on实际上是一个流，所以需要一点点的加起来
            res.on('data', data => {
                urlData += data
            })
            // 获取信息结束，获取到的实际上是JSON，需要转为字符串
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
