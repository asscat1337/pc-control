const {DataTypes} = require('sequelize')
const connection = require('./config');

const PC = connection.define('pc',{
    pc_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ip:{
        type:DataTypes.STRING,
        allowNull:false
    },
    destination:{
        type:DataTypes.STRING,
        allowNull:false
    },
    inventory:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = PC