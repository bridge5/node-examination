const Player = require('../models/player.model.js');

// Create a new player
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id) {
        return res.status(405).send({
            message: "Invalid input: Player id can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(405).send({
            message: "Invalid input: Player name can not be empty"
        });
    }
    if(!req.body.position) {
        return res.status(405).send({
            message: "Invalid input: Player position can not be empty"
        });
    }
    
    // Check player with same id
    var query = { id: req.body.id };
    Player.find(query)
    .then(players => {
        if(players && players.length > 0){
           return res.status(405).send({
                message: "Invalid input: Player with id " + req.body.id + " already exist"
            }); 
        }else{
            // Create a player
            const player = new Player({
                id: req.body.id,
                name: req.body.name, 
                position: req.body.position
            });

            // Save player in the database
            player.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the player."
                });
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving players."
        });
    });
};

// Get all players from the database.
exports.findAll = (req, res) => {
    Player.find()
    .then(players => {
        res.send(players);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving players."
        });
    });
};

// Find player by ID
exports.findOne = (req, res) => {
    var query = { id: req.params.playerId };
    
    Player.findOne(query)
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });            
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: err.message || "Error retrieving player with id " + req.params.playerId
        });
    });
};

// Update player
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id) {
        return res.status(405).send({
            message: "Invalid input: Player id can not be empty"
        });
    }
    if(!req.body.name) {
        return res.status(405).send({
            message: "Invalid input: Player name can not be empty"
        });
    }
    if(!req.body.position) {
        return res.status(405).send({
            message: "Invalid input: Player position can not be empty"
        });
    }

    // Find player and update it with the request body
    var query = { id: req.body.id };
    
    Player.findOneAndUpdate(query, {
        name: req.body.name, 
        position: req.body.position
    }, {new: true})
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.body.id
            });
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.body.id
            });                
        }
        return res.status(500).send({
            message: err.message || "Error updating player with id " + req.body.id
        });
    });
};

// Delete player by ID
exports.delete = (req, res) => {
    var query = { id: req.params.playerId };
    
    Player.findOneAndRemove(query)
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send({message: "Player deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: err.message || "Could not delete player with id " + req.params.playerId
        });
    });
};