var fs = require('fs')
var Student = require('./student')
//express提供了一种专门用来包装路由的方式
var express = require('express')
//1. 创建一个路由容器
var router = express.Router()
// 2.把路由都挂载到router路由容器中

// 渲染学生列表页面
router.get('/students', function(req, res){
   /* fs.readFile('./db.json', 'utf8', function(err, data){
        if(err){
            return res.status(500).send('Server error')
        }
        var students = JSON.parse(data).students
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '梨子',
                '西瓜'
            ],
            students: students
        })
    })*/
    Student.find(function(err, students){
        if(err){
            return res.status(500).send('Server error')
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '梨子',
                '西瓜'
            ],
            students: students
        })
    })
})


// 渲染添加学生页面
router.get('/students/new', function(req, res){
    res.render('new.html')
})

//处理添加学生
router.post('/students/new', function(req, res){
// 1.获取表单数据
// 2.处理
// 3. 发送响应
    Student.save(req.body, function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
    //console.log(req.body)
})

//渲染编辑学生页面
router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    // 
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面
  
    Student.findById(parseInt(req.query.id), function (err, student) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.render('edit.html', {
        student: student
      })
    })
})
  

//处理编辑学生
router.post('/students/edit', function (req, res) {
    Student.updateById(req.body, function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})


//处理删除学生
router.get('/students/delete', function(req, res){
    Student.deleteById(req.query.id, function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

//导出router
module.exports = router