const Koa = require('koa');
const static_ = require('koa-static')
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const myRouter = require('./router.js');
const fs = require('fs');
const https = require('https');

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

// app.listen(port, () => {
//   if (process.env.wait_ready) {
//     process.send('ready');
//   }
//   console.info(`creditwebnode is running at port ${port}.`);
// });
// 创建https服务器实例
const httpsServer = https.createServer(credentials, app.callback())

// 设置https的访问端口号
// const SSLPORT = 443

// 启动服务器，监听对应的端口
httpsServer.listen(port, () => {
  if (process.env.wait_ready) {
    process.send('ready');
  }
  console.info(`canvas-scale-demo is running at port ${port}.`);
  console.log(`HTTPS Server is running on: https://localhost:${port}`)
})

process.on('uncaughtException', e => {
  // logger.error(e);
  process.exit(1);
});
