import mongoose from "mongoose";

const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "chat",
    })
    .then((c) => console.log(`Connected to DB at ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export default connectDB;
