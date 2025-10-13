import { connectDB } from "./db/index.js";
import { app } from "./app.js";
connectDB()
.then(() => {
const PORT = process.env.PORT || 5001;
app.get("/",(req,res)=>{
    res.send("API is running....")
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    });})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});