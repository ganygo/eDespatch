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

	app.all('/:func', (req, res, next)=>{
		passport(req,res,(err,member)=>{
			var ctl=getController(req.params.func)
			ctl(member,req,res,(err,data)=>{
				if(!err){
					res.status(200).json({ success:true, data: data })
				}else{
					throw Error(err.message)
				}
			})
		})
		

		// var controller=require('../')
		
	})

	// catch 404 and forward to error handler
	app.use((req, res, next)=>{
		next(()=>{
			res.status(404).json({ success:false, error:{code:'404',message:'function not found'}})
		})
	})


	app.use((err,req, res, next)=>{
		res.status(500).json({ success:false, error:{code:'500',message:err.toString()}})
	})
	
	function getController(funcName){

		var controllerName=path.join(__dirname,'../controllers',`${funcName}.controller.js`)
		console.log(controllerName)
		if(fs.existsSync(controllerName)==false){
			throw Error(`'${funcName}' controller function was not found`)
		}else{
			return require(controllerName)
		}
	}

}
