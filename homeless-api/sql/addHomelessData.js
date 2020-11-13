sql = require('../server');

function addHomelessData(arr, callback)
{
    var finalHomelessResult = [];
    var select_location_str = "SELECT * FROM locations;";

    if(arr.length == 0)
        callback(0);

    sql.sql.query(select_location_str, function (err, result){
        if(err)
        {
            console.log(err);
            callback(0);
        }
        else {
            let found = 0
            for(i = 0; i < result.length; ++i)
            {
                found = 0;
                for(j = 0; j < arr.length; ++j)
                {
                    if(arr[j].name.includes(result[i].city, 0))
                    {
                        finalHomelessResult.push({
                            location_id: result[i].location_id,
                            population: arr[j].population,
                            coc: arr[j].coc
                        });
                        found = 1;
                        break;
                    }
                }
            }
            finalHomelessResult.forEach(entry => {
                var update_homeless_data = `UPDATE locations SET coc = \'${entry.coc}\', homeless_population = ${entry.population} ` +
                `WHERE location_id = ${entry.location_id}`;
                sql.sql.query(update_homeless_data, function (err) {
                    if(err)
                        console.log(err);
                });
            });
        }
    });
}

module.exports.addHomelessData = addHomelessData;