import express from "express";
import connection from "../config/dbConnection.js";
import serverless from 'serverless-http';
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();


app.use(cors({
  origin:process.env.CLIENT_URL,
  methods:['POST','GET','PUT','DELETE'],
  credentials:true
}));
app.use(express.json()); //req.body

connection(process.env.DB_URL);


import userRouter from "../routes/userRoutes.js";
import categoryRouter from "../routes/categoryRouter.js";
import productRouter from "../routes/productRouter.js";
import orderRouter from "../routes/orderRouter.js";

// http://localhost:8000/api/users/
app.use("/api/users", userRouter);

// http://localhost:8000/api/categories/
app.use("/api/categories", categoryRouter);

// http://localhost:8000/api/products/
app.use("/api/products", productRouter);

// http://localhost:8000/api/orders/
app.use("/api/orders", orderRouter);

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log("Port is ready");
// });
export default serverless(app);
