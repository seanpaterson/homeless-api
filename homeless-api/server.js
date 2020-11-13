// app.js

const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const copyAllCityInfoWP = require('./http/copyAllCityInfoWP');
const copyAllHomelessPopulations = require('./copyAllHomelessPopulations');
const addHomelessData = require('./sql/addHomelessData');
const getStateHomelessPopulation = require('./sql/getStateHomelessPopulation');
const getCityHomelessPopulation = require('./sql/getCityHomelessPopulation');
const getSupportedStates = require('./sql/getSupportedStates');
const getSupportedCities = require('./sql/getSupportedCities');

require('dotenv').config();

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

const sql = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });
  
  sql.connect(function(err) {
    if (err)
    {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  
  exports.sql = sql;

copyAllCityInfoWP.copyAllCityInfoWP(function(result){
  var array = null;
  if(result == 1)
  {
    array = copyAllHomelessPopulations.copyAllHomelessPopulations();
    
    if(array == null){
      console.log("ERROR: Unable to retrieve homeless population data! Something must be wrong with the population/coc files.");
      return;
    }
    addHomelessData.addHomelessData(array, function(result) {
      
    });
  }
});

app.get('/getStateHomelessPopulation/:state', (req, res) => {
  getStateHomelessPopulation.getStateHomelessPopulation(req.params.state, function(result) {
    if(result == 404)
      res.status(404).send('Unable to complete request!');
    else
      res.status(200).send(JSON.stringify(result));
  });
});

app.get('/getCityHomelessPopulation/:state/:city', (req, res) => {
  getCityHomelessPopulation.getCityHomelessPopulation(req.params.state, req.params.city, function(result) {
    if(result == 404)
      res.status(404).send('Unable to complete request!');
    else
      res.status(200).send(JSON.stringify(result));
  });
});

app.get('/getSupportedStates', (req, res) => {
  getSupportedStates.getSupportedStates(function (result) {
    if(result == 404) 
      res.status(404).send('Unable to complete request!');
    else
      res.status(200).send(result);
  });
  
});

app.get('/getSupportedCities/:state', (req, res) => {
  getSupportedCities.getSupportedCities(req.params.state, function (result) {
    if(result == 404)
      res.status(404).send('Unable to complete request!');
    else
      res.status(200).send(result);
  });
});