const {DataTypes} = require('sequelize');
const connection = require('./config');
const PC = require('./PC')

const Department = connection.define('department',{
    department_id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER,
        allowNull:false
    },
    department_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ip_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName:'department',
    timestamps:false
})
module.exports = Department
    