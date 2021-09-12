require('dotenv').config()
const express = require('express');
const cors = require('cors');

const mainRouter = require('./router/router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/',mainRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server started`)
})