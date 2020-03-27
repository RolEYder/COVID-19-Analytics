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
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

