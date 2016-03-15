import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    description: 'category name'
  },
  children:
  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mebel'
    }
  ]
});

var Category = mongoose.model('category', CategorySchema);

export default Category;
