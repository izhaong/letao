$(function () {
    var proId = CT.getParamsByUrl().productId
    getProductData(proId, function (data) {
        $('.loading').remove()
        $('.mui-scroll').html(template('detail', data))
        // 重置
        mui('.mui-slider').slider({
            interval: 2000,
        });
        // 重置
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });

        // 尺码的选择
        $('.p_size .btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now')
        })
        // 数量的选择
        $('.p_number span').on('tap', function () {
            var curr = $(this).siblings('input').val()
            var maxNum = data.num
            if ($(this).hasClass('jia')) {
                if (curr < maxNum) {
                    curr++
                } else {
                    mui.toast('库存不足')
                    return false
                }
            } else {
                if (curr > 0) {
                    curr--
                } else {
                    mui.toast('不能小于0')
                    return false
                }
            }
            $(this).siblings('input').val(curr)
        })
        // 加入购物车
        $('.btn_addCart').on('tap', function () {
            var $changeBtn = $('.btn_size.now')            
            if (!$changeBtn.length) {
                mui.toast('你还没有选择尺码')
                return false
            }
            var num = $('.p_number input').val()
            if (num == 0) {
                mui.toast('你还没有选择数量')
                return false
            }
            CT.loginAjax({
                type: "post",
                url: "/cart/addCart",
                data: {
                    productId: proId,
                    num: num,
                    size: $changeBtn.html(),
                },
                dataType: "json",
                success:function (data) {
                    if(data.success == true){
                        /*弹出提示框*/
                        /*content*/
                        /*title*/
                        /*btn text []*/
                        /*click btn callback */
                        mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                            if (e.index == 0) {
                                location.href = CT.cartUrl;
                            } else {
                                //TODO
                            }
                        })
                    }
                }
            });


        })
    })

})
var getProductData = function (productId, callback) {
    $.ajax({
        type: 'get',
        url: "/product/queryProductDetail",
        data: {
            id: productId
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }
    });
}