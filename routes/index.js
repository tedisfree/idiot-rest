var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var priv = require('../private/config.json');

router.get('/**', function (req, res, next) {

  let _url = req.url.split('?');
  let paths = _url[0].split('/');
  paths = paths.filter(item=>item!=='');

  let responseFile = getApi(paths, priv.apiDefines);
  if(!fs.existsSync(responseFile)) {
    console.warn(`invalid request ${req.url}`)
    res.sendStatus(400);
    return;
  }
  responseFile = path.resolve(responseFile);
  console.log(`response file=${responseFile}`);

  let data = JSON.parse(getResponseJson('get', responseFile));

  if(data['handler']) {
    doHandle(data, req, res);
    return;
  }

  data['headers'] && res.set(data['headers']);
  res.json(data['response']);
})

function getApi(servletPaths, current) {
  if(servletPaths.length==0) {
    return current;
  }
  let next = fs.readdirSync(current).find(file=>file===servletPaths[0]);
  if(next === undefined) {
    return undefined;
  }
  next = path.join(current, next);
  servletPaths.splice(0, 1);
  return getApi(servletPaths, next);
}

function getResponseJson(method, dir) {
  let filepath = path.join(dir, `${method}.json`);
  if(fs.existsSync(filepath)) {
    let data = fs.readFileSync(filepath, 'utf8');
    return data;
  }
  console.error(`no response file in ${dir}`);
  return undefined;
}

function doHandle(data, req, res) {
  console.log(`doHandle with ${data['handler']}`);

  let handler = require(`../handlers/${data['handler']}`);
  handler.handle(data, res, res);
  return;
}

module.exports = router;
