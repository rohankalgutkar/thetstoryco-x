const express = require('express');
const hbs = require('hbs');
var app = express();


// view engine setup
hbs.registerPartials(__dirname + '/views/partials/');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render('index'));
app.get('/full', (req, res) => res.render('index-full'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
