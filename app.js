const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Port=process.env.PORT;
mongoose.connect(process.env.Mongo_DB_URL)
.then(()=>console.log("Database connected Successfully"))
.catch((err)=>console.log(err));

const bookRoute=require('./Routes/router')
app.use('/api/books',bookRoute);
const app=express();
app.use(cors());
app.use(express.json());
app.use('/book')
app.listen(Port,()=>{
    console.log("Server is listening");
});
