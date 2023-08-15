var express = require('express');
var router = express.Router();

const ps = require('@prisma/client');
const prisma = new ps.PrismaClient();
const pagesize = 5; //1ページ当たりのレコード数

//userテーブルの表示
router.get('/', (req, res, next) => {
    const page = req.query.page ? +req.query.page : 0;

    prisma.user.findMany({
        orderBy: [{ id: 'asc'}],
        skip: page * pagesize,
        take: pagesize,
    }).then( users => {
        const data = {
            title: 'Users/Index',
            content: users
        }
        res.render('users/index', data);
    });
});

//LIKE検索
router.get('/find', (req, res, next) => {
    const name = req.query.name;
    const mail = req.query.mail;

    prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: name } },
                { mail: { contains: mail } }
            ]
        }
    }).then(usrs => {
        var data = {
            title: 'Users/Find',
            content: usrs
        }
        res.render('users/index', data);
    });
});

//addの処理
router.get('/add', (req, res, next) => {
    const data = {
        title: 'Users/Add',
    }
    res.render('users/Add', data);
});

router.post('/add', (req, res, next) => {
    prisma.User.create({
        data:{
            name: req.body.name,
            pass: req.body.pass,
            mail: req.body.mail,
            age: +req.body.age
        }
    }).then(() => {
        res.redirect('/users');
    });
});

//updateの処理
router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id;

    prisma.user.findUnique(
        { where: { id: +id } }
    ).then(usr => {
        const data = {
            title: 'Users/Edit',
            user: usr
        };
        res.render('users/edit', data);
    });
});

router.post('/edit', (req, res, next) => {
    const { id, name, pass, mail, age } = req.body;

    prisma.user.update({
        where: { id: +id },
        data: {
            name:name,
            mail: mail,
            pass: pass,
            age: +age
        }
    }).then(() => {
        res.redirect('/users');
    });
});

//deleteの処理
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    prisma.user.findUnique(
        { where: { id:+id } }
    ).then(usr => {
        const data = {
            title: 'Users/Delete',
            user:usr
        };
        res.render('users/delete', data);
    });
});

router.post('/delete', (req, res, next) => {
    prisma.User.delete({
        where: { id:+req.body.id}
    }).then(() => {
        res.redirect('/users');
    });
});

module.exports = router;
