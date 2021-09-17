const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('../password/password')


class UserController{
    async login(req,res,next){
        try{
            const {login,password} = req.body
            if(login && password){
                const user = await User.findOne({where:{login:login}},{raw:true})
                if (!user) {
                    res.status(401).json({ message: 'No such user found' });
                }
                const hashedPassport = await bcrypt.compare(password,user.password)
                if(hashedPassport){
                   const payload = {id:user.user_id}
                   let token = jwt.sign(payload,process.env.ACESS_SECRET)
                    res.json({msg:`ok`,token:token})

                }else{
                    res.status(401).json({message:'Неверный пароль'})
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async profile(req,res,next){
        try{
            res.json({'message':'Hello'})
        }catch (e) {
            
        }
    }
}


module.exports = new UserController()