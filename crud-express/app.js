var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

//配置模板引擎和body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/*
app.get('/', function(req, res){
    fs.readFile('./db.json', 'utf8', function(err, data){
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
    })
   //res.render('index.html')
})
*/
app.use(router)

app.listen(3000, function(){
    console.log('running...')
})

module.exports = app
