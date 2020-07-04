module.exports = (dbModel, req, res, cb)=>{
	if(req.params.param1==undefined)
		error.param1(req)
    switch(req.method){
        case 'GET':
        	dbModel.despatches.findOne({_id:req.params.param1}).populate('eIntegrator').exec((err,doc)=>{
        		if(dberr(err,cb))
        			if(dbnull(doc,cb)){
        				eDespatch.xsltView(dbModel,doc,cb)
        				// callback(null,doc.despatchErrors)
        			}
        	})
        break
        default:
        error.method(req)
        break
    }

}
