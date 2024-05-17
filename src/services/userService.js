const user = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

class userService {
  async create(data) {
    const { username, email, password, address, phone, role } = data;
    const newUser = new user({
      username: username,
      email: email,
      address: address,
      phone: phone,
      role: role,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) res.status(500).send(err.message);
        newUser.password = hash;
        newUser.save();
      });
    });
    return newUser;
  }
}

module.exports = { userService };
