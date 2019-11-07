// 后端接口转发
const http = require('http');
const https = require('https');
const querystring = require('querystring');

module.exports = (opt, ctx) => {
  return new Promise(function (resolve, reject) {
    const proxy = https.request(opt, function (res) {
      logger.info('接口：' + opt.hostname + opt.path + '；状态码:' + res.statusCode);
      let renderData = '';
      res.setEncoding('utf8');
      res.on('data', function (body) {
        renderData += body;
      });
      res.on('end', function () {
        //请求结束
        console.log('------------后端请求成功-------------');
        resolve(renderData)
      });
      res.on('error', function (e) {
        resolve(e)
        console.log('请求后台接口异常：', e);
      })
    });
    proxy.on('error', function (e) {
      console.error('请求遇到问题:' + e.message);
      reject(e)
    });

    ctx.request.body && proxy.write(querystring.stringify(ctx.request.body));

    proxy.end();
  })

}
