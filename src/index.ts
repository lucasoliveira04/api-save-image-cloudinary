import express, { Application } from "express";
import { Routes } from "./routes";

const app: Application = express();

const PORT: number = 3000;

app.use(express.json());
app.use(new Routes().getRoutes());

function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    app.listen(PORT, (err: Error | undefined) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Server is running on port ${PORT}`);
        resolve();
      }
    });
  });
}

startServer()
  .then(() => {
    console.log("Server started successfully.");
  })
  .catch((error: Error) => {
    console.error("Error starting server:", error);
  });
