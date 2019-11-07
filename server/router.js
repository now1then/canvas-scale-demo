// 注册路由信息
const Router = require('koa-router');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

const proxy = require('./proxy');

const router = new Router();

const rp = require('request-promise');

router.get('/ok.htm', async (ctx) => { // 用于做应用心跳检查
  ctx.body = 'ok';
});

router.all('*/api/*',async (ctx) => {
  const params = Object.assign(ctx.query, {
    partner_code: 'modelAddress',
    partner_key: 'e0bb59244ef6417fafaa11213ddd3fb1'
  });
  const postData = querystring.stringify(params);
  const opt = {
    hostname: url.parse(global.domain).hostname,
    port: url.parse(global.domain).port || '',
    path:ctx.path.replace('/api/', '/') + '?' + postData,
    method:ctx.method,
    headers:ctx.headers,
  }

  await proxy(opt, ctx).then(res=>{
   if(res){
    ctx.body = res;
   } else {
     ctx.body = {
       success: false,
       errmessage: '请求出错，请刷新重试'
      }
   }

  });
})
router.all('*/answerDemo_api/*',async (ctx) => {
  const params = Object.assign(ctx.query, global.answerDemo);

  const uri = `${global.anserDemo_domain}${ctx.path.replace('/answerDemo_api/', '/')}`
  const options = {
    uri: uri,
    method: ctx.method,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      'content-type': ctx.headers['content-type']
    },
    qs: params,
    form: ctx.request.body,
    // json:true,
  }

  console.log(options);
   await rp(options).then((res) => {
    console.log(res);
    ctx.body = res;
  }).catch((err) => {
    console.log(`${uri}接口调用失败:`,err);
    ctx.body = {
      success: false,
      errmessage: '请求出错，请联系管理员！'
    }
  })
 })


router.get('/demo.html', async (ctx) => { // 智能信审
  ctx.type = 'text/html';
  const mainPath = path.join(__dirname, '../client/dist');

  ctx.body = await ctx.render(mainPath)
});

module.exports = router;
