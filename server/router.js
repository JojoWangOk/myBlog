var express = require('express');
var router = express.Router();
var users = require('./user').items;
var db = require('./db');

/*登录*/
var findUser = function(name, password){
  return users.find(function(item){
    return item.name === name && item.password === password;
  });
};

router.post('/api/login', function (req, res) {
  var user = findUser(req.body.name, req.body.pwd);

  if(user){
    req.session.regenerate(function (err) {
      if (err){
        return res.json({code: 2, msg: '登录失败'});
      }
      req.session.loginUser = user.name;
      res.json({code: 0, msg: '登录成功'});
    })
  } else {

    res.json({code: 1, msg: '账号或密码错误'});
  }
});
router.get('/api/accessuser', function (req, res) {
  var sess = req.session;
  if (sess){
    res.json({name: sess.loginUser})
  } else {
    res.json({name: null});
  }

});

/*博客信息--------------------------------------------*/
router.get('/api/blogInformation', function (req, res) {
  db.BlogInformation.find({}, function (err, docs) {
    if (err) {
      res.status(500).send();
      return
    }
    res.json(docs)
  })
});

router.post('/api/save/blogInformation', function (req, res) {
  db.BlogInformation.find({}, function (err, docs) {
    if (err){
      res.status(500).send();
      return
    }
    if (docs.length > 0){
      docs[0].name = req.body.form.name;
      docs[0].description = req.body.form.description;
      docs[0].introduction = req.body.form.introduction;
      console.log(docs[0])
      db.BlogInformation(docs[0]).save(function (err) {
        if (err){
          res.status(500).send();
          return
        }
        res.send();
      })

    } else {
      new db.BlogInformation(req.body.form).save(function(err){
        if (err){
          res.status(500).send();
          return
        }
        res.json(docs);
      })
    }
  })
});

/*文章列表-------------------------------------------------*/

// 全部文章
router.get('/api/admin/articleList', function (req, res) {
  db.Article.find({}, function (err, docs) {
    if (err) {
      res.status(500).send();
      return
    }
    res.json(docs)
  })
});


module.exports = router;
