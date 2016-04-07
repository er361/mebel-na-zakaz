import mongoose from 'mongoose';

var MebelSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
    description: 'mebel  name'
  },image: {
      type: String,
      description: 'mebel image name'
  }
})
export default mongoose.model('mebel', MebelSchema);
