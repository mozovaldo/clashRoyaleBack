const jwt = require('jsonwebtoken')

const verifyAuth = (req,res,next) =>{
    const token = req.headers.authorization

    if(!token){
        res.json({
            error:true,
            message:"token nao informado"
        })
    }

    if(!jwt.verify(token,process.env.SECRET_KEY)){
        res.json({
            error:true,
            message:'token invalido'
        })
    }

    next()
}

module.exports = verifyAuth