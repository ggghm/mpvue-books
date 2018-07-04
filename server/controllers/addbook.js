
// 新增图书
// 1.获取豆瓣信息
// https://api.douban.com/v2/book/isbn/9787115351531
// 2.入库
const https = require('https')

module.exports = async (ctx) => {
  const {isbn, openid} = ctx.request.body
  if (isbn && openid) {
    let url = 'https://api.douban.com/v2/book/isbn/'+isbn
    const bookinfo = await getJSON(url)
    console.log(bookinfo)
  }
}

function getJSON(url){
  return new Promise((reslove,reject)=>{
    https.get(url,res=>{
      let urlData = ''
      res.on('data', data=>{
        urlData += data
      })
      res.on('end', data=>{
        const bookinfo = JSON.parse(urlData)
        if(bookinfo.title){
          reslove(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })
}
