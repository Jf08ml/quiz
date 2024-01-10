import { set, connect } from "mongoose";
import { config } from "dotenv";

config();

const { DB_URI } = process.env;

set("strictQuery", true);

connect(DB_URI)
  .then(() => console.log("📡 Established connection to the database"))
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });
