topic_name = ["Chất lượng dịch vụ","Nhân viên","Sản phẩm"]

    $('footer button').on('click',(req,res)=>{
        var topic = $('select').val();
        var content = $('textarea').val();
        var feedback ={
            userID : 1,
            topic_id : topic,
            feedback_content : content 
        }
        if(topic == null){
            alert("Ban phai chon topic");
        }
        else{
            $.ajax({
                url : '/CSKH/feedback',
                type : 'post',
                contentType: "application/json",
                data :JSON.stringify({
                    feedback : feedback
                }),
                success: (data)=>{
                    alert("Send feedback success")
                }
            })
        }
    })