import express from "express";
import dotenv from "dotenv";
import router from "./router/auth-router.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "https://adminwebio.netlify.app",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS",
  credentials: true,
};
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.json());
app.use("/api/", router);

app.use(errorMiddleware);
import "./utils/db.js";
const port = process.env.PORT;

dotenv.config({ path: "./locker.env" });

app.listen(port, (req, res) => {
  console.log("listening on port " + port);
});
