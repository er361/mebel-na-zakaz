import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    description: 'filed for image name'
  },
  description: {
    type: String
  }
});

var Category = mongoose.model('category', CategorySchema);

export default Category;
