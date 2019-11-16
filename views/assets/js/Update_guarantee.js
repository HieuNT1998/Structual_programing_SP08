
var index_product = 1;
var scheduleID
$('.update_guarantee button').on('click', (req, res) => {
    // alert("Hello")
    $('#admin_button').css("display", "block");
    scheduleID = $('.update_guarantee input').val();
    $.ajax({
        url: '/schedule/' + scheduleID,
        type: 'get',
        success: (data) => {
            for (let i = 0; i < data.guarantee.length; i++) {
                $('.update_guarantee table tbody').append(`
                            <tr class="product_${index_product}" id="${data.guarantee[i].product_id}/${scheduleID}">
                                <td >${data.guarantee[i].product_name}</td>
                                <td>${data.guarantee[i].created_on}</td>
                                <td>
                                    <select class="browser-default custom-select" >
                                        <option selected value="${data.guarantee[i].status_id}" >
                                            ${data.guarantee[i].status_name}
                                        </option>
                                        <option value="0">Nhận hàng, chưa sửa chữa</option>
                                        <option value="1">Đang sửa chữa</option>
                                        <option value="2">Đã hoàn thành sửa chữa</option>
                                        <option value="3">Đã hoàn trả khách hàng</option>
                                    </select>
                                </td>
                                <td><textarea name="" id="" cols="30" rows="3">${data.guarantee[i].other_infor}</textarea></td>
                            </tr>
                    `)
                index_product++;
            }
        }
    })
})
$('#admin_button button').on('click', () => {
    var guarantee_list = []
    for (let i = 1; i < index_product; i++) {
        var product_id = $(`.product_${i}`).attr("id").split('/')[0]
        var guarantee_id = $(`.product_${i}`).attr("id").split('/')[1]
        var select_value = $(`.product_${i} select`).val();
        var other_infor = $(`.product_${i} textarea`).val();
        var guarantee_tmp = {
            product_id: product_id,
            guarantee_id: guarantee_id,
            status_id: select_value,
            other_infor: other_infor
        }
        guarantee_list.push(guarantee_tmp)
    }
    // console.log(guarantee_list)
    $.ajax({
        url: '/update_schedule',
        type: 'put',
        contentType: "application/json",
        data: JSON.stringify({
            guarantee_list: guarantee_list
        }),
        success: (data) => {
            alert("success !!!!")
        }
    })
})