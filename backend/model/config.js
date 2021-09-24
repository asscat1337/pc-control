const {Sequelize} = require('sequelize')

const {DB_PASSWORD,DB_USER,DB_HOST,DB} = process.env

const connection = new Sequelize(DB,DB_USER,DB_PASSWORD,{
    host:DB_HOST,
    dialect:"mysql"
});

async function start(){
    try{
        await connection.authenticate();
      await connection.sync({alter:true})
        console.log(`Connected to db`)
    }catch (e) {
        console.log(e)
    }
}

start()

module.exports = connection