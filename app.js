const express = require('express');
const hbs = require('hbs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

var app = express();

// Express setup
hbs.registerPartials(__dirname + '/views/partials/');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// Routes
app.get('/', (req, res) => res.render('index', {
  pageHome: true
}));
app.get('/products', (req, res) => res.render('products', {
  title: 'Products',
  pageProduct: true
}));
app.get('/catalogue', (req, res) => res.render('catalogue', {
  title: 'Catalogue',
  pageProduct: true
}));

var transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
 secure: true,
 auth: {
        user: 'contact@thetstory.co',
        pass: 'pass_contact_mailgun'
    }
});

app.post('/', (req, res) => {

  var message = `<h3>Message from the contact form</h3>
                <p>
                  <b>Name</b>: ${req.body.name}
                  <br>
                  <b>Email ID</b>: ${req.body.email}
                  <br>
                  <b>Phone</b>: ${req.body.phone}
                  <br>
                  <b>Message</b>: ${req.body.message}
                </p>
                `;

  const mailOptions = {
  from: 'contact@thetstory.co', // sender address
  to: 'thetstoryco@gmail.com', // list of receivers
  subject: 'Contact form message ' + new Date().toDateString() , // Subject line
  html: message// plain text body
};

  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     return console.log('There was an error in sending your mail')
   else{
     console.log('Message sent: %s', info.messageId);
     return true
   }
  });

res.render('index', {
  pageHome: true,
  messageSent: true
});
});

app.post('/products', (req, res) => {
  console.log(req.body);
  res.redirect('/products')
});


app.get('/full', (req, res) => res.render('index-full'));

app.listen(port, () => console.log('App has started!'));
