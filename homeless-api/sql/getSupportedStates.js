sql = require('../server');

function getSupportedStates(callback)
{
    let result = {
         states:[]
    };
    supported_states_query = `SELECT DISTINCT state FROM locations WHERE homeless_population > 0;`;
    sql.sql.query(supported_states_query, function (err, res) {
        if(err) {
            console.log(err);
            callback(403);
        }
        else {
            res.forEach(obj => {
                result.states.push(obj.state);
            });

            callback(result);
        }
    });
}

module.exports.getSupportedStates = getSupportedStates;