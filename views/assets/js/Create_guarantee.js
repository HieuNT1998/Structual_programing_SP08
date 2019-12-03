var product_index = 2;
$('.create_guarantee .add').on('click', () => {
    $('.create_guarantee .create_form').append(`
                <table class="product_${product_index}">
                <tr>
                    <td>
                        <h6 class="text-uppercase font-weight-bold"> Product ID: </h6>
                    </td>
                    <td>
                        <input class="form-control" type="text" placeholder="product id">
                    </td>
                </tr>
                <tr>
                    <td>
                        <h6 class="text-uppercase font-weight-bold" > Detail: </h6>
                    </td>
                    <td>
                        <div class="form-group purple-border">
                            <textarea class="form-control" id="exampleFormControlTextarea4" rows="5" cols="50" placeholder="Detail"></textarea>
                        </div>
                    </td>
                </tr>
                </table>
            `)
    product_index++;
})
$('.submit').on('click', () => {
    var guarantee_list = [];
    var validate_data = 1;
    for (let i = 1; i < product_index; i++) {
        var product_id = $('.product_' + i + " input").val();
        var description = $('.product_' + i + " textarea").val();
        if (isNaN(parseInt(product_id))) {
            alert("Ban can nhap ma san pham")
            validate_data = 0
            break;
        }
        else {
            var product = {
                product_id: product_id,
                other_infor: description
            }
            guarantee_list.push(product);
        }
    }
    if (validate_data == 1) {
        $.ajax({
            url: '/create_guarantee',
            type: 'post',
            contentType: "application/json",
            data: JSON.stringify({
                guarantee_list: guarantee_list
            }),
            success: (data) => {
                alert("success !!!!")
            }
        })
    }
})