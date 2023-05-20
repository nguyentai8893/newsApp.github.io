"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : [];
// khai báo và lấy data từ local storage
let setting = getFromStorage("settingUser")
  ? JSON.parse(getFromStorage("settingUser"))
  : [];
btnSubmit.addEventListener("click", () => {
  let perPage = parseInt(inputPageSize.value);
  let category = inputCategory.value;
  if (perPage > 0 && Number.isInteger(perPage) && perPage !== "") {
    let obj = {
      pageSize: perPage,
      category: category,
      userName: currentUser.userName,
    };
    setting.push(obj);
    console.log("setting", setting);
  }

  // lưu thông tin setting vào storage
  saveToStorage("settingUser", JSON.stringify(setting));
});
let settingLoad;
if (setting) {
  settingLoad = setting.filter(
    (item) => item.userName === currentUser.userName
  );
}
if (settingLoad.length === 0) {
  inputPageSize.value = 5;
  inputCategory.value = "Business";
} else {
  inputPageSize.value = settingLoad[0].pageSize;
  inputCategory.value = settingLoad[0].category;
}
