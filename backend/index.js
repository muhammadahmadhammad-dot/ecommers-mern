import express from "express";
import connection from "./config/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRouter.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json()); //req.body

connection(process.env.DB_URL);

// http://localhost:8000/api/users/
app.use("/api/users", userRouter);

// http://localhost:8000/api/categories/
app.use("/api/categories", categoryRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Port is ready");
});
