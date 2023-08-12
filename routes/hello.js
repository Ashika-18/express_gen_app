const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydata.db');

//getアクセスの処理
router.get('/', (req, res, next) => {
    //データベースのシリアライズ
    db.serialize(() => {
        //レコードを全て取り出す
        db.all("select * from mydata", (err, rows) => {
            //データベースアクセス完了時の処理
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