const $leftLinks = document.querySelectorAll(".left-menu a"),
  $mapLinks = document.querySelectorAll(".map a *"),
  $info = document.querySelector(".info");

const requestData = (id = 1) => {
  fetch("js/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      $info.innerHTML = `
			<h2>${data[id - 1].district}</h2>
			<p>${data[id - 1].info}</p>
		`;
    });
};

//requestData();

function getMeasuresData(
  territory = -1,
  period = "2021-03-01T00:00:00.000Z",
  onmsz = -1,
  msp = 4,
  periodicity = -1,
  fix = 2
) {
  var tbody = document.getElementById("measures-data");
  //   tbody.innerHTML = "";
  var url = "http://ka.egisso.ru/reporting/Data",
    params = {
      uuid: "37772227-baa6-4e06-88d8-e9e6b3303ee2",
      dataVersion: "22.08.2019 07.31.06.330",
      dsCode: "EGISSO_MSZP_001_001_gridData",
      _dc: Date.now(),
      paramPeriod: period,
      paramPeriodicity: periodicity,
      paramMSP: msp,
      paramONMSZ: onmsz,
      territory: territory,
      paramFix: fix,
    };
}

$leftLinks.forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    let self = e.currentTarget;
    let selfClass = self.getAttribute("href");
    let color = self.dataset.color;
    let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
    let currentPolygon = currentElement.querySelectorAll("polygon");
    let currentPath = currentElement.querySelectorAll("path");
    if (currentPolygon)
      currentPolygon.forEach(
        (el) => (el.style.cssText = `fill: ${color}; stroke-width: 2px;`)
      );
    if (currentPath)
      currentPath.forEach(
        (el) => (el.style.cssText = `fill: ${color}; stroke-width: 2px;`)
      );
    self.parentNode.classList.add("active");
  });

  el.addEventListener("mouseleave", (e) => {
    let self = e.currentTarget;
    let selfClass = self.getAttribute("href");
    let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
    let currentPolygon = currentElement.querySelectorAll("polygon");
    let currentPath = currentElement.querySelectorAll("path");
    if (currentPolygon) currentPolygon.forEach((el) => (el.style.cssText = ``));
    if (currentPath) currentPath.forEach((el) => (el.style.cssText = ``));
    self.parentNode.classList.remove("active");
  });
});

$mapLinks.forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    let self = e.currentTarget;
    let parent = self.parentNode;
    let selfClass = parent.getAttribute("href");
    let color = parent.dataset.color;
    self.style.cssText = `fill: ${color}; stroke-width: 2px;`;
    let currentElement = document.querySelector(
      `.left-menu a[href="${selfClass}"]`
    );
    currentElement.parentNode.classList.add("active");
  });

  el.addEventListener("mouseleave", (e) => {
    let self = e.currentTarget;
    let parent = self.parentNode;
    let selfClass = parent.getAttribute("href");
    self.style.cssText = ``;
    let currentElement = document.querySelector(
      `.left-menu a[href="${selfClass}"]`
    );
    currentElement.parentNode.classList.remove("active");
  });

  el.addEventListener("click", (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    let parent = self.parentNode;
    let selfClass = parent.getAttribute("href");
    let currentElement = document.querySelector(
      `.left-menu a[href="${selfClass}"]`
    );
    let id = parseInt(currentElement.dataset.id);
    getMeasuresData();
    //requestData(id);
  });
});
