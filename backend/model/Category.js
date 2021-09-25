const {DataTypes} = require('sequelize')
const connection = require('./config');
const PC = require('./PC')
const Category = connection.define('categories',{
    category_id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
    },
    category_title:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'categories',
    timestamps:false
})
module.exports = Category