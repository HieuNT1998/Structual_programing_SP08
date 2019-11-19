const express = require('express');
const baohanh = express.Router();

baohanh.get('/', (req, res) => {
    res.sendFile(__dirname + "../views/bao_hanh.html")
})

module.exports = baohanh;