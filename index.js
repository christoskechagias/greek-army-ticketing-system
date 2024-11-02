const express = require("express");
const app = express();
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes.js");
const membersRoutes = require("./routes/membersRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const appRoutes = require("./routes/appRoutes.js");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { dummyRoles } = require("./utils/dummyData.js");

const cookieParser = require("cookie-parser");

dotenv.config();
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to database:", err);
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// dummyUsers();
// dummyRoles();
app.use("/admin", adminRoutes);
app.use("/members", membersRoutes);
app.use("/users", usersRoutes);
app.use("/app", appRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
