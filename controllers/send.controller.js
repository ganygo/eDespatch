module.exports = (dbModel, req, res, cb)=>{
	if(req.params.param1==undefined)
		error.param1(req)
    switch(req.method){
        case 'GET':
        case 'POST':
        	dbModel.despatches.findOne({_id:req.params.param1}).populate('eIntegrator').exec((err,doc)=>{
        		if(dberr(err,cb))
        			if(dbnull(doc,cb)){
        				var taskData={
        					taskType:'edespatch_send_to_gib',
        					collectionName:'despatches',
        					documentId:doc._id,
        					document:doc.toJSON(),
        					status:'pending'
        				}
        				taskHelper.newTask(dbModel,taskData,(err,taskDoc)=>{
        					if(!err){
        						cb(null,{taskId:taskDoc._id,taskType:taskDoc.taskType,collectionName:taskDoc.collectionName,documentId:taskDoc.documentId,status:taskDoc.status})
        					}else{
        						cb(err)
        					}
        				})
        			}
        	})
        break
        
        default:
        error.method(req)
        break
    }

}
