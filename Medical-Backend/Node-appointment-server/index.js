const express = require("express");
const connectdb = require("./config/dbConfig");
const cors = require("cors");
const userRoute = require('./routes/userRoute')
const doctorRoute = require('./routes/doctorRoute')
const adminRoute = require('./routes/adminRoute')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/api/user',userRoute);
app.use('/api/doc',doctorRoute);
app.use('/api/admin',adminRoute);

app.get("/",(req,res)=>{
  return res.json({message: "hello" })
})

connectdb().then(()=>{
  app.listen(port);
  console.log(`Server running and db connected at port ${port}!`);
}).catch(()=>{
  console.log("Server not running !");
})
