var { Pool, Client } = require("pg");
var connectionString = "postgres://postgres:123@localhost:5432/ltct_sp08";
var pool = new Pool({
    connectionString: connectionString,
})

class infor{
    constructor(){
    }
    get_all(){
        // console.log("get all infor");
        pool.query(`select * from base_infor`, (err, data) => {
            if (err){
                console.log("Error")
                return {success:0,err:err}
            } 
            // else res.status(201).send({ success: 1, infor: data.rows });
            // else console.log(data.rows)
            // else return {success:1, data: data.rows}
            else {
                console.log("Success");
                return {success:1, data: data.rows}
            }
        })
        
    }
}

module.exports = infor