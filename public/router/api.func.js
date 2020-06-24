/**
 * @link   https://coronavirus-five.now.sh
 * @file   This files defines the GlobalFuntions, Deaths, Confirmed and Recovered classes.
 * @author rolEYder.
 * @since  2020.
 */


const { deaths, confirmed, recovered } = require('./urls.csv.json')
//to manimulate the .json file
const fs = require('fs');
//path
const path = require('path');
//axios
const axios = require('axios');
//csv
const csv = require('csvtojson');

const DATA_FILE_DEATHS = path.join(__dirname, 'data/DEATHS.csv');
const DATA_FILE_CONFIRMED = path.join(__dirname, 'data/CONFIRMED.csv');
const DATA_FILE_RECOVERED = path.join(__dirname, 'data/RECOVERED.csv');

class GlobalFuntion {
    constructor() {
    }

    //function to download the csv
    async downloadCsv(url, nameCsv) {
        const csvPath = path.resolve(__dirname, 'data', `${nameCsv}.csv`);
        const write = fs.createWriteStream(csvPath);
        const res = await axios({
            url: url,
            method: 'GET',
            responseType: 'stream'
        })
        res.data.pipe(write);
        return new Promise((resolve, reject) => {
            write.on('finish', resolve);
            write.on('error', reject);
        })
    }

    getDates() {
        const DATE = new Date();
        let day = DATE.getDate(),
            dayYesterday = DATE.getDate() - 1,
            month = DATE.getMonth() + 1,
            year = DATE.getFullYear().toString().substr(-2);

        const obj = {
            currentDate: `${month}/${day}/${year}`,
            yesterday: `${month}/${dayYesterday}/${year}`
        };
        return obj
    }


    async buildJson(json) {
        var country = [];
        let title = ['Country/Region', 'Province/State', 'Lat', 'Long', this.getDates().currentDate, this.getDates().yesterday]
        var dataJson = JSON.parse(JSON.stringify(json));
        dataJson.forEach((d, value) => {
            if (typeof d[4] == 'undefined') {
                country[value] = {
                    CountryRegion: `${d[title[0]]}`,
                    ProvinceState: `${d[title[1]]}`,
                    Total: d[title[5]],
                    Lat: d[title[2]],
                    Long: d[title[3]]
                };
            }

            else {
                country[value] = {
                    CountryRegion: `${d[title[0]]}`,
                    ProvinceState: `${d[title[1]]}`,
                    Total: d[title[4]],
                    Lat: d[title[2]],
                    Long: d[title[3]]
                };
            }

        });
        //console.log(JSON.parse(JSON.stringify(country)));
        return JSON.parse(JSON.stringify(country));
    }

    async makeJsons(json, country, paramSearch = '') {
        switch (paramSearch) {
            case 'Country/Region':
                return await this.buildJsonByCountry(json, paramSearch, country);

            case 'Province/State':
                return await this.buildJsonByCountry(json, paramSearch, country);

            default:
                return await this.buildJson(json);

        }
    }

    async buildJsonByCountry(json, paramSearch, countrySearch) {
        let country = []
       
        
        let title = ['Country/Region', 'Province/State', 'Lat', 'Long', this.getDates().currentDate, this.getDates().yesterday]
        var dataJson = JSON.parse(JSON.stringify(json));
        dataJson.forEach((d, value) => {
            if (d[paramSearch] === countrySearch) {
                if (typeof d[4] == 'undefined') {
                    country[value] = {
                        CountryRegion: `${d[title[0]]}`,
                        ProvinceState: `${d[title[1]]}`,
                        Total: d[title[5]],
                        Lat: d[title[2]],
                        Long: d[title[3]]
                    };

                }

                else {
                    country[value] = {
                        CountryRegion: `${d[title[0]]}`,
                        ProvinceState: `${d[title[1]]}`,
                        Deaths: d[title[4]],
                        Lat: d[title[2]],
                        Long: d[title[3]]
                    };

                }
            }

        });

        const data = country.filter((x) => { return x !== null })
        return JSON.parse(JSON.stringify(data));

    }
}



class Deaths extends GlobalFuntion {
    constructor() {
        super();
        this.deaths = deaths;
    }

    //Function all deaths
    async fetchAllDeathsReduced() {
        await this.downloadCsv(this.deaths, 'DEATHS');
        try {
            const json = await csv().fromFile(DATA_FILE_DEATHS);
            return this.makeJsons(json, null, null);
        } catch (error) {
            return error;
        }
    }

    async allDeaths() {
        await this.downloadCsv(this.deaths, 'DEATHS');
        try {
            const output = await csv().fromFile(DATA_FILE_DEATHS);
            return output;
        } catch (error) {
            return error;
        }
    }
    //function return deaths by country
    async deathsByCountry(country) {
        await this.downloadCsv(this.deaths, 'DEATHS');
        try {
             const json = await csv().fromFile(DATA_FILE_DEATHS);
            return this.makeJsons(json, country, 'Country/Region');
        } catch (error) {
            return error;
        }


    }
    async deathsByProvince(province) {
        await this.downloadCsv(this.deaths, 'DEATHS');
        try {
            const json = await csv().fromFile(DATA_FILE_DEATHS);
            return this.makeJsons(json, province, 'Province/State');
        } catch (error) {
            return error;
        }
    }
}
class Confirmed extends GlobalFuntion {
    constructor() {
        super();
        this.confirmed = confirmed;
        
    }

    async allConfirmed() {
        await this.downloadCsv(this.confirmed, 'CONFIRMED');
        try {
            const output = await csv().fromFile(DATA_FILE_CONFIRMED);
            return output;
        } catch (error) {
            return error;
        }
    }

    async fetchAllConfirmedReduced() {
        await this.downloadCsv(this.confirmed, 'CONFIRMED');
        try {
            const json = await csv().fromFile(DATA_FILE_CONFIRMED);
            return this.makeJsons(json, null, null);
        } catch (error) {
            return error;
        }
    }

    async confirmedByCountry(country) {
        await this.downloadCsv(this.confirmed, 'CONFIRMED');
        try {
             const json = await csv().fromFile(DATA_FILE_CONFIRMED);
             return this.makeJsons(json, country, 'Country/Region');
        } catch (error) {
            return error;
        }
    }

    async confirmedByProvince(province) {
        await this.downloadCsv(this.confirmed, 'CONFIRMED');
        try {
            const json = await csv().fromFile(DATA_FILE_CONFIRMED);
            return this.makeJsons(json, province, 'Province/State');
        } catch (error) {
            return error;
        }
    }
}

class Recovered extends GlobalFuntion {
    constructor() {
        super();
        this.recovered = recovered;
        
    }

    async allRecovered() {
        await this.downloadCsv(this.recovered, 'RECOVERED');
        try {
            const output = await csv().fromFile(DATA_FILE_CONFIRMED);
            return output;
        } catch (error) {
            return error;
        }
    }

    async fetchAllRecoveredReduced() {
        await this.downloadCsv(this.recovered, 'RECOVERED');
        try {
            const json = await csv().fromFile(DATA_FILE_RECOVERED);
            return this.makeJsons(json, null, null);
        } catch (error) {
            return error;
        }
    }

    async recoveredByCountry(country) {
        await this.downloadCsv(this.recovered, 'RECOVERED');
        try {
             const json = await csv().fromFile(DATA_FILE_RECOVERED);
             return this.makeJsons(json, country, 'Country/Region');
        } catch (error) {
            return error;
        }
    }

    async recoveredByProvince(province) {
        await this.downloadCsv(this.recovered, 'RECOVERED');
        try {
            const json = await csv().fromFile(DATA_FILE_RECOVERED);
            return this.makeJsons(json, province, 'Province/State');
        } catch (error) {
            return error;
    }
  }
}





module.exports = { Deaths, Recovered, Confirmed }
