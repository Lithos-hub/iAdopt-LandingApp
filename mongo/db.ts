import { connect, connection } from "mongoose";
const { DB_URI = "mongodb://localhost:27017/iadoptv2" } = process.env;

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectDB = async () => {
  try {
    if (connection.readyState === 0) {
      console.log("Connecting to ", DB_URI);
      await connect(DB_URI, options);
    }
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export const disconnectDB = async () => {
  try {
    if (connection.readyState !== 0) {
      console.log("Disconnecting from ", DB_URI);
      await connection.close();
    }
  } catch (error) {
    console.error("Error disconnecting from database: ", error);
  }
};
