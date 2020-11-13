sql = require('../server');

function getCityHomelessPopulation(state, city, callback)
{
    let result = {
        state: '',
        city: '',
        generalPopulation: 0,
        homelessPopulation: 0,
        COC: ''
    };
    let city_hp_query = `SELECT * FROM locations WHERE city = \'${city}\' AND state = \'${state}\';`;

    console.log(city_hp_query);

    sql.sql.query(city_hp_query, function(err, res) {
        if(err)
        {
            console.log(err);
            callback(404);
        }
        else {
            res.forEach(obj => {
                result = {
                    state: obj.state,
                    city: obj.city,
                    generalPopulation: obj.general_population,
                    homelessPopulation: obj.homeless_population,
                    COC: obj.coc
                };
            });

            callback(result);
        }
    });
}

module.exports.getCityHomelessPopulation = getCityHomelessPopulation;