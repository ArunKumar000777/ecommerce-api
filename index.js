const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
// const stripeRoute = require("./routes/stripe");
const paymentRoutes = require("./routes/payment");

dotenv.config();
const cors = require("cors");

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connection succesful"))
    .catch((error) => {
        console.error("error", error.message);
    });

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
// app.use("/api/checkout", stripeRoute);
app.use("/api/payment/", paymentRoutes);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`backend server running on ${port}...`);
});
