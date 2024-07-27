require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

const User = require("./models/user");
const Employee = require("./models/employee.js");
const authMiddleware = require("./middlewares/authMiddleware");
const connectDB = require("./dbConnection");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Sign Up
app.post("/sign-up", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
});

// Sign In
app.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });
    res.json({
      token,
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: "Error signing in" });
  }
});

// Create Employee
app.post("/employee", authMiddleware, async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, image } =
      req.body;
    const employee = new Employee({
      image,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });
    await employee.save();
    res
      .status(200)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(400).json({ error: "Error creating employee" });
  }
});

// Read all Employees
app.get("/employees", authMiddleware, async (req, res) => {
  try {
    const { sortBy, order = -1, searchQuery } = req.query;
    let sort = {};
    if (sortBy) {
      sort[sortBy] = order;
    }

    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const employees = await Employee.find(query).sort(sort);
    res.json(employees);
  } catch (error) {
    res.status(400).json({ error: "Error fetching employees" });
  }
});

// Update Employee
app.patch("/employee/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(400).json({ error: "Error updating employee" });
  }
});

// Delete Employee
app.delete("/employee/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting employee" });
  }
});

// File APIs

// Upload file
app.post("/upload", authMiddleware,  upload.single("image"), (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    res.status(400).json({ error: "Error uploading image" });
  }
});

// Get file
app.get("/uploads/:filename", (req, res) => {
  try {
    const filePath = path.join(__dirname, "uploads", req.params.filename);
    res.sendFile(filePath);
  } catch (error) {
    res.status(400).json({ error: "Error retrieving image" });
  }
});

const listen = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running ${PORT}`));
};

listen().catch((e) => console.log(e));
