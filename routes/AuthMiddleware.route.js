// to check user is authenticated or not
module.exports.isAuth = (req,res,next) => {
    if(req.isAuthenticate()){
        next()
    }else{
        res.status(401).json({msg : "You are not authenticate"});
    }
}

// to check wether user is admin or not
module.exports.isAdmin = (req,res,next) => {
    if(req.isAuthenticate() && req.user.status === "ADMIN"){
        next()
    }else{
        res.status(401).json({msg : "You are not authenticate becauser you are not an admin"});
    }
}