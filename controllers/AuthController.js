const yup = require('yup')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const http = require('../services/http')

class AuthController{
    constructor(){}

    async login(req,res){
        const schema = yup.object().shape({
            email:yup.string().email(),
            password:yup.string().required()
        })

        schema.validate(req.body).catch(err=>{
            res.json({
                error:true,
                data:err
            })
        })

        const user = await UserModel.findOne(req.body)
        
        if(!user){
            res.json({
                error:true,
                data:[
                    'User not found'
                ]
            })    
        }

        res.json({
            error:false,
            user,
            token:jwt.sign(user.id,process.env.SECRET_KEY)
        })
    }
    async register(req,res){
        const schema = yup.object().shape({
            email:yup.string().email(),
            password:yup.string().required(),
            tagName:yup.string().required()
        })

        schema.validate(req.body).catch(err=>{
            res.json({
                error:true,
                data:err
            })
        })

        const data = await http.get(`/players/${encodeURIComponent(req.body.tagName)}`)
        
        res.json({
            data
        })
    }
}

module.exports = new AuthController