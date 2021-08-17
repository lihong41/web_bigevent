$(function(){
  getUserInfo()
  
  var layer = layui.layer
  // 为退出按钮绑定点击事件 实现点击按钮退出登录功能
  $('#btnLogout').on('click',function() {
    // 提示用户是否退出
    layer.confirm('确定退出登录?',{icon: 3,title: '提示'},function(index) {
      // 1.清空本地存储中的token
      localStorage.removeItem('token')
      // 2.跳转到登录页面
      location.href = './login.html'

      // 关闭 confirm 询问框
      layer.localStorage(index)
    })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象
    success: function(res) {
      if(res.status !== 0){
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用renderAvatar 渲染用户头像
      renderAvatar(res)
    }
  })
}

// 渲染用户头像
function renderAvatar(user) {
  // 1.获取用户名称
  var name = user.data.nickname || user.data.username
  // 2.设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
  // 3.按需渲染用户的头像
  if(user.data.user_pic != null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src',user.data.user_pic).show()
    $('.text-avatar').hide()
  }else{
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first)
  }
}