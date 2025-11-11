import mongoose from "mongoose";
import dotenv from "dotenv";

export function askConfirmation(message = "Are you sure? (y/n): ") {
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdout.write(message);
    const onData = (key) => {
      const char = key.toLowerCase();
      if (char === "y") {
        process.stdout.write("\nConfirmed.\n");
        cleanup();
        resolve(true);
      } else if (char === "n" || char === "\u0003" || char === "\u0004") {
        process.stdout.write("\nCancelled.\n");
        cleanup();
        resolve(false);
      }
    };
    function cleanup() {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.removeListener("data", onData);
    }
    process.stdin.on("data", onData);
  });
}

async function connectDb() {
  await mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("Mongo db connected"))
    .catch((err) => {
      console.error("Failed to cnnect to mongodb database", err);
      process.exit(1);
    });
}
async function deleteAll() {
  dotenv.config();
  await connectDb();
  console.log(`You are about to delete ALL data in database`);
  if (!(await askConfirmation("Are you sure? [y/n]"))) {
    process.exit(0);
  }
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(`Found ${collections.length} collections.`);
  for (const { name } of collections) {
    await mongoose.connection.db.collection(name).deleteMany({});
    console.log(`Cleared: ${name}`);
  }
  console.log("All collections cleared successfully.");
  process.exit(0);
}
deleteAll();
