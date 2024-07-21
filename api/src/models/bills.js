const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const billSchema = new mongoose.Schema(
  {
    clientname: {
      type: String,
      required: true,
    },
    usermail: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    items: {
      type: [itemSchema],
      required: true,
    },
  },
  {
    collection: "bill",
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", billSchema);
