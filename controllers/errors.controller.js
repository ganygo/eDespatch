module.exports = (dbModel, req, res, callback)=>{
	if(req.params.param1==undefined)
		throw Error('[/:param1] is required')
    switch(req.method){
        case 'GET':
        	dbModel.despatches.findOne({_id:req.params.param1},(err,doc)=>{
        		if(dberr(err,callback))
        			if(dbnull(doc,callback)){
        				callback(null,doc.despatchErrors)
        			}
        	})
        break;
        // case 'POST':
        
        // break;
        // case 'PUT':
        
        // break;
        // case 'DELETE':
        
        // break;
        default:
        throw Error(`WRONG METHOD: ${req.method}`)
        break;
    }

}
