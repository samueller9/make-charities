// Initialize express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const models = require('./db/models');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

var charities = [
  { title: "Alzheimer's Society: United Against Dementia", desc: "Alzheimer's Society is a United Kingdom care and research charity for people with dementia and their carers.", imgUrl: "https://pics.paypal.com/00/s/NmVkNTlhZWQtYTc1Ni00ZTBiLTk5OTEtYWI2ZjNmOGU4OWNk/file.JPG" },
  { title: "Feeding America", desc: "Feeding America is a United States–based nonprofit organization that is a nationwide network of more than 200 food banks that feed more than 46 million people through food pantries, soup kitchens, shelters, and other community-based agencies.", imgUrl: "https://www.thespruceeats.com/thmb/HFHareCtMR4mwSQ7cHAGtdiICFs=/640x380/filters:no_upscale():max_bytes(150000):strip_icc()/734039_10151500368212731_627225972_n-589a0ff73df78caebc1f6c2d.jpg" },
  { title: "American Red Cross", desc: "The American Red Cross, also known as The American National Red Cross, is a humanitarian organization that provides emergency assistance, disaster relief, and disaster preparedness education in the United States.", imgUrl: "https://photos.prnewswire.com/prn/20090108/RedCrossLOGO" }
]


// INDEX
app.get('/', (req, res) => {
  models.Charities.findAll().then(charities => {
    res.render('charities-index', { charities: charities });
  })
})

//NEW
app.get('/charities/new', (req, res) => {
  res.render('charities-new', {});
})

// CREATE
app.post('/charities', (req, res) => {
  models.Charities.create(req.body).then(charities => {
    res.redirect(`/charities/${charities.id}`);
  }).catch((err) => {
    console.log(err)
  });
})
//DONATE


//SEARCH
app.get('/charities/search', (req, res) => {
    res.render('charities-search')
  })

  // SHOW
  app.get('/charities/:id', (req, res) => {
    // Search for the event by its id that was passed in via req.params
    models.Charities.findByPk(req.params.id).then((charities) => {
      // If the id is for a valid event, show it
      res.render('charities-show', { charities: charities })
    }).catch((err) => {
      // if they id was for an event not in our db, log an error
      console.log(err.message);
    })
  })

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
