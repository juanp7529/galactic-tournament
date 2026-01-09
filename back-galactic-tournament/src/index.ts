import express, { Express } from "express";
import morgan from "morgan";
import { dbConfig } from "./config/database.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/index.js";

class App {
  public app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    });
  }

  private initializeRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({
        success: true,
        message: "Galactic Tournament API",
        version: "1.0.0",
        endpoints: {
          health: "/api/health",
          species: "/api/species",
          battles: "/api/battles",
        },
      });
    });
    this.app.use("/api", apiRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
      console.log(`URL: http://localhost:${this.port}/api`);
    });
  }

  public close(): void {
    dbConfig.close();
  }
}

const application = new App();
application.listen();

process.on("SIGINT", () => {
  console.log("\n🛑 Recibida señal SIGINT, cerrando aplicación...");
  application.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  application.close();
  process.exit(0);
});

export default application;
