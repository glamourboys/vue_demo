/* eslint-disable no-unused-vars */
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();
const appRouter = express.Router();

appRouter.get('/', (req, res, next) => {
  req.url = './index.html';
  next();
});

// mock 数据
var appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

appRouter.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });
});
appRouter.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  });
});
appRouter.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  });
});
app.use('/api', appRouter);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
