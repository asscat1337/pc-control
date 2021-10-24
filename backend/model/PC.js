const {DataTypes} = require('sequelize')
const connection = require('./config');
const Category = require('./Category')
const Department = require('./Department')
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
    departmentId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Department,
            key:'department_id'
        },
        field:'department'
    },
    categoryId:{   
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Category,
            key:'category_id'
        },
        field:'category'
    },
    author:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
},{
    tableName:'pc',
    timestamps:false
})
    PC.hasMany(Category,{foreignKey:'category_id',sourceKey:'categoryId',constraints:false})
    PC.hasMany(Department,{foreignKey:'department_id',sourceKey:'departmentId',constraints:false})

module.exports = PC