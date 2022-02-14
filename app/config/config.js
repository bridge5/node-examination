
const RES = {

    INVALIDIDSUPPLIED:{
        code: 400,
        description: "Invalid ID supplied"
    },
    PLAYERNOTFOUND:{
        code: 404,
        description: "Player not found"
    },
    INVALIDINPUT:{
        code: 405,
        description: "Invalid input"
    },
    VALIDATIONEXCEPTION:{
        code: 405,
        description: "Validation exception"
    },    
    SUCCESS:{
        code: 200,
        description: "success"
    },
    SUCCESSANDDATA:{
        code: 200,
        description: "success",
        data: null
    }
}

module.exports={
    RES
    
}
