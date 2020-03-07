const Sequelize = require('sequelize');
module.exports = function(sequelize) {
    const Player = sequelize.define('player_info',{
        player_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        position: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },{
        timestamps: false,
        underscored: true,
        tableName: 'player_info',
    })

    Player.findPlayer = (id) => {
        return Player.findOne({
            where:{
                player_id:id,
            }
        }).then(player => {
            return player?player:null;
        })
    }

    Player.createPlayer = ({id,name,position}) => {
        return Player.create({
            player_id:id,
            name,
            position,
        }).then(player => {
            return player?player:null;
        })
    }



    Player.deletePlayer = (id) => {
        return Player.destroy({
            where:{
                player_id:id,
            }
        }).then(player => {
            return player?player:null;
        })
    }


    Player.updatePlayer = ({id,name,position}) => {
        return Player.update({
            player_id:id,
            name,
            position,
        },{
            where:{
                player_id:id,
            }
        }).then(player => {
            return player?player:null;
        })
    }
    return Player;
}