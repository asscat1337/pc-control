require('dotenv').config()
const express = require('express');
const cors = require('cors');
const passport = require('./password/password');

const mainRouter = require('./router/router');
const userRouter = require('./router/userRouter')

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize())

app.use('/',mainRouter)
app.use('/auth',userRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server started`)
})