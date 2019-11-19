Url = window.location.href;
index_admin = Url.indexOf('admin')
if (index_admin != -1) {
    $('.bao_hanh .content').append(`
        <a href="/CSKH/bao-hanh/update_chedule/admin">
           <button type="button" class="btn btn-info">
               Cập nhât tiến độ bảo hành
           </button>
       </a>
       <a href="/CSKH/bao-hanh/guarantee_form/admin">
            <button type="button" class="btn btn-info">
                Tạo đơn bảo hành
            </button>
        </a>
        `)
}
else {
    $('.bao_hanh .content').append(`
        <a href="/CSKH/bao-hanh/tracuu">
            <button type="button" class="btn btn-info">
                Tra cứu bảo hành
            </button>
        </a>
        <a href="/CSKH/bao-hanh/repair-schedule">
            <button type="button" class="btn btn-info">
                Tra cứu tiến độ bảo hành
            </button>
        </a>
        `)
}