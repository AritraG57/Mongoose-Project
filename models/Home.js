const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const favourites = require('./favourites');

const homeSchema = mongoose.Schema({
  homename : {type : String,required : true},
  price : {type : Number,required : true},
  rating : {type : String,required : true},
  image : String,
  description : String,
});

homeSchema.pre('findOneAndDelete',async function(next) {
  const homeId = this.getQuery()['_id'];
  await favourites.deleteMany({homeId : homeId});
  // next();
})

module.exports = mongoose.model('Home',homeSchema);