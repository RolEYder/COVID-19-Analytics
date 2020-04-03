const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();


const PORT = 3000 || process.env.PORT;
// Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index', {})
})


// Server 

config = {
    host: '127.0.0.1',
    port: 3000
}

app.listen(config, () => {
    console.log(`Running on port ${PORT}`);
});

