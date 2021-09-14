const {DataTypes} = require('sequelize')
const connection = require('./config');
const PC = require('./PC');

const Category = connection.define('categories',{
    category_id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})
Category.hasOne(PC,{onDelete:"cascade"})
module.exports = Category