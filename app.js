var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var router = require('./server/router');

var resolve = file => path.resolve(__dirname, file);

app.use('/dist', express.static(resolve('./dist')));

var identityKey = 'skey';

app.use(session({
  name: identityKey,
  secret: 'jojo',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 15 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是15分钟
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.get('*', function(req, res) {
  var html = fs.readFileSync(resolve('./dist/' + 'index.html'), 'utf-8');
  res.send(html)
});

app.listen(process.env.PORT || 7000, function() {
  console.log("应用实例，访问地址为 localhost:7000")
});
