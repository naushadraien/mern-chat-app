import express from "express";
import "dotenv/config";
import chatConfig from "./config/index.js";
import mainRouter from "./routes/index.js";
import connectDB from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
const port = chatConfig.PORT;

connectDB(chatConfig.Mongo_URI);
const app = express();

app.get("/", (req, res) => {
  res.send("Api is working on /api/v1");
});

app.use(express.json());
app.use(cookieParser());
mainRouter(app);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
