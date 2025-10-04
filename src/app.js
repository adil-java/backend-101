import express from 'express';


const app = express();




const PORT = process.env.PORT || 5001;
app.get("/",(req,res)=>{
    res.send("API is running....")
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    });
