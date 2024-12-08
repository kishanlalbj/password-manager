import { connectToDb, disconnectDb } from "../index.js";
import Application from "../../models/Application.js";

async function run() {
  try {
    await Application.updateMany(
      { category: { $exists: false } },
      { $set: { category: "None" } }
    );
    console.log("Done");
  } catch (error) {
    console.log(error);
  } finally {
    disconnectDb();
  }
}

connectToDb();
await run();
