const PC = require('../model/PC');
const Category = require('../model/Category')
const Department = require('../model/Department')
const IP = require('../model/Ip');
const { apply } = require('file-loader');


class mainController {
    async subject(req,res,next){
        try{
            const arr = []
            await PC.findAll({raw:true})
                .then(async (data)=>{
                    for await(const item of data) {
                       const categoryData =  await Category.findByPk(item.category,{raw:true})
                       const departmentData = await Department.findByPk(item.department,{raw:true})
                       arr.push({...categoryData,...departmentData,...item})
                    }
                })
            return res.json(arr)
        }catch (e) {
            console.log(e)
        }
    }
    async addSubject(req,res,next){
        try{
            const {description,ip,destination,inventory,department_id,category_id} = req.body
            await PC.create({description,destination,inventory,ip,category:category_id,department:department_id})
                .then(res.json({message:'Запись добавлена успешно'}))
        }catch (e) {
            console.log(e)
        }
    }
    async updateSubject(req,res,next){
        try{
            const {description,destination,inventory,ip,pc_id,category_id} = req.body
            await PC.update({description,destination,inventory,ip,category_id},{
                where:{
                    pc_id
                }
            }).then(res.json({message:'Запись обновлена'}))
        }catch (e) {
            console.log(e)
        }
    }
    async deleteSubject(req,res,next) {
        try {
            const {id} = req.body
            await PC.destroy({
                where: {
                    pc_id: id
                }
            }).then(res.json({message: 'Запись удалена'}))
        } catch (e) {
            console.log(e)
        }
    }
    async showService(req,res,next){
        try{
            await Category.findAll().then(data=>{
                res.json(data)
            })
        }catch (e) {
            console.log(e)
        }
    }
    async showDepartment(req,res,next){
        try{
            const arr = []
            const getDepartent = await Department.findAll({raw:true})
            for await ( const item of getDepartent){
                await IP.findByPk(item.ip,{raw:true})
                    .then(data=>{
                        arr.push({...data,...item})
                    })
            }
            return res.json(arr)
            // getDepartent.map(async(item)=>{
            //     await IP.findByPk(item.ip,{raw:true})
            //     .then(data=>{
            //         arr.push({...data,...item})
            //     })
            //     return res.json(arr)
            // })
        }catch (e) {
            console.log(e)
        }
    }
    async LoginUser(req,res,next){
        try{
            res.send({'test':123})
        }catch(e){

        }
    }
}


module.exports = new mainController()