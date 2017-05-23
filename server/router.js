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
    console.log(docs)
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

//文章详情
router.get('/api/articleDetails/:id', function (req, res) {
  db.Article.findOne({_id: req.params.id}, function (err, docs) {
    if (err){
      return
    }
    res.send(docs)
  })
});
router.post('/api/articleDetails', function(req, res){
  db.Article.findOne({_id: req.body.id}, function(err, docs){
    if (err) {
      return
    }
    res.send(docs)
  })
});
//文章保存
router.post('/api/saveArticle', function (req, res) {

  new db.Article(req.body).save(function (error) {
    if (error) {
      res.status(500).send();
      return
    }
    if (req.body.state !== 'draft') {
      db.Article.find({label: req.body.label}, function (err, ArticleList) {
        if (err) {
          return
        }
        db.TagList.find({tagName:　req.body.tagName}, function (err, docs) {
          if(docs.length>0){
            docs[0].tagNumber = ArticleList.length;
            db.TagList(docs[0]).save(function(error){})
          }
        })
      })
    }
    res.send();
  })
});

//文章编辑更新
router.post('/api/updateArticle', function (req, res) {
  db.Article.find({_id: req.body._id}, function (err, docs) {
    if (err) {
      return
    }
    docs[0].title = req.body.title;
    docs[0].content = req.body.content;
    docs[0].date = docs[0].date;
    docs[0].state = req.body.state;
    docs[0].label = req.body.label;

    db.Article(docs[0]).save(function (err) {
      if (err){
        res.status(500).send();
        return
      }
      res.send()
    })
  })
});

//文章删除
router.post('/api/deleteArticle', function (req, res) {

  db.Article.remove({_id: req.body._id}, function (err, docs) {
    if (err) {
      res.status(500).send();
      return
    }
    res.send()
  })
});

/*标签-------------------------------*/
router.get('/api/getLabels', function (req, res) {
  db.TagList.find({}, function (err, docs) {
    if (err) return;
    res.json(docs)
  })
});

router.post('/api/saveLabels', function(req, res){
  db.TagList.find({tagName: req.body.tagName}, function (err, docs) {
    if (err) return;
    console.log(11111111,docs)
    if(docs.length>0){
      res.json({error: true, msg: '标签已存在'})
    } else {
      new db.TagList(req.body).save(function(error){
        if (error) {
          res.status(500).send();
          return
        }
        res.send()
      })
    }

  })
});
router.post('/api/deleteLabel', function (req, res) {
  db.TagList.remove({_id: req.body._id}, function (err, docs) {
    if (err) {
      res.status(500).send();
      return
    }
    res.send()
  })
});

module.exports = router;
