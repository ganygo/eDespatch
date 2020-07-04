var express = require('express');
var router = express.Router();
var passport=require('./passport')

module.exports=(app)=>{
	app.all('/', (req, res, next)=>{
		res.status(200).json({ success:true, 
			data:{
				name:app.get('name'),
				version:app.get('version')
			} 
		})
	})

	clientControllers(app)

	// catch 404 and forward to error handler
	app.use((req, res, next)=>{
		res.status(404).json({ success:false, error:{code:'404',message:'function not found'}})
	})


	app.use((err,req, res, next)=>{
		res.status(500).json({ success:false, error:{code:'500',message:err.toString().substr(7)}})
	})
}

function clientControllers(app){
	
	app.all('/:dbId/*', (req, res, next)=>{
		if(repoDb[req.params.dbId]==undefined){
			throw Error(`dbId:'${req.params.dbId}' bulunamadi`)
		}else{
			next()
		}
	})

	app.all('/:dbId/:func', (req, res, next)=>{

		passport(req,res,(err,member)=>{
			var ctl=getController(req.params.func)
			ctl(repoDb[req.params.dbId],req,res,(err,data)=>{
				if(!err){
					res.status(200).json({ success:true, data: data })
				}else{
					throw Error(err.message)
				}
			})
		})
	})
	app.all('/:dbId/:func/:param1', (req, res, next)=>{
		passport(req,res,(err,member)=>{
			var ctl=getController(req.params.func)
			ctl(repoDb[req.params.dbId],req,res,(err,data)=>{
				if(!err){
					res.status(200).json({ success:true, data: data })
				}else{
					throw Error(err.message)
				}
			})
		})
	})
	app.all('/:dbId/:func/:param1/:param2', (req, res, next)=>{
		passport(req,res,(err,member)=>{
			var ctl=getController(req.params.func)
			ctl(repoDb[req.params.dbId],req,res,(err,data)=>{
				if(!err){
					res.status(200).json({ success:true, data: data })
				}else{
					throw Error(err.message)
				}
			})
		})
	})

	app.all('/:dbId/:func/:param1/:param2/:param3', (req, res, next)=>{
		passport(req,res,(err,member)=>{
			var ctl=getController(req.params.func)
			ctl(repoDb[req.params.dbId],req,res,(err,data)=>{
				if(!err){
					res.status(200).json({ success:true, data: data })
				}else{
					throw Error(err.message)
				}
			})
		})
	})

	function getController(funcName){

		var controllerName=path.join(__dirname,'../controllers',`${funcName}.controller.js`)
		if(fs.existsSync(controllerName)==false){
			throw Error(`'${funcName}' controller function was not found`)
		}else{
			return require(controllerName)
		}
	}
}

global.error={
	param1:(req)=>{
		throw Error(`function:[/${req.params.func}] [/:param1] is required`)
	},
	param2:(req)=>{
		throw Error(`function:[/${req.params.func}/$req.params.param1] [/:param2] is required`)
	},
	method:(req)=>{
		throw Error(`function:[/${req.params.func}] WRONG METHOD: ${req.method}`)
	}
}
