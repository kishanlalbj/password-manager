import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Error Connecting to Database");
      console.log(err);
    });
};

export const disconnectDb = () => {
  mongoose.connection.close();
  // mongoose.disconnect();
};
