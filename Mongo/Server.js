const express = require('express');
const mongoose = require('mongoose');
const foodRouter = require('./FoodRoutes');

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://testChaeyoung:12341234@testcluster.gc1z8.mongodb.net/test01?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use(foodRouter);

app.listen(3000, () => { console.log('3000번 포트에서 작동 중!') });