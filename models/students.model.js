const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  marks: Number,
  attendance: Number,
  grade: String,
});

const Student = mongoose.model("RxStudent", studentSchema);

module.exports = { Student };
