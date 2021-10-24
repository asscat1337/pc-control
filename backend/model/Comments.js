const {DataTypes} = require('sequelize');
const sequelize = require('./config');

const PC = require('./PC')


const Comments = sequelize.define('comments',{
    comment_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    title:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    pcId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'PC',
            key:'pc_id'
        }
    }
},{
    timestamps:false,
    freezeTableName:true
})
Comments.hasMany(PC,{foreignKey:'pc_id',sourceKey:'pcId',constraints:false})


module.exports = Comments