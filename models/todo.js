const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
