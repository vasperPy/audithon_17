const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const rest = require("./getJSON");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const global_params = {
  uuid: "37772227-baa6-4e06-88d8-e9e6b3303ee2",
  dataVersion: "22.08.2019%2007.31.06.330",
  dsCode: "",
  _dc: "",
};

function getTerritoryData(callback) {
  var p = global_params;
  p.dsCode = "paramTerritoryData";
  p._dc = Date.now();
  var options = {
    host: "ka.egisso.ru",
    method: "GET",
    port: 80,
    path: `/reporting/Data?uuid=${p.uuid}&dataVersion=${p.dataVersion}&dsCode=${p.dsCode}&_dc=${p._dc}`,
  };

  var territories = {};

  rest.getJSON(options, (statusCode, result) => {
    const data = result["data"];
    data.forEach((el) => {
      territories[el[0]] = el[1];
    });
    callback(territories);
  });
}

function getPeriodicityData(callback) {
  var p = global_params;
  p.dsCode = "paramPeriodicityData";
  p._dc = Date.now();
  var options = {
    host: "ka.egisso.ru",
    method: "GET",
    port: 80,
    path: `/reporting/Data?uuid=${p.uuid}&dataVersion=${p.dataVersion}&dsCode=${p.dsCode}&_dc=${p._dc}`,
  };

  var periodicities = {};

  rest.getJSON(options, (statusCode, result) => {
    const data = result["data"];
    data.forEach((el) => {
      periodicities[el[0]] = el[1];
    });
    callback(periodicities);
  });
}

function getOnmszData(callback) {
  var p = global_params;
  p.dsCode = "paramONMSZData";
  p._dc = Date.now();
  p["territory"] = -1;
  var options = {
    host: "ka.egisso.ru",
    method: "GET",
    port: 80,
    path: `/reporting/Data?uuid=${p.uuid}&dataVersion=${p.dataVersion}&dsCode=${p.dsCode}&_dc=${p._dc}&territory=${p.territory}`,
  };

  var onmsz = {};

  rest.getJSON(options, (statusCode, result) => {
    const data = result["data"];
    data.forEach((el) => {
      onmsz[el[0]] = el[1];
    });
    callback(onmsz);
  });
}

function getPeriodsData(callback) {
  var p = global_params;
  p.dsCode = "periodsData";
  p._dc = Date.now();
  p["verified"] = "true";
  p["latest"] = "false";
}

function getMeasuresData(
  callback,
  territory = -1,
  period = "2021-03-01T00:00:00.000Z",
  onmsz = -1,
  msp = 4,
  periodicity = -1,
  fix = 2
) {
  var p = global_params;
  p.dsCode = "EGISSO_MSZP_001_001_gridData";
  p._dc = Date.now();
  p["paramPeriod"] = period;
  p["paramPeriodicity"] = periodicity;
  p["paramMSP"] = msp;
  p["paramONMSZ"] = onmsz;
  p["territory"] = territory;
  p["paramFix"] = fix;

  var options = {
    host: "ka.egisso.ru",
    method: "GET",
    port: 80,
    path: `/reporting/Data?uuid=${p.uuid}&dataVersion=${p.dataVersion}&dsCode=${p.dsCode}&_dc=${p._dc}&paramPeriod=${p.paramPeriod}&paramPeriodicity=${p.paramPeriodicity}&paramMSP=${p.paramMSP}&paramONMSZ=${p.paramONMSZ}&territory=${p.territory}&paramFix=${p.paramFix}`,
  };

  rest.getJSON(options, (statusCode, result) => {
    const data = result["data"];
    callback(data);
  });
}

app.get("/", (req, res) => {
  getTerritoryData((territories) => {
    console.log(territories);
    getMeasuresData((data) => {
      res.render("index", { measures: data, territories: territories });
    }, req.query.territory || -1);
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
