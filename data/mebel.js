import mongoose from 'mongoose';

var MebelSchema = new mongoose.Schema({
  name: {
    type: String,
    description: 'mebel name'
  }
})
export default mongoose.model('mebel', MebelSchema);
