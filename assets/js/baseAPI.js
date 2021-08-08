// 每次调用jquery的ajax时候都会先调用这个函数
$.ajaxPrefilter(function(options) {
  // 在发起ajax请求之前统一拼接请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url

  // 统一为有权限的接口，设置headers 请求头
  if(options.url.indexOf('/my/') !== -1){
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载 complete 回调函数
  options.complete = function(res){
    // 无论成功还是失败都会调用complete 回调函数
      // 在complete回调函数中 跨域使用 res.responseJSON 拿到服务器响应回来的数据
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1.强制清空 token
      localStorage.removeItem('token')
      // 2.强制跳转到登录页面
      location.href= './login.html'
    }
  }
})