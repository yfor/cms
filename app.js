var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var bodyParser = require("body-parser");

var fs = require('fs');
var app = express();
var users = require('./routes/users');
app.use(express.static("./"));
app.use(bodyParser());

var session = require('express-session');
 // view engine setup
 var path = require('path');





app.use(session({
    secret: '12345',
    name: 'llll',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
   // cookie: {maxAge: 6000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


app.post('/login', function(req, res, next){
	 var param = req.body;
	 if(param.name=="admin"&&param.pw=="123456"){
		req.session.user=param;
		res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
		res.end(JSON.stringify({code:0,msg:"ok"})); 
	 }else{
		req.session.user=undefined;
		res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
		res.end(JSON.stringify({code:-1,msg:"name or pw is error"}));  
	 }

})
app.use('/users', users); // 自定义cgi路径
/* 上传*/
app.post('/fileUpload', function(req, res, next){
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './upload/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {

    if(err){
      console.log('parse error: ' + err);
    } else {
	  var dstPaths=[];
	  
	         var obj ={};
        Object.keys(fields).forEach(function(name) {
          
            obj[name] = fields[name];
        });

        Object.keys(files).forEach(function(name) {
            
            obj[name] = files[name];
        });
		
		
      console.log(util.inspect(obj));
		for(var i in files.inputFile){
			      var inputFile = files.inputFile[i];
	  
      var uploadedPath = inputFile.path;
      var dstPath = './upload/' + inputFile.originalFilename;
	  dstPaths.push(dstPath)
      //重命名为真实文件名
      fs.renameSync(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
		}
    }

    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.end(JSON.stringify({files:dstPaths}));
 });
});

 var server = app.listen(80, function () {

  var host = server.address().address || "localhost";
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://127.0.0.1:80", host, port)

})

