$(function(){
  // 点击去注册账号
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录账号
  $('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
  })

  
  layui.use(['form','layer'], function(){
    // 从 layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify() 函数自定义pwd的校验规则
    form.verify({
      pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
      //校验两次密码是否一致的验证规则 
      repwd: function(value) {
        // 通过value拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行判断是否相等
        var pwd = $('.reg-box [name=password]').val()
        if(pwd != value){
          return '两次密码不一样'
        }
      }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
      // 阻止表单提交的默认提交跳转行为
      e.preventDefault()
      // 发起ajax的post请求
      $.post('/api/reguser',{username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()},
      function(res) {
        if(res.status !== 0){
          return layer.msg(res.message)
        }
        layer.msg('注册成功！')
        // 模拟点击去登录
        $('#link_login').click()
      })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e) {
      // 阻止表单提交的默认提交跳转行为
      e.preventDefault()
      // 发起ajax的post请求
      $.ajax({
        url:'/api/login',
        method:'POST',
        // 快速获取表单中的数据
        data: $(this).serialize(),
        success: function(res) {
          if(res.status !== 0){
            return layer.msg('登录失败')
          }
          layer.msg('登录成功')
          // 将token令牌保存到localStorage中
          localStorage.setItem('token', res.token)

          // 跳转到后台主页
          location.href = '/index.html'
        }
      })
    })



  });
})

