const {DataTypes} = require('sequelize');
const sequelize = require('./config');
const PC = require('./PC')

const History = sequelize.define('history',{
    history_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    previous:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    department:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    pcId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:PC,
            key:'pc_id'
        }
    }
},{
    timestamps:false,
    freezeTableName:true
})
module.exports = History