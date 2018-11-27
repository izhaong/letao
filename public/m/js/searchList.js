$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });


    // 1 页面初始化的时候: 关键字在输入框内显示
    var urlParams = CT.getParamsByUrl()
    $input = $('.ct_search input').val(urlParams.key || '')
    // 2 页面初始化的时候: 根据关键字查询第一页数据4条
    // getSearchData({
    //     proName: urlParams.key,
    //     page: 1,
    //     pageSize: 4
    // }, function (data) {
    //     $('.ct_product').html(template('list', data))
    // })

    // 3 用户点击搜索的时候 根据关键字搜索商品 重置排序功能
    $('.ct_search a').on('tap', function () {
        /*跳转去搜索列表页 并且需要带上关键字*/
        var key = $.trim($('input').val());
        /*判断  没有关键字就提示用户“请输入关键字搜索”*/
        if (!key) {
            /*mui 消息提示*/
            mui.toast('请输入关键字');
            return false;
        }
        getSearchData({
            proName: key,
            page: 1,
            pageSize: 4
        }, function (data) {
            $('.ct_product').html(template('list', data))
        })
    });

    // 4 用户点击排序的时候 根据排序的选项去进行排序 默认的时候是降序 再次点击的时候是 升序
    // 点击样式的改变
    $('.ct_order a').on('tap', function () {
        $this = $(this)
        if (!$this.hasClass('now')) {
            $this.addClass('now').siblings().removeClass('now')
                .find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
        } else {
            if ($this.find('span').hasClass('fa-angle-down')) {
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
            } else {
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
            }
        }

        var order = $this.attr('data_order')
        var orderVal = $this.find('span').hasClass('fa-angle-down') ? 2 : 1
        var key = $.trim($('input').val());
        /*判断  没有关键字就提示用户“请输入关键字搜索”*/
        if (!key) {
            /*mui 消息提示*/
            mui.toast('请输入关键字');
            return false;
        }
        var params = {
            proName: key,
            page: 1,
            pageSize: 4
        }
        params[order] = orderVal
        getSearchData(params, function (data) {
            $('.ct_product').html(template('list', data))
        })
    })
    // 5 用户下拉的时候 根据当前条件刷新 上拉加载重置
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,
                callback: function () {
                    var that = this
                    var key = $.trim($('input').val());
                    /*判断  没有关键字就提示用户“请输入关键字搜索”*/
                    if (!key) {
                        /*mui 消息提示*/
                        mui.toast('请输入关键字');
                        return false;
                    }
                    $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
                    getSearchData({
                        proName: key,
                        page: 1,
                        pageSize: 4
                    }, function (data) {
                        setTimeout(function () {
                            $('.ct_product').html(template('list', data))
                            that.endPulldownToRefresh()
                        }, 1000)
                    })
                }
            },
            // 6 用户上拉的时候 加载下一页 没有数据不去加载 重置上拉加载
            up: {
                callback:function () {
                    window.page ++;
                    /*组件对象*/
                    var that = this;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }

                    /*获取当前点击的功能参数  price 1 2 num 1 2*/
                    var order = $('.ct_order a.now').attr('data_order');
                    var orderVal = $('.ct_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                    /*获取数据*/
                    var params = {
                        proName: key,
                        page: window.page,
                        pageSize: 4
                        /*排序的方式*/
                    };
                    params[order] = orderVal;
                    getSearchData(params, function (data) {
                        setTimeout(function () {
                            /*渲染数据*/
                            $('.ct_product').append(template('list', data));
                            /*注意：停止上拉加载*/
                            if(data.data.length){
                                that.endPullupToRefresh();
                            }else{
                                that.endPullupToRefresh(true);
                            }

                        }, 1000);
                    });
                }
            }
        }
    });

});

var getSearchData = function (params, callback) {
    $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        success: function (data) {
            window.page = data.page
            callback && callback(data)
        }
    });
}