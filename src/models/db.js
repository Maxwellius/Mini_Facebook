'user strict';
const util = require('util');
const mysql = require('mysql');

config = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'mini_facebook'
}
//local mysql db connection
function makeDB(config) {
    const connection = mysql.createConnection(config);

    return {
        query(sql, args){
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close(){
            return util.promisify(connection.end).call(connection);
        }
    };
}

const db = makeDB(config)
module.exports = db;