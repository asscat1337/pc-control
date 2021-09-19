const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt

const User = require('../model/User')

const opts={}
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.ACESS_SECRET

passport.use(
    new JWTStrategy(opts,({login},cb)=>{
        User.findOne({where:{login:login}})
            .then(user=>{
                if(!user) return cb(null,false,'User not defined.Please,login')
                return cb(null,user)
            })
            .catch(err=>cb(err))
    })
)

module.exports = passport