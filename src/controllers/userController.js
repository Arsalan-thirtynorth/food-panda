const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");

const { userService } = require("../services/userService");
const key = "secret";

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const foundedUser = await user.findOne({ email });
    if (!foundedUser) {
      const userServiceI = new userService();
      const userServiceResponse = await userServiceI.create(req.body);
      const createdUser = {
        _id: userServiceResponse._id,
      };
      jwt.sign(createdUser, key, (err, token) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            token: token,
            message: "User registered successfully",
          });
        }
      });
    } else {
      res.status(500).json({ msg: "user already exists" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).json({ msg: "Email and password are required" });
    }
    const findUser = await user.findOne({ email: email });
    if (!findUser) {
      res.status(500).json({ msg: "user does not exist" });
    } else {
      const compair = bcrypt.compareSync(password, findUser.password);
      if (compair) {
        const findedUserId = { _id: findUser._id };
        jwt.sign(findedUserId, key, (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              token: token,
              message: "User logged in successfully",
            });
          }
        });
      } else {
        res.status(500).json({ msg: "password is incorrect" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const userDetail = async (req, res) => {
  try {
    const findUser = await user.findById(req.params.id);
    if (!findUser) {
      res.status(500).json({ msg: "user does not exist" });
    } else {
      const userDetail = {
        username: findUser.username,
        email: findUser.email,
        address: findUser.address,
        phone: findUser.phone,
      };
      res.status(200).json({ userDetail });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
const editUserData = async (req, res) => {
  try {
    if (!req.body.password) {
      const findUser = await user.findById(req.params.id);
      if (!findUser) {
        res.status(500).json({ msg: "user does not exist" });
      } else {
        const token = req.headers.authorization.split(" ")[1]; // Assuming the token is sent in the Authorization header with Bearer prefix
        jwt.verify(token, key, async (err, decoded) => {
          if (err) {
            res.status(401).json({ msg: "Invalid token" });
          } else {
            const verifiedId = decoded._id;
            if (verifiedId === req.params.id) {
              const updateUser = await user.updateOne(
                { _id: req.params.id },
                {
                  $set: req.body,
                }
              );
              res.status(200).json({ msg: "User updated successfully" });
            } else {
              res.status(401).json({ msg: "Unauthorized" });
            }
          }
        });
      }
    } else {
      res.status(401).json({ msg: "you are not allowed to change password" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { register, login, userDetail, editUserData };
