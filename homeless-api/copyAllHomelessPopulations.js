var fs = require('fs');

function copyAllHomelessPopulations()
{
    var populationArray = copyHomeLessPopulationArray();
    var nameCocArray = copyNameCocArray();
    var homelessPopulationDataArray = [];

    if(populationArray == null || nameCocArray == null)
        return null;

    for(i = 0; i < populationArray.length; ++i)
    {
        for(j = 0; j < nameCocArray.length; ++j)
        {
            if(populationArray[i].coc === nameCocArray[j].coc)
            {
                homelessPopulationDataArray.push({name: nameCocArray[j].name, coc: nameCocArray[j].coc, population: populationArray[i].population});
                break;
            }
        }
    }
    return homelessPopulationDataArray;
}

function copyHomeLessPopulationArray()
{
    var array = fs.readFileSync('./assets/Homeless Population Totals.txt').toString().split("\n");
    var homelessPopulationArray = [];
    var regExp = /[a-zA-Z]/g;
    var currentPositionI = 0;
    var currentPositionJ = 0;

    if(array.length == 0)
        return null;

    while(array.length > currentPositionI)
    {
        for(i = currentPositionI, j = currentPositionJ; regExp.test(array[i]) && i < array.length && array[i].length > 0; ++i, ++j)
        {
            array[i] = array[i].substring(array[i].indexOf(" ") + 1);
            homelessPopulationArray.push({coc: array[i], population: ""});
            ++currentPositionI;
        }

        for(i = currentPositionI, j = currentPositionJ; !regExp.test(array[i]) && i < array.length && array[i].length > 0; ++i, ++j)
        {
            array[i] = array[i].replace(",","");
            homelessPopulationArray[j].population = parseInt(array[i], 10);
            ++currentPositionI;
            ++currentPositionJ;
        }
    }

    return homelessPopulationArray;
}

function copyNameCocArray()
{
    var array = fs.readFileSync('./assets/COC Conversions.txt').toString().split("\n");
    var nameCocArray = [];
    var coc;
    var name;

    if(array.length == 0)
        return null;

    for(i = 0; i < array.length; ++i)
    {
        coc = array[i].substring(0, array[i].indexOf(" "));
        name = array[i].substring(array[i].indexOf(" ") + 1);
        name = name.replace('/', '');
        nameCocArray.push({coc: coc, name: name});
    }

    return nameCocArray;
}

module.exports.copyAllHomelessPopulations = copyAllHomelessPopulations;