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
    ip_address:{
        type:DataTypes.STRING,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})
Department.hasOne(PC,{foreignKey:"department",onDelete:"cascade"})
module.exports = Department
