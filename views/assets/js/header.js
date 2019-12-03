Url = window.location.href;
index_admin = Url.indexOf('admin')
if (index_admin == -1) {
    $('.admin_view').css("display", "none");
}
else{
    $('.user_view').css('display','none');
}
