const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
    required: true
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("records", recordSchema);
