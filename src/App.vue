<script>
import config from './config'
export default {
  created () {
    wx.request({
      url: config.host + '/weapp/demo',
      success: function (res) {
        console.log(res)
      }
    })
    console.log('启动')
  }
}
</script>

<style>

</style>
