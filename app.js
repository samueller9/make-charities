// Initialize express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
//
// // Tell our app to send the "hello world" message to our home page
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// // Render the "home" layout for the main page and send the following msg
// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Handlebars are Cool!' });
// })

// OUR MOCK ARRAY OF PROJECTS
var charities = [
  { title: "I am your first charity", desc: "A great charity that is super fun to look at and good", imgUrl: "https://pics.paypal.com/00/s/NmVkNTlhZWQtYTc1Ni00ZTBiLTk5OTEtYWI2ZjNmOGU4OWNk/file.JPG" },
  { title: "I am your second charity", desc: "A great charity that is super fun to look at and good", imgUrl: "https://www.thespruceeats.com/thmb/HFHareCtMR4mwSQ7cHAGtdiICFs=/640x380/filters:no_upscale():max_bytes(150000):strip_icc()/734039_10151500368212731_627225972_n-589a0ff73df78caebc1f6c2d.jpg" },
  { title: "I am your third charity", desc: "A great charitythat is super fun to look at and good", imgUrl: "https://photos.prnewswire.com/prn/20090108/RedCrossLOGO" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('charities-index', { charities: charities });
})

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
