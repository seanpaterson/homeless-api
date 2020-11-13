sql = require('../server');

function addLocationInfo(arr, callback)
{
    let create_tb_query_str = "CREATE TABLE IF NOT EXISTS locations (" +
        "location_id int NOT NULL AUTO_INCREMENT, " +
        "city varchar(255) NOT NULL, " +
        "state varchar(25) NOT NULL, " +
        "coc varchar(25) NOT NULL, " +
        "general_population int NOT NULL, " +
        "homeless_population int NOT NULL, " +
        "PRIMARY KEY (city, state)," +
        "KEY (location_id)" +
        ");";
    
    let insert_location_info_query = "INSERT IGNORE INTO locations (city, state, general_population) VALUES "
    var i;
        sql.sql.query(create_tb_query_str, function(err){
            if(err){
                console.log(err);
                callback(0);
            }
            else {
                for(i = 0; i < arr.length; ++i) {
                    arr[i].state = arr[i].state.replace("\\", "");
                    insert_location_info_query += `(\'${arr[i].city}\', \'${arr[i].state}\', ${arr[i].population})`
                    if(i + 1 != arr.length)
                        insert_location_info_query += ', ';
                }
                insert_location_info_query += ';';
                sql.sql.query(insert_location_info_query, function(err) {
                    if(err){
                        console.log(err);
                        callback(0);
                    }
                    else
                        callback(1);
                });
            }
        });
    
    
}

module.exports.addLocationInfo = addLocationInfo;