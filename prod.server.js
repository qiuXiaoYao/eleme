var express=require('express');
var config=require('./config/index');

//端口。在./config/index 中的build中添加一个port：9000
var port = process.env.PORT || config.build.port;

var app=express();

var router=express.Router();

router.get('/',function(req,res,next){
	req.url='/index.html';
	next();
})

app.use(router);

//在build dev-server中写过
//用express框架写个node server,利用express router来编写借口请求
//从data.json中读取数据
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

//编写路由
var apiRoutes = express.Router();   //定义路由
//写接口
apiRoutes.get('/seller',function(req,res){
  res.json({
    errno: 0,   //请求数据是正常的
    data: seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
    errno: 0,   //请求数据是正常的
    data: goods
  });
});

apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno: 0,   //请求数据是正常的
    data: ratings
  });
});

//在express中使用路由，用app中的use方法
app.use('/api', apiRoutes);



app.use(express.static('./dist'));

//启动express
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

})