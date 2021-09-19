
const {DataTypes} = require('sequelize');
const connection = require('./config');


const User = connection.define('users',{
        user_id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        login:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.STRING,
            allowNull:true
        }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = User