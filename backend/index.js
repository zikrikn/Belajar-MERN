import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./routes/UserRouter.js";
import 'dotenv/config';

const uri = process.env.DB_URI;

const app = express();

// const uri = "mongodb+srv://zikri:12345@mydb.ojqgwmm.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(cors());
app.use(express.json());

app.use(UserRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;