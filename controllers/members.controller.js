module.exports = (member, req, res, cb)=>{
	db.members.find({},(err,docs)=>{
		if(!err){
			cb(null,docs)
		}else{
			cb(err)
		}
	})
    // switch(req.method){
    //     // case 'GET':
        
    //     // break;
    //     // case 'POST':
        
    //     // break;
    //     // case 'PUT':
        
    //     // break;
    //     // case 'DELETE':
        
    //     // break;
    //     default:
    //     callback({success: false, error: {code: 'WRONG_METHOD', message: 'Method was wrong!'}});
    //     break;
    // }

}
