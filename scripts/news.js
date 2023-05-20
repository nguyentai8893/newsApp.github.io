"use strict";
const containerEl = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
let setting = getFromStorage("settingUser")
  ? JSON.parse(getFromStorage("settingUser"))
  : [];
let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : [];
console.log("settin", setting);
// lọc setting của user đang login
let userSetting = setting.filter(
  (item) => item.userName === currentUser.userName
);
console.log("settinf", userSetting);

let page = 1;
let pageSize=5;
let category="general";
let totalResults = 0;
// lấy setting và gán vào biến
console.log(userSetting)
if (userSetting) {
    userSetting.forEach((item) => {
    pageSize = item.pageSize;
    category = item.category.toLowerCase();
    console.log('sdfsfsf')
  });
}
// khởi tạo đối tượng từ class User
const user1 = new User();
async function fetchNew() {
  try {
    const urlApi = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=1d3a9575e80c49bfa9e3b7210fd3934f`;
    await user1.getData(urlApi).then((data) => {
      totalResults = data.totalResults;
      renderData(data);
    });
  } catch (error) {
    console.log(error);
  }
}
// hàm render
function renderData(data) {
  containerEl.innerHTML = "";
  console.log("cate", category);
  console.log("page", page);
  console.log("ad", totalResults);
  page == 1 ? (btnPrev.style.display = "none") : null;
  data.articles.forEach((item) => {
    const div = document.createElement("div");
    console.log(item);

    div.innerHTML = ` <div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
        <div class="row no-gutters">
            <div class="col-md-4">
            <img src="${item.urlToImage}"
                    class="card-img"
                    alt="${item.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <a href="${item.url}"
                        class="btn btn-primary">View</a>
                </div>
            </div>
        </div>
    </div>
</div>`;
    containerEl.appendChild(div);
  });
}
fetchNew();
// sử lý các sự kiện
btnNext.addEventListener("click", function () {
  console.log("total", totalResults);

  const maxPage = Math.ceil(totalResults / pageSize);
  console.log(maxPage);
  page++;
  pageNum.innerText = page;
  fetchNew(page, pageSize);

  if (page == maxPage) {
    btnNext.style.display = "none";
  }
  btnPrev.style.display = "block";
});
btnPrev.addEventListener("click", function () {
  page--;
  fetchNew(page, pageSize);
  pageNum.innerText = page;
  if (page == 1) {
    btnPrev.style.display = "none";
  }
  btnNext.style.display = "block";
});
