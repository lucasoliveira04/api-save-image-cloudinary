import express, { Application } from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { Routes } from "./routes";
import { OpenAPIV3 } from "openapi-types";

const app: Application = express();

const PORT: number = 3000;

const swaggerDocument: OpenAPIV3.Document = YAML.load("./src/docs/swagger.yml");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
