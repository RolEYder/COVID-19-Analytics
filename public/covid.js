Plotly.d3.csv(" https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv", (err, rows) => {
console.log(rows)
const getKey = (rows, key) => {
    return rows.map(row => {return row[key]})

}

const date = new Date();
const day= date.getDate() - 1;
const month=date.getMonth() + 1; 
const year = date.getFullYear().toString().substr(-2);
const currentDate = `${month}/${day}/${year}`;
const size = [];


const cityName = getKey(rows, 'Country/Region'),
 cityLongitude = getKey(rows, 'Long'),
 cityLatitude = getKey(rows, 'Lat'),
 citySateProvince = getKey(rows, 'Province/State'),
 citySize = getKey(rows, `${currentDate}`);

console.log(currentDate)

for (let i = 0; i < citySize.length; i++) {
    let SIZE  = citySize[i] /  44;
    size.push(SIZE);
    
}
console.log(citySateProvince);
for (let j = 0 ; j < citySize.length; j++) {
    const res = `<tr>
    <td>${cityName[j]} ${citySateProvince[j] ?  citySateProvince[j] : " "}</td>
    <td>${citySize[j]}</td>
</tr>`;

$("#table").append(res);
}




var data = [{
    type: 'scattergeo',
 
    lat: cityLatitude,
    lon: cityLongitude,
    hoverinfor: 'text',
    text: cityName,
   
    marker: {
        size: 10,
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

Plotly.newPlot("map", data, layout);

})