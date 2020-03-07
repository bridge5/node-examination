module.exports = {
    findPlayer: async (ctx,playerId) => {
        if(!Number.isInteger(parseInt(playerId))){
            ctx.status = 400;
            return;
        }
        const player = ctx.db.player;
        try {
            const result = await player.findPlayer(playerId);
            if(result == null){
                ctx.status = 404;
            }else{
                ctx.data = {
                    name: result.name,
                    id: result.player_id,
                    position: result.position,
                }
                ctx.status = 200;
            }
        } catch (error) {
            ctx.status = 500;
        }
    },

    createPlayer: async (ctx) => {
        try {
            ctx.verifyParams({
                id:'int',
                name: 'string',
                position:["C", "PF", "SF", "PG", "SG"],
            })
        } catch (error) {
            ctx.status = 400;
            return
        }
        const player = ctx.db.player;
        const data = ctx.request.body;
        try {
            const result = await player.findPlayer(data.id);
            if(result != null){
                ctx.status = 405;
            }else{
                await player.createPlayer(ctx.request.body);
                ctx.status = 200;
            }
        } catch (error) {
            ctx.status = 500;
        }
    },

    deletePlayer: async (ctx,playerId) => {
        if(!Number.isInteger(parseInt(playerId))){
            ctx.status = 400;
            return;
        }
        const player = ctx.db.player;
        try {
            const result = await player.deletePlayer(playerId);
            ctx.status = result == null?404:200;
        } catch (error) {
            ctx.status = 500;
        }

    },

    updatePlayer: async(ctx) => {
        try {
            ctx.verifyParams({
                id:'int',
                name: 'string',
                position:["C", "PF", "SF", "PG", "SG"],
            })
        } catch (error) {
            ctx.status = 400;
            return
        }
        const player = ctx.db.player;
        const data = ctx.request.body;
        try {
            let result = await player.findPlayer(data.id);
            if(result == null){
                ctx.status = 404;
            }else{
                result = await player.updatePlayer(data);
                ctx.status = result == null?404:200;
            }
        } catch (error) {
            ctx.status = 500;
        }
    }
}