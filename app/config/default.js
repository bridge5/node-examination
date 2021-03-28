const DBURL=`mongodb://localhost:27017/";`;
const DBNAME=`nba`;
const SERVERPORT=8000;
const RESPONSE={

    INVALIDIDSUPPLIED:{
        code:400,
        description:"Invalid ID supplied"
    },
    PLAYERNOTFOUND:{
        code:404,
        description:"Player not found"
    },
    VALIDATIONEXCEPTION:{
        code:405,
        description:"Validation exception"
    },
    INVALIDINPUT:{
        code:405,
        description:"Invalid input"
    },
    SUCCESS:{
        code:200,
        description:"success"
    },
    SUCCESSWITHDATA:{
        code:200,
        description:"success",
        data:null
    }
}
module.exports={
    DBURL,
    DBNAME,
    RESPONSE,
    SERVERPORT
}
