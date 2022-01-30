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
