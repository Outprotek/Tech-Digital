import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Untuk menyajikan file statis Swagger UI
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cartRoute from "./routes/cartRoute";
import userRoute from "./routes/userRoute";
import reviewRoute from "./routes/reviewRoute";
import orderItems from "./routes/orderItems";
import variantRoute from "./routes/variantRoute";
import marketRoutes from "./routes/marketRoutes";
import categoryRoute from "./routes/categoryRoute";
import productRoutes from "./routes/productRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "../node_modules/swagger-ui-dist"))
);
app.use("/cart", cartRoute);
app.use("/user", userRoute);
app.use("/market", marketRoutes);
app.use("/review", reviewRoute);
app.use("/product", productRoutes);
app.use("/review", reviewRoute);
app.use("/orderitems", orderItems);
app.use("/category", categoryRoute);
app.use("/variant", variantRoute);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to our server API",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;
