const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt

const User = require('../model/User')

// passport.use(new LocalStrategy({
//     usernameField:'username',
//     passwordField:'password',
//     session:false
// },(username,password,done)=>{
//     User.findOne({where:{login:username}})
//         .then((err,user)=>{
//             if(err){
//                 return done(err)
//             }
//             if(!user) return done(null,false,{'message':'Нет юзера'})
//             return done(user)
//         })
// }
// ))


const opts={}
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.ACESS_SECRET

passport.use(
    new JWTStrategy(opts,({username},cb)=>{
        User.findOne({where:{login:username}})
            .then(user=>{
                // console.log(user,'lol')
                if(!user) return cb(null,false,'User not defined.Please,login')
                return cb(null,user)
            })
            .catch(err=>cb(err))
    })
)

module.exports = passport