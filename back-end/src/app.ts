import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/a", (req: Request, res: Response) => {
  res.send("a");
});

export default app;
