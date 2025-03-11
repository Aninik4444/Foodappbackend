const express= require("express");
//const express = require("cors");
require("dotenv").config();
const morgan = require("morgan");
require("./utils/db");
const PORT = process.env.PORT || 3002;
const app = express();


//dot en configuration

app.use(morgan("dev"));
app.use(express.json()) 
app.use("/api/v1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth",require ("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant",require("./routes/resturantRoutes"));
app.use("/api/v1/category",require("./routes/categoryRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req,res)=>{
    return res.status(200).send("<h2>Welcome to foodapp </h2>");
});

//middlewares
//app.use(cors());

//PORT
//listen
app.listen(PORT, ()=>{ 
    console.log(`Server Running on ${PORT}`);
});