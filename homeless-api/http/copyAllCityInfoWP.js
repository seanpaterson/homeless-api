var axios = require('axios');
var createDatabase = require('../sql/createDatabase');
var addLocationInfo = require('../sql/addLocationInfo');

/*
  Purpose: Obtains the current population of the top 200 cities in
  America with the largest populations.
  Arguments: None
  Returns: None
*/
async function copyAllCityInfoWP(callback)
{
    var arr = [];
    var population;
    var city;
    var state;
    var config = {
        method: 'get',
        url: 'https://worldpopulationreview.com/us-cities',
      };
      
      await axios(config)
      .then(function (response) {
        response = JSON.stringify(response.data)
        response = response.substring(response.indexOf("\"listing") - 1);
        response = response.substring(0, response.indexOf("</script>"));
        while(response.indexOf("pop2020") != -1)
        {
          population = city = state = null;

          //Grab current population
          response = response.substring(response.indexOf("pop2020") + 9);
          population = parseInt(response.substring(1, response.indexOf(",")), 10);

          //Grab city name
          response = response.substring(response.indexOf("nameInfo") + 11);
          response = response.substring(response.indexOf("name") + 6);
          city = response.substring(response.indexOf("\"") + 1, response.indexOf(",") - 2);

          //Grab state name
          response = response.substring(response.indexOf("stateCode") + 11);
          state = response.substring(response.indexOf("\"") + 1, response.indexOf(",") - 4);
          arr.push({city: city, state: state, population: population});
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      //Add these cities to database
      if(arr.length > 0)
      {
        await createDatabase.createDatabase( async function(err, result){
          if(err) {
            console.log(err);
            callback(0);
          }
          else if(result) {
            addLocationInfo.addLocationInfo(arr, function (result) {
                callback(result);
            });
          }
        });
      }
      else
        callback(0);
}

module.exports.copyAllCityInfoWP = copyAllCityInfoWP;