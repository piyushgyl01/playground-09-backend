const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect.js");
const { Student } = require("./models/students.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const mockStudents = [
  {
    name: "Alice Johnson",
    age: 20,
    gender: "Female",
    marks: 92,
    attendance: 95,
    grade: "A",
  },
  {
    name: "Bob Smith",
    age: 22,
    gender: "Male",
    marks: 75,
    attendance: 88,
    grade: "C",
  },
  {
    name: "Charlie Brown",
    age: 19,
    gender: "Male",
    marks: 85,
    attendance: 90,
    grade: "B",
  },
  {
    name: "Diana Miller",
    age: 21,
    gender: "Female",
    marks: 65,
    attendance: 75,
    grade: "D",
  },
  {
    name: "Eva Davis",
    age: 23,
    gender: "Female",
    marks: 58,
    attendance: 72,
    grade: "F",
  },
  {
    name: "Frank Wilson",
    age: 24,
    gender: "Male",
    marks: 95,
    attendance: 98,
    grade: "A",
  },
  {
    name: "Grace Taylor",
    age: 18,
    gender: "Female",
    marks: 80,
    attendance: 85,
    grade: "B",
  },
  {
    name: "Henry Martinez",
    age: 25,
    gender: "Male",
    marks: 72,
    attendance: 80,
    grade: "C",
  },
  {
    name: "Ivy Anderson",
    age: 20,
    gender: "Non-binary",
    marks: 89,
    attendance: 92,
    grade: "B",
  },
  {
    name: "Jack Thomas",
    age: 19,
    gender: "Male",
    marks: 68,
    attendance: 78,
    grade: "D",
  },
];

const createData = async (data) => {
  try {
    const addedData = await Student.insertMany(data);
    console.log(addedData);
  } catch (error) {
    console.log("ERROR OCCURED WHILE ADDING TO DATABASE", error);
  }
};

createData(mockStudents);

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, grade } = req.body;

  try {
    const student = new Student({ name, age, grade });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndRemove(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
