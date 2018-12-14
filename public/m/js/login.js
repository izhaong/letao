$(function () {


    $('#loginSure').on('tap', function () {
        //若当前input为空，则alert提醒 
        var data = $('form').serialize()
        var dataObj = CT.serialize2object(data)
        if (!dataObj.username || !dataObj.password) {
            mui.toast("用户名和密码不允许为空");
            return false;
        }
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: dataObj.username,
                password: dataObj.password
            },
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    var returnUrl = location.search.replace('?returnUrl=', '')
                    if (returnUrl) {
                        location.href = returnUrl
                    } else {
                        location.href = CT.userUrl;
                    }

                }else{
                    mui.toast(data.message)
                }
            }
        });
    })


})