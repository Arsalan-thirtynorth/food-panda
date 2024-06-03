const dealsService = require("../services/dealService");
const product = require("../models/productSchema");

const createDeal = async (req, res) => {
  try {
    const { items, restaurantId, discount, description, validTill } = req.body;
    if (!items || !restaurantId || !discount || !description || !validTill) {
      res.status(500).json({ msg: "provide all the required fields" });
    } else {
      const dealServiceI = new dealsService();
      const dealServiceResponse = await dealServiceI.create(req.body);

      if (dealServiceResponse.msg) {
        res.status(500).json({ msg: dealServiceResponse.msg });
      } else {
        let price = 0;

        for (let i = 0; i < items.length; i++) {
          const findProduct = await product.findOne({
            _id: items[i].productId,
          });
          if (findProduct) {
            price += findProduct.price * items[i].quantity;
          }
        }

        const priceToSubtract = (price / 100) * discount;
        const finalPrice = price - priceToSubtract;

        const deal = {
          items: dealServiceResponse.items,
          discount: dealServiceResponse.discount,
          description: dealServiceResponse.description,
          validTill: dealServiceResponse.validTill,
          finalPrice: finalPrice,
        };

        res.status(200).json({ deal });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const showDeals = async (req, res) => {
  try {
    const dealServiceI = new dealsService();
    const deals = await dealServiceI.show();
    let dealsArray = [];

    for (let i = 0; i < deals.length; i++) {
      let price = 0;
      const items = deals[i].items;
      const discount = deals[i].discount;
      for (let j = 0; j < items.length; j++) {
        const findProduct = await product.findOne({
          _id: items[j].productId,
        });
        if (findProduct) {
          price += findProduct.price * items[j].quantity;
        }
      }
      const priceToSubtract = (price / 100) * discount;
      const finalPrice = price - priceToSubtract;
      const deal = {
        items: deals[i].items,
        discount: deals[i].discount,
        description: deals[i].description,
        validTill: deals[i].validTill,
        finalPrice: finalPrice,
      };
      dealsArray.push(deal);
    }
    res.status(200).json(dealsArray);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getSpecificDeal = async (req, res) => {
  try {
    const dealServiceI = new dealsService();
    const deal = await dealServiceI.get(req.params.id);
    res.status(200).json(deal);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderDeal = async (req, res) => {
  try {
    const dealServiceI = new dealsService();
    const deal = await dealServiceI.order(
      req.params.id,
      req.body.userId,
      req.body.method
    );

    if (deal.msg) {
      res.status(500).json({ msg: deal.msg });
    } else {
      res.status(200).json(deal);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const delOrder = async (req, res) => {
  try {
    const dealServiceI = new dealsService();
    const deal = await dealServiceI.delete(req.params.id);
    res.status(200).json(deal);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createDeal,
  showDeals,
  getSpecificDeal,
  orderDeal,
  delOrder,
};
