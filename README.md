# homeless-api
Open source API that supplies data on homeless populations

#Endpoints

getStateHomelessPopulation: Returns the total general and homeless population of the given state.

e.g. `localhost:8000/getStateHomelessPopulation/OR`

getCityHomelessPopulation: Returns a set of data based on state/city.

e.g. `localhost:8000/getCityHomelessPopulation/CA/San Diego`

getSupportedStates: Returns a list of all of the states with active homeless data

e.g. `localhost:8000/getSupportedStates`

getSupportedCities: Returns data sets for all cities supported in the given state.

e.g. `localhost:8000/getSupportedCities/OR`
