const container = document.querySelector(".infinite-scroll");
var pagenumber = 1;

const loadImage = async () => {
  let res = await fetch(
    `https://api.unsplash.com/photos/?client_id=Xq62kux9RBMODPUloapAwC1eHiCNZRVh6zaeZk0K8ZM&per_page=15&page=${pagenumber}`
  );
  let data = await res.json();
  showImage(data);
};

loadImage();

function showImage(items) {
  items.forEach((item) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = item.urls.small;
    let title = document.createElement("p");
    title.innerText = item.description;
    title.style.color = "#ffffff";
    title.style.fontSize = "1.4vw";
    div.append(img, title);
    container.insertAdjacentElement("beforeend", div);
  });
}

const showData = () => {
  setTimeout(() => {
    pagenumber++;
    console.log(pagenumber);
    loadImage();
  }, 200);
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    showData();
  }
});

//-------------search engine---------------------------\\
let showbox = document.getElementById("searchresults");
let input = document.getElementById("input");
var sets;
input.addEventListener("input", startShowingResults);
function startShowingResults(e) {
  showbox.textContent = e.target.value;
  var inputvalue = input.value;

  if (inputvalue != " ") {
    showbox.style.display = "block";
  }
  if (inputvalue == "") {
    showbox.style.display = "none";
  }

  startdebounce(showSuggestions, 3000);
  function startdebounce(showSuggestions, time) {
    if (sets) {
      clearTimeout(sets);
    }
    sets = setTimeout(() => {
      showSuggestions(inputvalue);
    }, time);
  }
}

async function showSuggestions(inputvalue) {
  showbox.textContent = null;
  let res = await fetch(
    `https://serpapi.com/search.json?engine=google&q=${inputvalue}&google_domain=google.com&gl=us&hl=en&api_key=a97958c2af388fd67fa25a5ffff96640f9c08804383e96d7a5048e372e559f73`
  );
  let data = await res.json();
  console.log(data);
  // let resultdata = data.related_searches;
  // resultdata.forEach(() => {
  //   let p = document.createElement("p");
  //   p.innerText = d.title;
  //   p.onclick = function () {};
  //   showbox.append(p);
  // });
}
