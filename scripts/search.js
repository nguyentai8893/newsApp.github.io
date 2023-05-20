"use strict";

const inputSearch = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const containerEl = document.getElementById("news-container");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const navPageNum = document.getElementById("nav-page-num");
//khai báo biến và get data from local storage
let setting = getFromStorage("settingUser")
  ? JSON.parse(getFromStorage("settingUser"))
  : [];
let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : [];
let keySearch;
let page = 1;
let totalResults = 0;
const user = new User();
let pageSize;
// lọc user đang login và gán pagesize = pagesize đã setting
let userSetting = setting.filter(
  (item) => item.userName === currentUser.userName
);
if (!userSetting.lenght) {
  pageSize = 5;
} else {
  userSetting.forEach((item) => {
    pageSize = item.pageSize;
  });
}
// get data từ api
async function fetchSeacrh() {
  try {
    const urlApi = `https://newsapi.org/v2/everything?q=${keySearch}&pageSize=${pageSize}&page=${page}&apiKey=1d3a9575e80c49bfa9e3b7210fd3934f`;
    await user.getData(urlApi).then((data) => {
      totalResults = data.totalResults;
      renderData(data);
    });
  } catch (error) {
    console.log(error);
  }
}
// kiểm tra dữ liệu đầu vào
const validateData = (data) => {
  if (data.inputvalue === "") {
    alert('"Please enter the search keyword');
    return;
  }
  return data;
};
// sử lý sựi kiện click btn search
btnSearch.addEventListener("click", () => {
  const data = {
    inputvalue: inputSearch.value.trim(),
  };
  const validate = validateData(data);
  if (validate) {
    keySearch = data.inputvalue;
    page = 1;
    pageNum.innerText = page;

    fetchSeacrh();
  }
});
navPageNum.classList.add("hiden");
// hàm render
function renderData(data) {
  if (data) {
    navPageNum.classList.remove("hiden");
  }
  containerEl.innerHTML = "";
  page == 1 ? (btnPrev.style.display = "none") : null;
  data.articles.forEach((item) => {
    const div = document.createElement("div");
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
// sử lý sự kiện click các nút
btnNext.addEventListener("click", () => {
  const maxPage = Math.ceil(totalResults / pageSize);
  page++;
  pageNum.innerText = page;
  fetchSeacrh(page, pageSize);
  if (page == maxPage) {
    btnNext.style.display = "none";
  }
  btnPrev.style.display = "block";
});
btnPrev.addEventListener("click", () => {
  page--;
  pageNum.innerText = page;
  fetchSeacrh(page, pageSize);
  if (page < 2) {
    btnPrev.style.display = "none";
  }
  btnNext.style.display = "block";
});
