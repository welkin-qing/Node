var http = require('http');
var fs = require('fs');
var template = require('art-template')
var url = require('url')
var comments = [
    {
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
  
http
.createServer(function(req, res){
    //使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    var parseObj = url.parse(req.url, true)
    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                //读不到文件
                return res.end('404 not found')
            }
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })
    } 
    else if(pathname === '/pinglun'){
        //res.end(JSON.stringify(parseObj))
        var comment = parseObj.query
        comment.dateTime = '2017-11-2 17:11:22'
        comments.unshift(comment)
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    }
    else if(pathname === '/post'){
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end('404 not found')
            }
            res.end(data)
        })
    }
    else if (pathname.indexOf('/public') === 0) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 not found')
            }
            res.end(data)
        })
    }
    else {//找不到文件
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                return res.end('404 not found')
            }
            res.end(data)
        })
    }
})
.listen(3000, function(){
    console.log('running...')
})
