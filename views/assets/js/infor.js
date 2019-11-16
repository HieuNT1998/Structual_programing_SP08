// ajax
Url = window.location.href;
index_admin = Url.indexOf('admin')
if (index_admin != -1) {
    console.log("aaaa")
    $('#admin_button').css("display", "block");
}
var id_list = []
$.ajax({
    url: "/get_infor",
    type: "get",
    success: (data) => {
        for (let i = 0; i < data.infor.length; i++) {
            id_list.push(data.infor[i].infor_id)
            if (index_admin == -1) {
                console.log("user: " + i)
                $('.infor_content').append(`
                      <div id="${data.infor[i].infor_id}">
                          <h4>${data.infor[i].infor_name}</h4>
                          <div class="content">
                              <p>
                                  ${data.infor[i].infor_content}    
                              </p>
                          </div>
                      </div>
                  `)
            }
            else {
                // console.log("admin:" + i)
                $('.infor_content').append(`
                      <div id="${data.infor[i].infor_id}">
                          <h4>${data.infor[i].infor_name}</h4>
                          <div class="content">
                              <textarea name="" id="" cols="120" rows="6" >${data.infor[i].infor_content}</textarea>
                          </div>
                      </div>
                  `)
            }
        }
    }
})

$('#admin_button button').on('click', (req, res) => {
    var infor = []
    for (let i = 0; i < id_list.length; i++) {
        var infor_id = id_list[i]
        var infor_name = $('#' + infor_id + ' h4').text()
        var infor_content = $('#' + infor_id + " .content textarea").val()
        infor_content = $.trim(infor_content)
        var item = {
            infor_id: infor_id,
            infor_name: infor_name,
            infor_content: infor_content
        }
        infor.push(item)
    }
    // console.log(infor)
    $.ajax({
        url: "/update_infor",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            infor: infor
        }),
        success: (data) => {
            alert("update success")
        }
    })
}) 