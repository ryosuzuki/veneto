
var fs = require('fs');
var path = require('path');
var http = require('http');
var route = require('koa-route');
var views = require('co-views');
var favicon = require('koa-favicon');
var serve = require('koa-static');
var parser = require('koa-bodyparser');
var koa = require('koa');
var Q = require('q');

var app = koa();
var server = http.createServer(app.callback());
var port = process.env.PORT || 3000;

app.use(serve('.'));
app.use(favicon('/public/img/favicon.ico'));
app.use(parser({
  strict: false,
}));
app.use( function *(next) {
  this.render = views('views', {
    map: { html: 'swig' },
  });
  yield next;
});
app.use(route.get('/', index));
app.use(route.get('/favicon.ico', null));
app.use(route.get('/:id', show));
app.use(route.post('/send', send))


function *send() {
  var htmlStr = this.request.body.html;
  // json = JSON.parse(json);
  // var result = compute.getField(json);
  // this.response.body = result;
}

function *index() {
  this.body = yield this.render('index');
}

function *show(id) {
  this.body = yield this.render(id)
}




app.listen(port);

module.exports = app;