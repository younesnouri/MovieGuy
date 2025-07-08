const Pool = require("pg").Pool

const pool = new Pool({

    user: "postgres" ,
    password :"realmadrid1902" ,
    host : "localhost"  ,
    port:  5432  ,
    database : "movieguy" 
})


module.exports = pool