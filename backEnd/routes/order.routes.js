import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import { isAuth, isAdmin, isReseller, } from '../utils.js';



const orderRouter = express.Router();

const asyncHandler = expressAsyncHandler;

orderRouter.get(
  '/',  
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    console.log(orders);
    res.send(orders);
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);



// POST /api/orders
orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      customerName,
      customerAddress,
      contactNumber,
      itemsPrice,
      markup,
      deliveryFee,
      discount,
      total,
    } = req.body;



    // Calculate the total based on orderItems and other values
    const calculatedTotal = itemsPrice + markup + deliveryFee - discount;

    const newOrder = new Order({
      orderItems: orderItems.map(item => ({ ...item, price: item.selectedDescriptionValue })),
      customerName,
      customerAddress,
      contactNumber,
      itemsPrice,
      markup,
      deliveryFee,
      discount,
      total: calculatedTotal,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      }
    }
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        sales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  res.send({ users, orders, dailyOrders, productCategories });
  console.log(users, orders, dailyOrders, productCategories);
})
);

orderRouter.get(
  '/:orderId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findById(req.params.orderId)
    res.send(orders);
    console.log(orders)
  })
);

// orderRouter.get(
//   '/delivered',
//   isAuth,
//   isInspector,
//   expressAsyncHandler(async (req, res) => {
//     // Fetch the products that are marked as delivered
//     const deliveredProducts = await Order.find({ markDelivered: true })
//       .populate('orderItems.product', 'name category countInStock'); // Pass fields as a space-separated string

//     // Create instances of InventoryItem and save to your database
//     for (const product of deliveredProducts) {
//       for (const orderItem of product.orderItems) {
//         if (orderItem && orderItem.product) {
//           const newInventoryItem = new InventoryItem({
//             name: orderItem.product.name,
//             category: orderItem.product.category,
//             quantity: orderItem.quantity,
//           });

//           await newInventoryItem.save();
//         }
//       }
//     }

//     console.log('Delivered Products:', deliveredProducts); // Add this line for logging

//     res.send(deliveredProducts);
//   })
// );

// orderRouter.get(
//     '/:orderId',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {
//       const order = await Order.findById(req.params.orderId)
//       .populate(
//         'user',
//         'email name'
//       );
//       if (order) {
//         mailgun1()
//         .messages()
//         .send(
//           {
//             from: 'CBC <cbc@company.capstone.com>',
//             to: `${order.user.name} <${order.user.email}>`,
//             subject: `New order ${order._id}`,
//             html: payOrderEmailTemplate1(order),
//           },
//           (error, body) => {
//             if (error) {
//               console.log(error);
//             } else {
//               console.log(body);
//             }
//           }
//         );
//         res.send(order);
//       } else {
//         res.status(404).send({ message: 'Order Not Found' });
//       }
//     })
//   );

// orderRouter.put(
//   '/updateInventory/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const itemId = req.params.id;
//     const { name, category, quantity } = req.body;

//     const inventoryItem = await InventoryItem.findById(itemId);

//     if (inventoryItem) {
//       inventoryItem.name = name;
//       inventoryItem.category = category;
//       inventoryItem.quantity = quantity;

//       const updatedInventoryItem = await inventoryItem.save();

//       res.send(updatedInventoryItem);
//     } else {
//       res.status(404).send({ message: 'Inventory Item Not Found' });
//     }
//   })
// );

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


orderRouter.put(
  '/:id/markdeliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.markDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Marked as Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate(
        'user',
        'email name'
      );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'CBC <cbc@company.capstone.com>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


orderRouter.delete(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { orderIds } = req.body;

    try {
      // Use the `deleteMany` method to delete multiple orders
      const result = await Order.deleteMany({ _id: { $in: orderIds } });

      if (result.deletedCount > 0) {
        res.send({ message: 'Selected orders deleted successfully' });
      } else {
        res.status(404).send({ message: 'No orders were deleted' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  })
);


export default orderRouter;