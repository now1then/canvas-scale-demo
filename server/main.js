const Koa = require('koa');
const static_ = require('koa-static')
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const myRouter = require('./router.js');

const app = new Koa();
const port = process.env.APP_PORT || 3333;

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

app.listen(port, () => {
  if (process.env.wait_ready) {
    process.send('ready');
  }
  console.info(`creditwebnode is running at port ${port}.`);
});

process.on('uncaughtException', e => {
  // logger.error(e);
  process.exit(1);
});
