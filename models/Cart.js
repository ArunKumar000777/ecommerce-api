const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

console.log(CartSchema);

module.exports = mongoose.model("Cart", CartSchema);

// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number, default: 1 },
//     price: { type: Number }
//   }],
//   total: { type: Number },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date }
// });

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;
