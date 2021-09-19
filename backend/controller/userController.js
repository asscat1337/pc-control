const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('../password/password')


class UserController{
    async login(req,res,next){
        try{
            const {login,password} = req.body
            if(login && password){
                const user = await User.findOne({where:{login}},{raw:true})
                const hashedPassport = await bcrypt.compare(password,user.password)
                if (!user) {
                    res.status(401).json({ message: 'No such user found' });
                }
                if(hashedPassport){
                   const payload = {id:user.user_id,login:login}
                   let token = jwt.sign(payload,process.env.ACESS_SECRET)
                    res.json({msg:`ok`,token:token,login:login,role:user.role})

                }else{
                    res.status(401).send({message:'Неверный пароль'})
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async register(req,res,next){
        const {login,password} = req.body
        const candidate = await User.findOne({where:{
            login
        }})
        if(candidate){
            res.status(403).json({message:'Пользователь уже существует'})
        }
        const hashPassword = await bcrypt.hash(password,10)
        await User.create({
            login,
            password:hashPassword,
            role:"user"
        }).then(res.json({message:'Пользователь успешно зарегистрирован'}))

    }
    async profile(req,res,next){
        try{
            res.json({'message':'Hello'})
        }catch (e) {
            
        }
    }
}


module.exports = new UserController()