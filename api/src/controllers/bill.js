const billsModel = require("../models/bills");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(billsModel, {});
    const detail = await res.getModelListDetails(billsModel);
    res.status(200).send({
      error: false,
      data,
      detail,
    });
  },
  create: async (req, res) => {
    const data = await billsModel.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await billsModel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await billsModel.updateOne({ _id: req.params.id }, req.body);

    res.status(200).send({
      error: false,
      data,
      modifed: await billsModel.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await billsModel.deleteOne({ _id: req.params.id });

    if (data.deletedCount > 0) {
      res.status(200).send({
        error: false,
        message: "bill deleted",
      });
    }
  },
};
