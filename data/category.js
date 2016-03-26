import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

var Category = mongoose.model('category', CategorySchema);

export default Category;
