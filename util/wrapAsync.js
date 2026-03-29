module.exports=(fn)=>{
    return function(req,res,next){
        return fn(req,res,next).catch(next);
    }
}

// We are using this for the catching and sending error function for the async functions.