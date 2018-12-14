$(function () {
    window.page = 1
    // 1 默认展示第一页
    render()
    // 3 点击添加分类弹窗
    getCateFirstData(function (data) {
        $('.dropdown-menu').html(template('dropDown', data)).find('a').on('click', function () {
            var dropDownVal = $(this).html()
            $('.dropdown-text').html(dropDownVal)
            $('[name="categoryId"]').val = $(this).attr('data-id')
        })
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })
    initFileUpload()
    // 4 点击确认按钮 提交( 一级分类的 id 二级分类 的 名称 logo)
    $('form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();

        var $form = $(e.target);
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    $('#addModal').modal('hide')
                    window.page = 1
                    render()
                }
            }
        });
    });
});

var render = function () {
    getCateData(function (data) {
        // 模板渲染
        $('tbody').html(template('list', data))
        // 2 分页展示
        var options = {
            size: 'small',
            currentPage: data.page || 1, //设置当前页，默认起始页为第一页
            totalPages: Math.ceil(data.total / data.size), //总页数
            numberOfPages: 3, //设置控件显示的页码数,跟后台计算出来的总页数没多大关系
            bootstrapMajorVersion: 3, //如果是bootstrap3版本需要加此标识，并且设置包含分页内容的DOM元素为UL,如果是bootstrap2版本，则DOM包含元素是DIV
            useBootstrapTooltip: 'true', //是否显示tip提示框
            onPageClicked: function (event, originalEvent, type, page) {
                window.page = page
                render()
            },
            // pageUrl: function (type, page, current) {
            //     window.page = page
            //     return '?page=' + page + '&pageSize=2' //为每个页码设置url访问请求链接，page为页码数

            // },
            itemTexts: function (type, page, current) { //文字翻译
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "尾页";
                    case "page":
                        return page;
                }
            }
        }

        $('.pagination').bootstrapPaginator(options);
    })
}

var getCateData = function (callback) {
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: window.page || 1,
            pageSize: 3
        },
        dataType: "json",
        success: function (data) {
            callback && callback(data)
        }
    });
}
var getCateFirstData = function (callback) {
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 999
        },
        dataType: "json",
        success: function (data) {
            callback && callback(data)
        }
    });
}

var initFileUpload = function () {
    $('[name="pic1"]').fileupload({
        // 上传地址
        url: '/category/addSecondCategoryPic',
        // 返回格式
        dataType: 'json',
        // 上传成功
        done: function (e, data) {
            console.log(data);
            $('#upImg').attr('src', data.result.picAddr)
            $('[name="brandLogo"]').val(data.result.picAddr)
        }
    });
}