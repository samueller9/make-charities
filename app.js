// Initialize express
const express = require('express')
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const models = require('./db/models');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


const app = express()
require('./controllers/charities')(app, models);

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

var charities = [
  { title: "Alzheimer's Society: United Against Dementia", desc: "Alzheimer's Society is a United Kingdom care and research charity for people with dementia and their carers.", imgUrl: "https://pics.paypal.com/00/s/NmVkNTlhZWQtYTc1Ni00ZTBiLTk5OTEtYWI2ZjNmOGU4OWNk/file.JPG" },
  { title: "Feeding America", desc: "Feeding America is a United States–based nonprofit organization that is a nationwide network of more than 200 food banks that feed more than 46 million people through food pantries, soup kitchens, shelters, and other community-based agencies.", imgUrl: "https://www.thespruceeats.com/thmb/HFHareCtMR4mwSQ7cHAGtdiICFs=/640x380/filters:no_upscale():max_bytes(150000):strip_icc()/734039_10151500368212731_627225972_n-589a0ff73df78caebc1f6c2d.jpg" },
  { title: "American Red Cross", desc: "The American Red Cross, also known as The American National Red Cross, is a humanitarian organization that provides emergency assistance, disaster relief, and disaster preparedness education in the United States.", imgUrl: "https://photos.prnewswire.com/prn/20090108/RedCrossLOGO" }
]

//DELETE
app.delete('/charities/:id', (req, res) => {
  models.Charities.findByPk(req.params.id).then(charities => {
    charities.destroy();
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err);
    });
  })


// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
