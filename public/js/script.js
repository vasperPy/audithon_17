const $leftLinks = document.querySelectorAll(".left-menu a"),
  $mapLinks = document.querySelectorAll(".map a *"),
  $info = document.querySelector(".info");

  $(function () {
    $('[data-toggle="popover"]').popover()
  })

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
    //currentElement.parentNode.classList.add("active");
  });

  el.addEventListener("mouseleave", (e) => {
    let self = e.currentTarget;
    let parent = self.parentNode;
    let selfClass = parent.getAttribute("href");
    self.style.cssText = ``;
    let currentElement = document.querySelector(
      `.left-menu a[href="${selfClass}"]`
    );
    //currentElement.parentNode.classList.remove("active");
  });

  el.addEventListener("click", (e) => {
    e.preventDefault();
    let self = e.currentTarget;
    let parent = self.parentNode;
    let selfClass = parent.getAttribute("href");
    if (!isNaN(self.id)) {
      window.location.href = `/?territory=${self.id}#stats`
    }
  });
});
