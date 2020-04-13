// rolEYder 


class COVID_19_ANALYTICS {
    //give tree urls to managent the apis 
    constructor(url_1, url_2, url_3) {
        this.url = url_1;
        this.deathsUrl = url_2;
        this.recoveredUrl = url_3;
     } 
    
     //show the tables  'Deaths, Recovered and Confirmed' 
    showTable(data, div, layout, config) {
        return Plotly.newPlot(div, data, layout, config);
    }
    //plotting the global map 
    showPlotting(div, data,layout, config) {
        return Plotly.newPlot(div, data, layout, config);
    }
    //function to get each key that return us from .csv when consuming the API 
    getKey(rows, key) {
        return rows.map(row => {return row[key]})
    }
    //function to sum the total of Deaths, Recovered and Confirmed 
    totalSum(array, id, title) {
        let sum = 0; 
        let html = document.getElementById(id);

        for (let i = 0; i < array.length; i++) {
            sum = eval(`${sum} + ${array[i]}`);
        }
        html.innerHTML = ` ${title} ${sum} `;
    }
    // function to serialize the current time 
    getDate() {
        const DATE = new Date();
        const obj_date = {
            day: DATE.getDate(),
            day_yesterday: DATE.getDate() -1,
            month: DATE.getMonth() + 1,
            year: DATE.getFullYear().toString().substr(-2),
        }

        return obj_date;
    }

        //function  to show the global map 
        showMap() {
        
        Plotly.d3.csv(this.url, (err, rows) => {
           
            const date = this.getDate()
            const currentDate = `${date.month}/${date.day}/${date.year}`;
            const yesterday = `${date.month}/${date.day_yesterday}/${date.year}`;
            const cityState = [];
            
         
            
            let cityName = this.getKey(rows, 'Country/Region'),
            citySateProvince =this.getKey(rows, 'Province/State'),
            citySize = this.getKey(rows, `${currentDate}`),
            cityLongitude = this.getKey(rows, 'Long'),
            cityLatitude = this.getKey(rows, 'Lat');

            //check if exist a new column in the dataset 
            if (typeof citySize[0] == 'undefined')
            {   
                citySize = this.getKey(rows, `${yesterday}`);
            }
            this.totalSum(citySize, "total-confirmed", "Total Confirmed 🧪");

            

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
            this.showTable(data, 'map', layout, config)
            this.showTable(data_table, 'table-confirmed');
           
          })
        }

        showDeathsTable() {
            Plotly.d3.csv(this.deathsUrl, (err, rows) => {

                const date = this.getDate()
                const currentDate = `${date.month}/${date.day}/${date.year}`;
                const yesterday = `${date.month}/${date.day_yesterday}/${date.year}`;
                const cityState = [];
                
                let cityName = this.getKey(rows, 'Country/Region'),
                citySateProvince =this.getKey(rows, 'Province/State'),
                citySize = this.getKey(rows, `${currentDate}`);
                

                //check if exist a new column in the dataset 
                if (typeof citySize[0] == 'undefined')
                {   
                    citySize = this.getKey(rows, `${yesterday}`);
                }
                this.totalSum(citySize, "total-deaths", "Total Deaths 😥");

                

                for (let i = 0; i < cityName.length; i++) {
                
                cityState.push(cityName[i].split().concat(citySateProvince[i]));  
                    
                }

                const values_table = [cityState, citySize];
                 const data_table = [{
                type: 'table',
                header: {
                    values: [["<b>country or state/province</b>"], ["<b>Deaths</b>"]],
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
         
            this.showTable(data_table, 'table-death');


            })
        }

        showRecoveredTable() {
            Plotly.d3.csv(this.recoveredUrl, (err, rows) => {

                const date = this.getDate()
                const currentDate = `${date.month}/${date.day}/${date.year}`;
                const yesterday = `${date.month}/${date.day_yesterday}/${date.year}`;
                const cityState = [];
                
                let cityName = this.getKey(rows, 'Country/Region'),
                citySateProvince =this.getKey(rows, 'Province/State'),
                citySize = this.getKey(rows, `${currentDate}`);
                

                //check if exist a new column in the dataset 
                if (typeof citySize[0] == 'undefined')
                {   
                    citySize = this.getKey(rows, `${yesterday}`);
                }
                this.totalSum(citySize, "total-recovered", "Total Recovered 👌");

                

                for (let i = 0; i < cityName.length; i++) {
                
                cityState.push(cityName[i].split().concat(citySateProvince[i]));  
                    
                }

                const values_table = [cityState, citySize];
                 const data_table = [{
                type: 'table',
                header: {
                    values: [["<b>country or state/province</b>"], ["<b>Recovered</b>"]],
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
         
            this.showTable(data_table, 'table-recovered');


            })
        }
}

const c = new COVID_19_ANALYTICS(
    "https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv"
    ,"https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_deaths_global.csv&filename=time_series_covid19_deaths_global.csv",
    "https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_recovered_global.csv&filename=time_series_covid19_recovered_global.csv")
c.showMap();
c.showDeathsTable();
c.showRecoveredTable();


