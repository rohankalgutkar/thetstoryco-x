const express = require('express');
const hbs = require('hbs');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials/');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.render('index'));
app.get('/products', (req, res) => res.render('products'));

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'thetstoryco@gmail.com',
        pass: 'DSRterrariums'
    }
});

app.get('/contact', (req, res) => {
  const mailOptions = {
  from: 'contact@thetstory.co', // sender address
  to: 'rohankalgutkar@gmail.com', // list of receivers
  subject: 'Test mail', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
});

app.get('/full', (req, res) => res.render('index-full'));

app.listen(port, () => console.log('App has started!'));
