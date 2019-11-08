const Koa = require('koa');
const static_ = require('koa-static')
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const myRouter = require('./router.js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const net = require('net');

const app = new Koa();
const port = process.env.APP_PORT || 3333;
// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.join(__dirname, './ssl/rnlvwyx.cn.key'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, './ssl/rnlvwyx.cn.crt'), 'utf8')
const credentials = {
  key: privateKey,
  cert: certificate,
}

app.context.render = co.wrap(render({
  root: path.join(__dirname, '../client'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  // locals: locals,
  // filters: filters,
  // tags: tags,
  // extensions: extensions,
  // ...your setting
  writeBody: false
}));

// 静态文件目录
app.use(static_(
  path.join(__dirname, '../client/dist')
))

// 路由注册
app.use(bodyParser())
  .use(myRouter.routes())
  .use(myRouter.allowedMethods())

app.listen(3334, () => {
  if (process.env.wait_ready) {
    process.send('ready');
  }
  console.info(`http is run in 3334!`);
});

// 创建https服务器实例
const httpsServer = https.createServer(credentials, app.callback())

// 设置https的访问端口号
// const SSLPORT = 443

// 启动服务器，监听对应的端口
httpsServer.listen(3335, () => {
  if (process.env.wait_ready) {
    process.send('ready');
  }
  // console.info(`canvas-scale-demo is running at port ${port}.`);
  console.log(`HTTPS Server is running on: https://localhost:3335`)
})


net.createServer(function(socket){
  socket.once('data', function(buf){
      // console.log(buf[0]);
      // https数据流的第一位是十六进制“16”，转换成十进制就是22
      var address = buf[0] === 22 ? 3335 : 3334;
      //创建一个指向https或http服务器的链接
      var proxy = net.createConnection(address, function() {
          proxy.write(buf);
          //反向代理的过程，tcp接受的数据交给代理链接，代理链接服务器端返回数据交由socket返回给客户端
          socket.pipe(proxy).pipe(socket);
      });


      proxy.on('error', function(err) {
          console.log(err);
      });
  });

  socket.on('error', function(err) {
      console.log(err);
  });
}).listen(3333);

process.on('uncaughtException', e => {
  // logger.error(e);
  process.exit(1);
});
