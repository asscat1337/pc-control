const PC = require('../model/PC');


class mainController {
    async subject(req,res,next){
        try{
            await PC.findAll().then(data=>res.json(data))
        }catch (e) {
            console.log(e)
        }
    }
    async addSubject(req,res,next){
        try{
            const {description,destination,inventory,ip,pc_id} = req.body
            await PC.create({description,destination,inventory,ip,category_id: pc_id})
                .then(res.json({message:'Запись добавлена успешно'}))
            // await PC.create()
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
}


module.exports = new mainController()