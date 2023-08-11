const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

//データオブジェクトの取得
const db = new sqlite3.Database('mydb.db');

//GETアクセスの処理
router.get('/', (req, res, next) => {
    //データベースのシリアライズ
    db.serialize(() => {
        //レコードを全て取り出す
       db.all("select * from mydata", (err, rows) => {
        if (!err) {
            var data = {
                title: 'Hello!',
                content: rows
            };
            res.render('hello', data);
        }
       });
    });
});

module.exports = router;