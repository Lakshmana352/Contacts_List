const express = require("express");
const errorHandlers = require("./errorHandlers/errorHandler");
const connectionDB = require("./config/dbconnection");
require("dotenv").config();

connectionDB();
const app =express();
const port = process.env.PORT 

app.use(express.json());
app.use("/api/contacts",require("./routes/contact_routes"));
app.use("/api/users",require("./routes/user_routes"));
app.use(errorHandlers);

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}.`);
});