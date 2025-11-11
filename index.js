import app from "./config/express.js";
import dotenv from "dotenv";
import connectDb from "./config/mongo.js";
import router from "./routes/index.js";

async function main() {
  dotenv.config();
  const port = process.env.port || 3000;
  await connectDb();
  app.use("/api", router);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

main();
