Plotly.d3.csv(" https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv", (err, rows) => {
//console.log(rows)
const getKey = (rows, key) => {
    return rows.map(row => {return row[key]})

}

const date = new Date();
const day= date.getDate() - 1;
const month=date.getMonth().toString(); 
const year = date.getFullYear().toString().substr(-2);
const currentDate = `${month}/${day}/${year}`;
const size = [];


const cityName = getKey(rows, 'Country/Region'),
 cityLongitude = getKey(rows, 'Long'),
 cityLatitude = getKey(rows, 'Lat'),
 citySize = getKey(rows, `${currentDate}`),
 color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"];


for (let i = 0; i < citySize.length; i++) {
    let SIZE  = citySize[i] /  0.5;
    size.push(SIZE);
    
}



var data = [{
    type: 'scattergeo',
 
    lat: cityLatitude,
    lon: cityLongitude,
    hoverinfor: 'text',
    text: cityName,
   
    marker: {
        size: 20,
        line: {
            color: 'black',
            width: 0.5
        },
    }
}];

var layout = {
    title: 'COVID-19 Data Visualization',
    showlegend: false,
    geo: {
        scope: 'world',
       
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: 'rgb(255,255,255)',
        countrycolor: 'rgb(255,255,255)'
    },
};

Plotly.newPlot("map", data, layout, {showLink: false});

})