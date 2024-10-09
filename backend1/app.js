import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import riderRoutes from "./routes/riderRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.F_PORT, // Set your admin panel's domain here
    credentials: true, // Cookies allow karne ke liye
  })
);

app.use(express.json()); // JSON data ke liye
app.use(express.urlencoded({ extended: true })); // Form data ke liye
app.use(cookieParser());

// Serve static files from "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/rider", riderRoutes);
app.use("/order", orderRoute);
app.use("/product", productRoutes);

export default app;
