const {DataTypes} = require('sequelize')
const connection = require('./config')

const Department = require('./Department')

const IP = connection.define('ip',{
    ip_id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type:DataTypes.INTEGER
    },
    ip_address:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

IP.hasOne(Department,{foreignKey:"ip",onDelete:"cascade"})

module.exports = IP