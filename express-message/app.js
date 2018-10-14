var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template'))

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

app.get('/', function(req, res){
    res.render('index.html', {
        comments:comments
    })
})
app.get('/post', function(req, res){
    res.render('post.html')
})/*
app.get('/pinglun', function(req, res){
    var comment = req.query
    comment.dateTime = '2018-10-14 11:01:22'
    comments.unshift(comment)
    res.redirect('/')//返回首页
})*/
app.post('/post', function(req, res){
    var comment = req.body
    comment.dateTime = '2018-10-14 11:01:22'
    comments.unshift(comment)
    res.redirect('/')//返回首页
})
app.listen(3000, function(req, res){
    console.log('running...')
})