import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    markup: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    markDelivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
