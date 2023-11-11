import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { isAuth, generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isReseller: user.isReseller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);



userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    console.log('Received signup request:', req.body);
    const { nameSignup, emailSignup, passwordSignup } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(passwordSignup, 8);

    const newUser = new User({
      name: nameSignup,
      email: emailSignup,
      password: hashedPassword, // Store the hashed password
    });

    try {
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false, // Ensure a default value for isAdmin
        isReseller: user.isReseller || true, 
        token: generateToken(user),
      });
    } catch (err) {
      console.error('Error during user creation:', err);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  })
);



userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isReseller: updatedUser.isReseller,
        token: generateToken(updatedUser)
      })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)



export default userRouter;