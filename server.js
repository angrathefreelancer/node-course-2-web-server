const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port  = process.env.PORT || 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use ((request,response,next) => {
  var now = new Date().toString()
  var log = `${now}: ${request.method} ${request.url}`
  console.log(log);
  fs.appendFile ('server.log',log + `\n` , (err) => {
    if (err) {
      console.log(`Unable to append server.log`);
    }
  })
  next ()
})

// app.use ((request,response,next) => {
//   response.render ('maintence.hbs')
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
