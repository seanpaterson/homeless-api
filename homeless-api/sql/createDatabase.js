sql = require('../server');

async function createDatabase(callback) {
    let create_db_query_str = 'CREATE DATABASE IF NOT EXISTS homelessdata;';
    await sql.sql.query(create_db_query_str, function(err, result){
        if(err)
            callback(err, null);
        else
            callback(null, result);
    });
}

module.exports.createDatabase = createDatabase;