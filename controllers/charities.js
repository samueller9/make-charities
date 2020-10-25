module.exports = function (app, models) {

  // INDEX
      app.get('/', (req, res) => {
          models.Charities.findAll({ order: [['createdAt', 'DESC']] }).then(charities => {
              res.render('charities-index', { charities: charities });
          })
      })

      // NEW
      app.get('/charities/new', (req, res) => {
        res.render('charities-new', {});
      })

      // CREATE
      app.post('/charities', (req, res) => {
        models.Charities.create(req.body).then(charities => {
          res.redirect(`/`);
        }).catch((err) => {
          console.log(err)
        });
      })

      // SHOW
      app.get('/charities/:id', (req, res) => {
        models.Charities.findByPk(req.params.id).then((charities) => {
          res.render('charities-show', { charities: charities })
        }).catch((err) => {
          console.log(err.message);
        });
      });


      // EDIT
      app.get('/charities/:id/edit', (req, res) => {
        models.Charities.findByPk(req.params.id).then((charities) => {
          res.render('charities-edit', { charities: charities });
        }).catch((err) => {
          console.log(err.message);
        })
      });

      // UPDATE
      app.put('/charities/:id', (req, res) => {
        models.Charities.findByPk(req.params.id).then(charities => {
          charities.update(req.body).then(charities => {
            res.redirect(`/charities/${req.params.id}`);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });

      // //DELETE
      // app.delete('/charities/:id', (req, res) => {
      //   models.charities.findByPk(req.params.id).then(charities => {
      //     charities.destroy();
      //     res.redirect(`/`);
      //   }).catch((err) => {
      //     console.log(err);
      //     });
      //   })
      }
