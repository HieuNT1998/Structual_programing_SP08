$('.guarantee .button').on('click', (req, res) => {
    $('.guarantee table tbody').empty();
    var orderID = $('.guarantee input').val()
    $.ajax({
        url: '/order/' + orderID,
        type: 'get',
        success: (data) => {
            console.log(data)
            for (let i = 0; i < data.product.length; i++) {
                $('.guarantee table tbody').append(`
                        <tr>
                            <td>${data.product[i].order_id}</td>
                            <td>${data.product[i].product_id}</td>
                            <td>${data.product[i].product_name}</td>
                            <td>${data.product[i].guarantee_infor}</td>
                        </tr>
                    `)
            }
        }
    })
})