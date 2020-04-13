const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const router = require(path.join(__dirname, 'public/router/rest.api.js'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.render('index', {})
})
app.use(express.urlencoded({extended: true}));
//view engine 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public/views'));
//middlerwares 
app.use(express.json())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);
// Server 
const config = {
    host: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000
}

app.listen(config, () => {
    console.log(`Running on port ${config.port}`);
});

