const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  position: {
    type: Number
  },
  board: ObjectId,
  cards:[
    {type: Schema.Types.ObjectId, ref: 'Card'}
  ]
})

const List = mongoose.model('List', ListSchema);

module.exports = List;