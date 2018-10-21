//数据操作模块
var fs = require('fs')
var dbPath = './db.json'
//获取学生列表
exports.find = function(callback){
    fs.readFile(dbPath, 'utf8', function(err, data){
        if(err){
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}
//根据id获取学生信息
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find(function (item) {
        return item.id === parseInt(id)
      })
      callback(null, ret)
   
    })
  }
  
//添加保存学生
exports.save = function(student, callback){
    fs.readFile(dePath, 'utf8', function(err, data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        // 添加id，唯一不重复
        student.id = students[students.length-1].id +1
        //将用户传递的数据对象保存到数组中
        students.push(student)
        //将对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })
        //将字符串保存到文件中
        fs.writeFile(dePath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

//更新学生
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
      student.id = parseInt(student.id)
      // EcmaScript 6 中的一个数组方法：find
      // 需要接收一个函数作为参数
      // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
      var stu = students.find(function (item) {
        return item.id === student.id
      })
  
      // 遍历拷贝对象
      for (var key in student) {
        stu[key] = student[key]
      }
  
      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
        students: students
      })
  
      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          // 错误就是把错误对象传递给它
          return callback(err)
        }
        // 成功就没错，所以错误对象是 null
        callback(null)
      })
    })
}
  

//删除学生
exports.deleteById = function(id, callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
          return callback(err)
        }
        var students = JSON.parse(data).students
        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })

        students.splice(deleteId, 1)
        //将对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })
        //将字符串保存到文件中
        fs.writeFile(dbPath, fileData, function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}