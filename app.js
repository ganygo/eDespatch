global.fs=require('fs')
global.path=require('path')
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
var favicon = require('serve-favicon')

global.util = require('./bin/util')


var indexRouter = require('./routes/index')
var dbLoader = require('./db/db-loader')

var app = express()
var cors = require('cors')
app.use(cors())
var flash = require('connect-flash')

app.use(logger('dev'))
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}))
app.use(cookieParser())

indexRouter(app)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404))
// })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.set('name',require('./package').name)
app.set('version',require('./package').version)
app.set('port',config.httpserver.port)

module.exports=(cb)=>{
	dbLoader((err)=>{
		if(!err){
			cb(null,app)

		}else{
			cb(err)
		}

	})
}
