sql = require('../server');

function getStateHomelessPopulation(state, callback)
{
    let result = {
        totalPopulation: 0,
        totalHomelessPopulation: 0,
    };
    let state_hp_query = `SELECT * FROM locations WHERE state = \'${state}\';`;
    sql.sql.query(state_hp_query, function (err, res) {
        if(err)
        {
            console.log(err);
            callback(404);
        }
        else {
            res.forEach(obj => {
                result.totalPopulation += obj.general_population;
                result.totalHomelessPopulation += obj.homeless_population;
            });

            callback(result);
        }      
    })
}

module.exports.getStateHomelessPopulation = getStateHomelessPopulation;