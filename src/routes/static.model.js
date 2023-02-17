const { Router } = require("express");
const { ADMIN, USER } = require("../configs/constants");
const Statictis = require("../controllers/statistic");
const auth = require("../middlewares/auth");
const StatictisRouter = Router();

StatictisRouter.post("/", auth(ADMIN), Statictis.getStatistic);

module.exports = StatictisRouter;
