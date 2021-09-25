const PC = require('../model/PC');
const Category = require('../model/Category')
const Department = require('../model/Department')
const IP = require('../model/Ip');
const User = require('../model/User')


class mainController {
    async subject(req, res, next) {
        try {
            const {page,size} = req.query
            console.log(page,size)
            await PC.findAndCountAll({
              limit:Number(size),
              offset: Number(page) ===1 ? 0 : Number(page)+Number(size),
             include:[
                 {model:Category,attributes:["category_title","category_id"]},
                 {model:Department,attributes:["department_title","department_id"]}
             ],
            })
                .then(async (data) => {
                    return res.json(data)
                })
        } catch (e) {
            console.log(e)
        }
    }

    async addSubject(req, res, next) {
        try {
            const {description, ip, destination, inventory, department_id, category_id} = req.body
            await PC.create({description, destination, inventory, ip, category: category_id, department: department_id})
                .then(res.json({message: 'Запись добавлена успешно'}))
        } catch (e) {
            console.log(e)
        }
    }

    async updateSubject(req, res, next) {
        try {
            const {description, destination, inventory, ip, pc_id, category_id} = req.body
            await PC.update({description, destination, inventory, ip, category_id}, {
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
                await IP.findByPk(item.ip, {raw: true})
                    .then(data => {
                        arr.push({...data, ...item})
                    })
            }
            return res.json(arr)
        } catch (e) {
            console.log(e)
        }
    }
}



module.exports = new mainController()