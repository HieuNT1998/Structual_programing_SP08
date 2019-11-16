topic_name = ["Chất lượng dịch vụ", "Nhân viên", "Sản phẩm"]
    $.ajax({
        url: '/get_feedback',
        type: 'get',
        success: (data) => {
            for (let i = 0; i < data.feedback.length; i++) {
                $('.feedback tbody').append(`
                    <tr>
                        <td>${data.feedback[i].user_id}</td>
                        <td>${topic_name[data.feedback[i].topic_id - 1]}</td>
                        <td>${data.feedback[i].feedback_content}</td>
                        <td>${data.feedback[i].feedback_date}</td>
                    </tr>
                `)
            }
        }
    })