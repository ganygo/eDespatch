var os=require('os')

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString()
    var mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
    var dd = this.getDate().toString()
    var HH = this.getHours().toString()
    var min = this.getMinutes().toString()
    var sec = this.getSeconds().toString()
    return yyyy + '-' + (mm[1]?mm:"0" + mm[0]) + '-' + (dd[1]?dd:"0" + dd[0]) 
}

Date.prototype.yyyymmddhhmmss = function (middleChar) {
    var yyyy = this.getFullYear().toString()
    var mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
    var dd = this.getDate().toString()
    var HH = this.getHours().toString()
    var min = this.getMinutes().toString()
    var sec = this.getSeconds().toString()
    return yyyy + '-' + (mm[1]?mm:"0" + mm[0]) + '-' + (dd[1]?dd:"0" + dd[0]) + (middleChar?middleChar:' ') + (HH[1]?HH:"0" + HH[0]) + ':' + (min[1]?min:"0" + min[0]) + ':' + (sec[1]?sec:"0" + sec[0]) 
}

Date.prototype.yyyymmddmilisecond = function () {
    var yyyy = this.getFullYear().toString()
    var mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
    var dd = this.getDate().toString()
    var HH = this.getHours().toString()
    var min = this.getMinutes().toString()
    var sec = this.getSeconds().toString()
    var msec = this.getMilliseconds().toString()
    return yyyy + '-' + (mm[1]?mm:"0" + mm[0]) + '-' + (dd[1]?dd:"0" + dd[0]) + ' ' + (HH[1]?HH:"0" + HH[0]) + ':' + (min[1]?min:"0" + min[0]) + ':' + (sec[1]?sec:"0" + sec[0]) + ':' + msec 
}


Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days)
    return dat
}



exports.timeStamp = function () { return (new Date).yyyymmddhhmmss() }  //UTC time stamp


exports.datefromyyyymmdd = function (text) {
    var yyyy = Number(text.substring(0,4))
    var mm = Number(text.substring(5,7))
    var dd = Number(text.substring(8,10))
    var tarih=new Date(yyyy,mm-1,dd,5,0,0)
    //tarih.setDate(tarih.getDate() + 1)
    return tarih
}

Date.prototype.yyyymmddhhmmss = function (middleChar) {
    var yyyy = this.getFullYear().toString()
    var mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
    var dd = this.getDate().toString()
    var HH = this.getHours().toString()
    var min = this.getMinutes().toString()
    var sec = this.getSeconds().toString()
    return yyyy + '-' + (mm[1]?mm:"0" + mm[0]) + '-' + (dd[1]?dd:"0" + dd[0]) + (middleChar?middleChar:' ') + (HH[1]?HH:"0" + HH[0]) + ':' + (min[1]?min:"0" + min[0]) + ':' + (sec[1]?sec:"0" + sec[0]) 
}

global.atob=require('atob')
global.btoa=require('btoa')

global.tempLog=(fileName,text)=>{
	var tmpDir=os.tmpdir()
	if(config)
		if(config.tmpDir)
			tmpDir=config.tmpDir
	fs.writeFileSync(path.join(tmpDir,fileName),text,'utf8')
}

global.moduleLoader=(folder,suffix,expression,cb)=>{
    try{
    	var moduleHolder={}
        var files=fs.readdirSync(folder)
        
        files.forEach((e)=>{
        	let f = path.join(folder, e)
            if(!fs.statSync(f).isDirectory()){
                var fileName = path.basename(f)
                var apiName = fileName.substr(0, fileName.length - suffix.length)
                if (apiName != '' && (apiName + suffix) == fileName) {
                    moduleHolder[apiName] = require(f)
                }
            }
        })
        
        cb(null,moduleHolder)
    }catch(e){
		errorLog(
	`moduleLoader Error:
		folder:${folder} 
		suffix:${suffix}
		expression:${expression}
		`)
		cb(e)
    }
}

global.downloadFile=(file,req,res)=>{
    var contentType=file.contentType || file.type || 'text/plain'
    var data
    res.contentType(contentType)
    if(contentType.indexOf('text')>-1){
        data=file.data
    }else{
        var raw = atob(file.data)
        var rawLength = raw.length
        var array = new Uint8Array(new ArrayBuffer(rawLength))
        raw.forEach((e,index)=>{
        	array[index] = raw.charCodeAt(index)
        })
        
        eventLog('rawLength:',rawLength)
        eventLog('array.Length:',array.length)
        data=Buffer.from(array)
        res.set('Content-Disposition','attachment filename=' + file.fileName )
    }

    // res.status(200).send(data, { 'Content-Disposition': 'attachment filename=' + file.fileName })
    res.status(200).send(data)
}
