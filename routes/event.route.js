// event.route.js

const express = require('express');
const app = express();
const eventRoutes = express.Router();

// Require event model in our routes module
let Event = require('../models/Event');

// Defined store route
eventRoutes.route('/add').post(function (req, res) {
  let event = new Event(req.body);
  event.save()
    .then(event => {
      res.status(200).json({'event': 'event in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
eventRoutes.route('/').get(function (req, res) {
    Event.find(function (err, events){
    if(err){
      console.log(err);
    }
    else {
      res.json(events);
    }
  });
});

// Defined edit route
eventRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event){
      res.json(event);
  });
});

//  Defined update route
eventRoutes.route('/update/:id').post(function (req, res) {
    Event.findById(req.params.id, function(err, event) {
    if (!event)
      return next(new Error('Could not load Document'));
    else {
      event.event_imgHome = req.body.event_imgHome;
        event.event_name = req.body.event_name;
        event.event_desc = req.body.event_desc;
        event.event_desc_other = req.body.event_desc_other;
        event.event_gst_number = req.body.event_gst_number;
        event.event_gst_date = req.body.event_gst_date;

        event.save().then(event => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
eventRoutes.route('/delete/:id').get(function (req, res) {
    Event.findByIdAndRemove({_id: req.params.id}, function(err, event){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = eventRoutes;