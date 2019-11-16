var id_list = ["basics", "product", "account", "payments", "booking", "guarantee"]
Url = window.location.href;
index_admin = Url.indexOf('admin')
if (index_admin != -1) {
    $('#update').css("display", "block");
}
$.ajax({
    url: '../get_faq',
    type: 'get',
    success: (data) => {
        // console.log(data)
        for (let i = 0; i < data.data.length; i++) {
            if (index_admin == -1) {
                $(`#${id_list[data.data[i].index_id - 1]}`).append(`
                            <li class="cd-faq__item" >
                            <a class="cd-faq__trigger" href="#0" id="color_title"><span>${data.data[i].faq_question}?</span></a>
                            <div class="cd-faq__content">
                                <div class="text-component">
                                    <p>${data.data[i].faq_answer}</p>
                                </div>
                            </div> <!-- cd-faq__content -->
                            </li>
                        `)
            }
            else {
                // console.log("admin");
                $(`#${id_list[data.data[i].index_id - 1]}`).append(`
                            <li class="cd-faq__item">
					        <a class="cd-faq__trigger" href="#0"><span id="color_name">${data.data[i].faq_question}?</span></a>
					        <div class="cd-faq__content">
                                <div class="md-form">
                                    <i class="fas fa-pencil-alt prefix"></i>
                                    <textarea name="" id="" cols="60" rows="6">${data.data[i].faq_answer}</textarea>
                                </div>
                            </div> <!-- cd-faq__content -->
				             </li>
                        `)
            }
        }
    }
})
$('#update').on('click', () => {

})