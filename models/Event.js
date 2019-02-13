// Event.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Events
let Event = new Schema({
  event_name: {
    type: String
  },
  event_desc: {
    type: String
  },
  event_gst_number: {
    type: Number
  }
},{
    collection: 'event'
});

module.exports = mongoose.model('Event', Event);