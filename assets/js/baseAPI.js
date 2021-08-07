// 每次调用jquery的ajax时候都会先调用这个函数
$.ajaxPrefilter(function(options) {
  // 在发起ajax请求之前统一拼接请求的根路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})