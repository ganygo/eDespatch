var jwt = require('jsonwebtoken');
module.exports= function (req, res,cb) {
	var IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
	if(IP=='127.0.0.1' || IP=='::1')
		return cb(null,{username:`garfield${IP}`})
	
    if(req.params.func=='login' || req.params.func=='signup' || req.params.func=='register' || req.params.func=='verify' || req.params.func=='forgot-password'){
        cb(null);
    }else{
        var token = req.body.token || req.query.token || req.headers['x-access-token']  || req.headers['token'];
        if (token) {
            jwt.verify(token, 'gizliSir', function (err, decoded) {
                if (err) {
                    cb({ code: 'FAILED_TOKEN', message: 'Yetki hatasi' });
                } else {
                        cb(null,decoded);
                    }
                });
        } else {
            cb({ code: 'NO_TOKEN_PROVIDED', message: 'Yetki hatasi' });
        }
    }
}