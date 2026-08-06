import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";

const app = express();
const port = 3009;

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

import userRoutes from "./routes/usersRoutes.ts";
import basketRoutes from "./routes/itemsRoutes.ts";
import { success } from "zod";

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Quiz #2 - API service");
});

app.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Quiz #2 - API service",
  });
});

//1.
app.use("/api/v686/auth", userRoutes);
//2.
app.use("/api/v686/basket", basketRoutes);
//3.
app.get("/myinfo", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Student Information",
    data: {
      studentId: "680610686",
      firstName: "Noppanat",
      lastName: "Phromsen",
      section: "001"
    },
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
