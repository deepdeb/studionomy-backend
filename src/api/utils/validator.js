const xss = require("xss");


let requestFilter   = (data) => {
    if (typeof data == "object"){
       // console.log(objFilter(data))
        return objFilter(data)
    }
   
    return data;
}

let objFilter   =   (data) =>{
    try {
        let objKeys = Object.keys(data);
        for(let i=0;i< objKeys.length;i++){
            if(data[objKeys[i]]==null){
                continue;
            } else if(typeof data[objKeys[i]]=="object"){
                data[objKeys[i]] = objFilter(data[objKeys[i]]) 
            } else {
                data[objKeys[i]] = xss(data[objKeys[i]])
            }
        }
        return data
    } catch (err){
        return {}
    }
};

let validateAlphaNumeric = (data) => {
	var expr = /^[a-zA-Z0-9\s]*$/;
	if (!expr.test(data)) {
		return false;
	} else {
		return true;
	}
};

//xss('<script>alert("xss");</script>');
module.exports = {
    requestFilter:requestFilter,
    validateAlphaNumeric:validateAlphaNumeric
}
