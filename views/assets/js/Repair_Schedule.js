$('.repair_schedule button').on('click', (req, res) => {
    var scheduleID = $('.repair_schedule input').val();
    $.ajax({
        url: '/schedule/' + scheduleID,
        type: 'get',
        success: (data) => {
            console.log(data)
            for (let i = 0; i < data.guarantee.length; i++) {
                $('.repair_schedule table tbody').append(`
                        <tr>
                            <td>${data.guarantee[i].product_name}</td>
                            <td>${data.guarantee[i].created_on}</td>
                            <td>${data.guarantee[i].status_name}</td>
                            <td>${data.guarantee[i].other_infor}</td>
                        </tr>
                    `)
            }
        }
    })
})
