$(function () {
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $form = $(e.target)
        // 后台校验用户名和密码
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            dataType: "json",
            success: function (data) {
                if (data.success==true) {
                    location.href = '/admin/'
                } else {
                    // 用户名错误
                    // 设置用户名这个表单元素的校验状态为失败
                    // NOT_VALIDATED 还没校验 , validating 校验中, invalid 失败, valid 成功
                    // 1 获取校验组件
                    // 2 调研更改状态的函数
                    // 3 校验的表单, 改成什么状态, 使用哪个校验规则
                    if (data.error == 1000) {
                        // 用户名错误
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID','callback')
                    } else if(data.error == 1001){
                        // 密码错误
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID','callback')
                    }
                }
                
            }
        });
    })
});