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
    }
},{
    freezeTableName:true,
    timestamps:false
})
Department.associate = (model)=>{
    Department.belongsTo(model.PC,{as:'department',foreignKey:'pc_id'})

}
module.exports = Department
    