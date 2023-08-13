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
                res.render('hello/index', data);
            }
        });
    });
});

router.get('/add', (req, res, next) => {
    var data = {
        title: 'Hell/Add',
        content: '新しいレコードを追加:'
    }
    res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;

    db.serialize(() => {
        db.run('insert into mydata (name, mail, age) values (?, ?, ?)', nm, ml, ag);
    });
    res.redirect('/hello');
});

module.exports = router;