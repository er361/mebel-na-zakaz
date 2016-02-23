import mongoose from 'mongoose';

var MebelSchema = new mongoose.Schema({
  name: {
    type: String,
    description: 'field for mebel name'
  }
})

var Mebel = mongoose.model('mebel', MebelSchema);

export default Mebel;
