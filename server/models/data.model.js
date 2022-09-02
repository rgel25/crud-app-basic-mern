const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  field1: {
    type: String,
    required: true,
  },
  field2: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Entry", EntrySchema);
