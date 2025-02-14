import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swaggerConfig";
import { router as userRoute } from "./routes/userRoute";
import { router as productRoute } from "./routes/productRoutes"; // Tambahkan productRoutes

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/products", productRoute); 

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to our server API",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
