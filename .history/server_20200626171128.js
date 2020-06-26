const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database

connectDB();

// Init middleware

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Define Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Server static assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => res.sendFile);
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
