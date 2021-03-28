const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const Promise = require("bluebird");
const AppDAO = require("./dao");
const NeedyRepository = require("./needy_repository");
const PaysRepository = require("./pays_repository");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.port || 3000;

const db_name = path.join(__dirname, "db", "example.db");
const dao = new AppDAO(db_name);
const neediesTable = new NeedyRepository(dao);
const paysTable = new PaysRepository(dao);

app.get("/", (req, res) => {
  const regionId = isNaN(req.query.territory) ? -1 : req.query.territory;
  neediesTable.getByRegion(regionId).then((data) => {
    let needyCnt = { cnt: [], date: [] };
    data.forEach((el) => {
      needyCnt.cnt.push(el.cnt);
      needyCnt.date.push(el.date.slice(0, 10));
    });
    paysTable.getByRegion(regionId).then((data) => {
      pay0409 = [0];
      pay0411 = [0];
      pay0428 = [0];
      pay0429 = [0];
      pay0432 = [0];
      pay0449 = [0];
      pay0454 = [0];
      data.forEach((el) => {
        if (el.code == "0409") {
          pay0409[0] += el.average;
          pay0409.push(el.average);
        }
        if (el.code == "0411") {
          pay0411[0] += el.average;
          pay0411.push(el.average);
        }
        if (el.code == "0428") {
          pay0428[0] += el.average;
          pay0428.push(el.average);
        }
        if (el.code == "0429") {
          pay0429[0] += el.average;
          pay0429.push(el.average);
        }
        if (el.code == "0432") {
          pay0432[0] += el.average;
          pay0432.push(el.average);
        }
        if (el.code == "0449") {
          pay0449[0] += el.average;
          pay0449.push(el.average);
        }
        if (el.code == "0454") {
          pay0454[0] += el.average;
          pay0454.push(el.average);
        }
      });
      res.render("index", {
        measures: data,
        needyCnt: needyCnt,
        pay0409: pay0409,
        pay0411: pay0411,
        pay0428: pay0428,
        pay0429: pay0429,
        pay0432: pay0432,
        pay0449: pay0449,
        pay0454: pay0454,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
