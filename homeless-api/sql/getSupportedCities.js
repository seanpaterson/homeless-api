sql = require('../server');

function getSupportedCities(state, callback)
{
    let result = {
        data: []
    };
    let city_query = `SELECT * FROM locations WHERE state = \'${state}\';`;

    sql.sql.query(city_query, function (err, res) {
        if(err)
        {
            console.log(err);
            callback(404);
        }
        else {
            res.forEach(obj => {
                result.data.push({
                    state: obj.state,
                    city: obj.city,
                    generalPopulation: obj.general_population,
                    homelessPopulation: obj.homeless_population,
                    COC: obj.coc
                });
            });

            callback(result);
        }
    });
}

module.exports.getSupportedCities = getSupportedCities;