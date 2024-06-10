const adminService = require("../services/adminService");

const getUsers = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getAllUsers();
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getUserDetails(
      req.params.id
    );
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

const getRestaurants = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getRestaurants();
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

const getRestaurantDetails = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getRestaurantDetails(
      req.params.id
    );
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

const getRestaurantMenu = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getRestaurantMenu(
      req.params.id
    );
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

const getOrders = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getOrders();
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

const getSingelOrder = async (req, res) => {
  try {
    const adminServiceI = new adminService();
    const adminServiceResponse = await adminServiceI.getSingelOrder(
      req.params.id
    );
    res.status(200).json(adminServiceResponse);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUserDetails,
  getRestaurants,
  getRestaurantDetails,
  getRestaurantMenu,
  getOrders,
  getSingelOrder,
};
