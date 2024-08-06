const express = require("express");
const Connect = require("./Connect");

const app = express();
app.use(express.json());

const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/userRoute");
const billsRoute=require("./routes/billsRoute");


app.use("/api/items/", itemsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bills/", billsRoute);



const port = 5000;

app.get("/", (req, res) => res.send("Hello World! from home api"));
app.listen(port, () => console.log(`Node JS Server Running at port ${port}`));