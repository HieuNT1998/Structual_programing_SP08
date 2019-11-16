const express = require('express');
const app = express();
const bodyParse = require('body-parser');
var { Pool, Client } = require("pg");

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

var path = "/home/nthieubk/LapTrinhCauTruc/son_rua_structural_programming/app/views/"

var connectionString = "postgres://postgres:123@localhost:5432/ltct_sp08";
var pool = new Pool({
    connectionString: connectionString,
})



app.use(express.static('./views'));

app.get('/', (req, res) => {
    res.send("<h1>Hello World !!! </h1>");
})

app.get('/get_infor', (req, res) => {
    pool.query(`select * from base_infor`, (err, data) => {
        if (err) console.log(err)
        else res.status(201).send({ success: 1, infor: data.rows });
        // else console.log(data.rows)
    })
})

app.post('/update_infor', (req, res) => {
    for (let i = 0; i < req.body.infor.length; i++) {
        pool.query(`update base_infor set infor_content = '${req.body.infor[i].infor_content}'
                     where infor_id = ${parseInt(req.body.infor[i].infor_id)}`, (err, data) => {
            if (err) console.log(err)
        })
    }
    res.status(201).send({ message: "success", success: 1 })
})


app.get('/get_faq', (req, res) => {
    pool.query(`select * from faq`, (err, data) => {
        if (err) console.log(err)
        else res.status(201).send({ success: 1, data: data.rows })
    })

})

app.get('/feedback', (req, res) => {
    res.sendFile(__dirname + "/views/feedback.html");
})

app.post('/feedback', (req, res) => {
    feedback = req.body.feedback;
    pool.query(`insert into feedback (user_id, feedback_content, feedback_date, topic_id) values (${parseInt(feedback.userID)}, 
    '${feedback.feedback_content}', '2019-11-5', ${parseInt(feedback.topic_id)});`, (err, data) => {
        if (err) res.status(501).send({ success: 0, err: err })
        else res.status(201).send({ success: 1, message: "success" })
    })
})

app.get('/get_feedback', (req, res) => {
    pool.query(`select * from feedback`, (err, data) => {
        if (err) res.status(501).send({ success: 0, err: err })
        else res.status(201).send({ success: 1, feedback: data.rows })
    })
})

app.get('/footer', (req, res) => {
    res.sendFile(__dirname + "/views/footer.html");
})

app.get('/infor', (req, res) => {
    res.sendFile(__dirname + "/views/infor.html");
})

app.get('/admin/infor', (req, res) => {
    res.sendFile(__dirname + "/views/infor.html");
})

app.get('/bao-hanh/tracuu', (req, res) => {
    res.sendFile(__dirname + "/views/guarantee.html")
})

app.get('/css', (req, res) => {
    res.sendFile(__dirname + "/views/footer.css");
})

app.get('/frequent-question', (req, res) => {
    res.sendFile(__dirname + "/views/frequent_question.html");
})

app.get('/admin/frequent-question', (req, res) => {
    res.sendFile(__dirname + "/views/frequent_question.html");
})

app.get('/order/:orderId', (req, res) => {
    // var id = req.params.clubid 
    var orderId = req.params.orderId
    pool.query(`select order_id, product.product_id, product_name, guarantee_infor from orders, product
                where orders.product_id = product.product_id and order_id = ${parseInt(orderId)}`, (err, data) => {
        if (err) res.status(501).send({ success: 0, error: err });
        else res.status(201).send({ success: 1, product: data.rows });
    })
})

app.get('/bao-hanh', (req, res) => {
    res.sendFile(__dirname + "/views/bao_hanh.html")
})

app.get('/admin/bao-hanh', (req, res) => {
    res.sendFile(__dirname + "/views/bao_hanh.html")
})

app.get('/bao-hanh/repair-schedule', (req, res) => {
    res.sendFile(__dirname + "/views/Repair_Schedule.html");
})

app.get('/schedule/:scheduleID', (req, res) => {
    scheduleId = req.params.scheduleID;
    pool.query(`select g.product_id, product_name, created_on, status_name, other_infor, status_id
                from guarantee g, product p, status s
                where g.product_id = p.product_id and status_id = g.status and guarantee_id = ${parseInt(scheduleId)}
        `, (err, data) => {
        if (err) res.status(501).send({ success: 0, error: err });
        else res.status(201).send({ success: 1, guarantee: data.rows });
    })
})

app.get('/bao-hanh/guarantee_form', (req, res) => {
    res.sendFile(__dirname + "/views/Create_guarantee.html")
})

app.put('/update_schedule', (req, res) => {
    guarantee_list = req.body.guarantee_list
    console.log(guarantee_list)
    for (let i = 0; i < guarantee_list.length; i++) {
        pool.query(`update guarantee
                set status = ${parseInt(guarantee_list[i].status_id)},
                other_infor = '${guarantee_list[i].other_infor}'
                where guarantee_id = ${parseInt(guarantee_list[i].guarantee_id)} and 
                product_id = ${parseInt(guarantee_list[i].product_id)}
                `, (err, data) => {
            if (err) res.status(501).send({ success: 0, err: err })
        })
    }
    setTimeout(() => {
        res.status(201).send({ success: 1, message: "success" });
    }, 0)
})

app.post('/create_guarantee', (req, res) => {
    guarantee_list = req.body.guarantee_list;
    pool.query(`select max(guarantee_id) from guarantee`, (err, data) => {
        if (err) console.log(err)
        else {
            console.log(data.rows[0].max)
            var guarantee_id = parseInt(data.rows[0].max) + 1;
            for (let i = 0; i < guarantee_list.length; i++) {
                pool.query(`insert into guarantee (guarantee_id, product_id, other_infor) 
                            values (${guarantee_id}, ${parseInt(guarantee_list[i].product_id)}, '${guarantee_list[i].other_infor}')
                            ;`, (err, data) => {
                    if (err) res.status(501).send({ success: 0, err: err })
                })
            }
            setTimeout(() => {
                res.status(201).send({ success: 1, message: "success" });
            }, 0)
        }
    })
})

app.get('/bao-hanh/Update_chedule', (req, res) => {
    res.sendFile(__dirname + "/views/Update_guarantee.html")
})
app.listen(6969, (err) => {
    if (err) console.log(err);
    else console.log("Server listen on port " + 6969);
})