const express = require('express');
const router = express.Router();
const api = require('./api.func');




//Initialize our Deaths API REST 
const deaths = new api.Deaths();
const confirmed = new api.Confirmed();
const recovered = new api.Recovered();

router.get('/api', (req, res) => {
    res.render('documentation', {})
})
//gets 
router.get('/api/deaths', async (req, res) => {

    try {
        const allDeaths = await deaths.allDeaths();
        res.json(allDeaths);
    } catch (err) {
        res.json({
            error: err
        })

    }
})

router.get('/api/deaths/reduced', async (req, res) => {
    try {

        const reducedDeaths = await deaths.fetchAllDeathsReduced();
        res.json(reducedDeaths);

    } catch (err) {
        res.json({
            error: err
        })
    }
})


router.get('/api/deaths/country', async (req, res) => {
    const country = req.query.country;

    if (country) {
        const country = req.query.country;
        const output = await deaths.deathsByCountry(country);
        res.json(output);
    }
    else {
        res.json({
            error: "Country is required"
        })
    }

})

router.get('/api/deaths/pronvince', async (req, res) => {
    const province = req.query.province;

    if (province) {
        const output = await deaths.deathsByProvince(province);
        res.json(output);
    }
    else {
        res.json({
            error: "Province is required"
        })
    }

})



router.get('/api/confirmed', async (req, res) => {
    try {
        const allConfirmed = await confirmed.allConfirmed();
        res.json(allConfirmed);
    } catch (error) {
        res.json({
            error: error
        })
    }
})


router.get('/api/confirmed/reduced', async (req, res) => {
    try {
        const reducedConfirmed = await confirmed.fetchAllConfirmedReduced();
        console.log(reducedConfirmed)
        res.json(reducedConfirmed);
    } catch (error) {
        res.json({
            error: error
        })
    }
})

router.get('/api/confirmed/country', async (req, res) => {
    const country = req.query.country;

    if (country) {
        const country = req.query.country;
        const output = await confirmed.confirmedByCountry(country)
        res.json(output);
    }
    else {
        res.json({
            error: "Country is required"
        })
    }
})

router.get('/api/confirmed/province', async (req, res) => {
    const province = req.query.province;

    if (province) {
        const output = await confirmed.confirmedByProvince(province);
        res.json(output);
    }
    else {
        res.json({
            error: "Province is required"
        })
    }

})




router.get('/api/recovered', async (req, res) => {
    try {
        const allConfirmed = await recovered.allRecovered();
        res.json(allConfirmed);
    } catch (error) {
        res.json({
            error: error
        })
    }
})


router.get('/api/recovered/reduced', async (req, res) => {
    try {
        const reducedConfirmed = await recovered.fetchAllRecoveredReduced();
        console.log(reducedConfirmed)
        res.json(reducedConfirmed);
    } catch (error) {
        res.json({
            error: error
        })
    }
})

router.get('/api/recovered/country', async (req, res) => {
    const country = req.query.country;
    if (country) {

        const output = await recovered.recoveredByCountry(country)
        res.json(output);
    }
    else {
        res.json({
            error: "Country is required"
        })
    }
})

router.get('/api/recovered/province', async (req, res) => {
    const province = req.query.province;
    if (province) {

        const output = await recovered.recoveredByProvince(province)
        res.json(output);
    }
    else {
        res.json({
            error: "Country is required"
        })
    }
})
module.exports = router;