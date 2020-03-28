
class COVID_19_ANALYTICS {
    
    constructor(url) {
        this.url = url;
    }

    showTable(data, div) {
        return Plotly.newPlot(div, data);
    }

    getKey(rows, key) {
        return rows.map(row => {return row[key]})
    }

    handlerCSV() {
        Plotly.d3.csv(this.url, (err, rows) => {
           
            
            const date = new Date();
            const day= date.getDate();
            const day_yesterday = date.getDate() -1;
            const month=date.getMonth() + 1; 
            const year = date.getFullYear().toString().substr(-2);
            const currentDate = `${month}/${day}/${year}`;
            const yesterday = `${month}/${day_yesterday}/${year}`;

            let cityName = this.getKey(rows, 'Country/Region'),
            citySateProvince =this.getKey(rows, 'Province/State'),
            citySize = this.getKey(rows, `${currentDate}`);

                  //check if exist a now column in the dataset 
            if (typeof citySize[0] == 'undefined')
            {   
                citySize = this.getKey(rows, `${yesterday}`);
            }
            const cityState = [];
            for (let i = 0; i < cityName.length; i++) {
            cityState.push(cityName[i].split().concat(citySateProvince[i]));  
                
            }

            const values_table = [cityState, citySize];
            const data_table = [{
                type: 'table',
                header: {
                    values: [["<b>country or state/province</b>"], ["<b>Confirmed</b>"]],
                    align: "center",
                    line: {width: 1, color: 'black'},
                    fill: {color: "grey"},
                    font: {family: "Victor Mono", size: 12, color: "white"}
                },
                cells: {
                    values: values_table,
                    align: "center",
                    line: {color: "black", width: 1},
                    font: {family: "Victor Mono", size: 14, color: ["black"]}
                  }
            }]
            
            this.showTable(data_table, 'table');
          })
    }
}

const c = new COVID_19_ANALYTICS("https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv")
c.handlerCSV();




Plotly.d3.csv("https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv", (err, rows) => {
//console.log(rows)
const getKey = (rows, key) => {
    return rows.map(row => {return row[key]})

}

const date = new Date();
const day= date.getDate();
const day_yesterday = date.getDate() -1;
const month=date.getMonth() + 1; 
const year = date.getFullYear().toString().substr(-2);
const currentDate = `${month}/${day}/${year}`;
const yesterday = `${month}/${day_yesterday}/${year}`;
const size = [];


let cityName = getKey(rows, 'Country/Region'),
 cityLongitude = getKey(rows, 'Long'),
 cityLatitude = getKey(rows, 'Lat'),
 citySateProvince = getKey(rows, 'Province/State'),
 citySize = getKey(rows, `${currentDate}`);

//check if exist a now column in the dataset 
if (typeof citySize[0] == 'undefined')
{   
    citySize = getKey(rows, `${yesterday}`);
}

   

console.log(currentDate)    

for (let i = 0; i < citySize.length; i++) {
    let SIZE  = citySize[i] /  44;
    size.push(SIZE);
    
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

var config = {
    responsive: true
}
Plotly.newPlot("map", data, layout, config);

})