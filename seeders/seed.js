var mongoose = require("mongoose");
var db = require("../models/transaction");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budget",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

var transactionSeed = [
  {
    name: "Rent",
    value: "-1500",
    date: new Date(Date.now())
  },
  {
    name: "Car Payment",
    value: "-300",
    date: new Date(Date.now())
  },
  {
    name: "Electricity",
    value: "-140",
    date: new Date(Date.now())
  },
  {
    name: "Paycheck",
    value: "2000",
    date: new Date(Date.now())
  },
  {
    name: "Tips",
    value: "900",
    date: new Date(Date.now())
  },
  {
    name: "Gas",
    value: "-40",
    date: new Date(Date.now())
  },
  {
    name: "Coffee",
    value: "-5",
    date: new Date(Date.now())
  }
];

db.deleteMany({})
  .then(() => db.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
