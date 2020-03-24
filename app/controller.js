const Player = require('./schema')

function response(code,mess,data){
    return{
        code: code,
        mess: mess,
        data: data
    }
}

exports.get_player = async (ctx, next) => {
    let { id } = ctx.params
    if(!id)
        ctx.body = response(400,'Invalid ID supplied')
    id = Number(id)
    let player = await Player.findOne({id},{_id:0,__v:0})
    if(player){
        ctx.body = response(200,'successful operation',player)
    }else
        ctx.body = response(404,'Player not found')
}

exports.add_player = async (ctx, next) => {
    let { id,name,position } = ctx.request.body
    if(!id || name || position)
        ctx.body = response(405,'Invalid input')

    id = Number(id)
    name = String(name)
    position = String(position)
    let player = await Player.findOne({id,name,position})
    if(player)
        ctx.body = response(405,'player has already existed')

    let players = new Player({
        id,name,position
    })
    await players.save()
    let result = await Player.findOne({id,name,position},{_id:0,__v:0})
    ctx.body = response(200,'successful operation',result)
}

exports.edit_player = async (ctx, next) => {
    let { id,name,position } = ctx.request.body
    if(!id)
        ctx.body = response(400,'Invalid ID supplied')

    id = Number(id)
    let player = await Player.find({id})
    if(player.length<0)
        ctx.body = response(404,'Player not found')

    let result = await Player.update({id},{name,position})
    if(result.nModified>0){
        ctx.body = response(200,'successful operation')
    }else{
        ctx.body = response(405,'Validation exception')
    }
}

exports.del_player = async (ctx, next) => {
    let { id } = ctx.params
    if(!id)
        ctx.body = response(400,'Invalid ID supplied')

    id = Number(id)
    let player = await Player.findOne({id})
    if(!player)
        ctx.body = response(404,'Player not found')
    let result = await Player.deleteOne({id})
    if(result.deletedCount>0){
        ctx.body = response(200,'successful operation') 
    }else{
        ctx.body = response(200,'failed operation',)
    } 
}