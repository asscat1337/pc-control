const PC = require('../model/PC');
const Category = require('../model/Category')
const Department = require('../model/Department')
const IP = require('../model/Ip');
const History = require('../model/History')
const Comments = require('../model/Comments')
const dayjs = require('dayjs')



class mainController {
    async subject(req, res, next) {
        try {
            const {page,size} = req.query
            console.log(page,size)
            await PC.findAndCountAll({
              limit:Number(size),
              offset: Number(page),
             include:[
                 {model:Category,attributes:["category_title","category_id"]},
                 {model:Department,attributes:["department_title","department_id"]}
             ]
            })
                .then((data) => {
                    const mappedData = data.rows.map(item=>{
                        const obj =  {
                            pc_id:item.pc_id,
                            description:item.description,
                            ip:item.ip,
                            inventory:item.inventory,
                            destination:item.destination,
                            departmentId:item.departmentId,
                            categoryId: item.categoryId,
                            author:item.author
                        }
                         const {category_title} = item.categories[0];
                         const {department_title} = item.departments[0]
                         return {...obj,category_title,department_title}
                    })
                    res.status(200).send({count:data.count,rows:mappedData})
                })
        } catch (e) {
            console.log(e)
        }
    }

    async addSubject(req, res, next) {
        try {
            console.log(req.body)
            const {description, ip, destination, inventory, department_id, category_id} = req.body
            await PC.create({description, destination, inventory, ip, categoryId: category_id, departmentId: department_id})
                .then(data=>res.json({message: 'Запись добавлена успешно',data}))
        } catch (e) {
            console.log(e)
        }
    }

    async updateSubject(req, res, next) {
        try {
            const {description, destination, inventory, ip, pc_id,department_id} = req.body
            await PC.update({description, destination, inventory, ip,departmentId:department_id}, {
                where: {
                    pc_id
                }
            }).then(res.json({message: 'Запись обновлена'}))
        } catch (e) {
            console.log(e)
        }
    }

    async deleteSubject(req, res, next) {
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

    async showService(req, res, next) {
        try {
            await Category.findAll().then(data => {
                res.json(data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    async showDepartment(req, res, next) {
        try {
            const arr = []
            const getDepartent = await Department.findAll({raw: true})
            for await (const item of getDepartent) {
                await IP.findByPk(item.ip_id, {raw: true})
                    .then(data => {
                        arr.push({...data, ...item})
                    })
            }
            return res.json(arr)
        } catch (e) {
            console.log(e)
        }
    }
    async showEditDepartment(req,res,next){
        try{
            await Department.findAll()
                .then(data=>res.json(data))
        }catch (e) {
            console.log(e)
        }
    }
    async addHistoryMoving(req,res,next){
        try{
            const {destination,department_title,pc_id} = req.body
            await History.create({previous:destination,department:department_title,pcId:pc_id})
                .then(res.json({'message':'123'}))

        }catch (e) {
            console.log(e)
        }
    }
    async showDetails(req,res,next){
        try{
            const {id} = req.params
            console.log(req.params.id)
            const getHistory = await History.findAll({where:{pcId:id}})
            const getComments = await Comments.findAll({
                where: {
                    pcId:id
                }
            })
            return res.json({comment:getComments,history:getHistory})
        }catch (e) {
            console.log(e)
        }
    }
    async addComment(req,res,next){
        try{
            const {pcId,title,nickname,added} = req.body
           await Comments.create({title,pcId,nickname,added:dayjs(added).format()})
               .then(res.json({'message':'OK'}))
        }catch (e) {
            console.log(e)
        }
    }
    async deleteComment(req,res,next){
        try{
            const {id} = req.body;
            await Comments.destroy({where:{comment_id:id}})
                .then(res.json({'message':'Комментарий удален'}))
        }catch (e) {
            console.log(e)
        }
    }
}



module.exports = new mainController()