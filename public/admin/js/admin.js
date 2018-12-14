$(window).ajaxStart(function () {
    NProgress.start();
})
$(window).ajaxComplete(function () {
    NProgress.done();
})
NProgress.configure({
    minimum: 0.1,
    showSpinner: false
});
$('[data-menu]').on('click', function () {
    $('.ad_aside').toggle();
    $('.ad_section').toggleClass('menu');
});
/*3.二级菜单的显示和隐藏*/
$('.menu [href="javascript:;"]').on('click', function () {
    var $this = $(this);
    var $child = $this.siblings('.child');
    $child.slideToggle();
});

var logoutHtml = ['    <div class="modal fade" id="logoutModal">',
    '        <div class="modal-dialog modal-sm">',
    '            <div class="modal-content">',
    '                <div class="modal-header">',
    '                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
    '                    <h4 class="modal-title">温馨提示</h4>',
    '                </div>',
    '                <div class="modal-body">',
    '                    <p class="text-danger"><span class="glyphicon glyphicon-off',
    '                        "></span>',
    '                        是否退出?</p>',
    '                </div>',
    '                <div class="modal-footer">',
    '                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
    '                    <button type="button" class="btn btn-primary">确定</button>',
    '                </div>',
    '            </div>',
    '        </div>',
    '    </div>'
].join("");
$('body').append(logoutHtml);
$('[data-logout]').on('click', function () {
    var $logoutModal = $('#logoutModal')
    $logoutModal.modal('show').find('.btn-primary').on('click', function () {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            data: "",
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    $logoutModal.modal('hide');
                    location.href = '/admin/login.html'
                }
            }
        });
    })
})