$(function () {
    getFirstCategoryData(function (data) {
        $('.cate_left ul').html(template('firstTemplate', data))



        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
        render(categoryId)

        $('.cate_left li').on('tap', function (e) {
            $(this).parent().find('li').removeClass('now')
            $(this).addClass('now')
            var categoryId = $(this).find('a').attr('data-id');
            render(categoryId)
        })
    });


})

var getFirstCategoryData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};
var getSecondCategoryData = function (params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};
/*渲染*/
var render = function (categoryId) {
    getSecondCategoryData({
        id:categoryId
    },function (data) {
        /*二级分类默认*/
        $('.cate_right ul').html(template('secondTemplate',data));
    });
}