import mongoose from "mongoose";
const dbconnect = async () => {
  // prajaktashirke
  // 2eaLj86OVmrK3Cre
  // mongodb+srv://prajaktashirke:<db_password>@cluster0.6qh8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);
    mongoose.set("strictQuery", true);
    console.log("connected db", connected.connection.host);
  } catch (err) {
    console.log("error", err);
    process.exit(1);
  }
};
export default dbconnect;
