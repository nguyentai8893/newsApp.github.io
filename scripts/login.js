"use strict";

const userNameEl = document.getElementById("input-username");
const passwordEl = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

const KEY = "USER-ARRAY";

let userArr = getFromStorage(KEY) ? JSON.parse(getFromStorage(KEY)) : [];
let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  :null;

let isLogin;
// validate dữ liệu
const validateData = (data) => {
  if (data.userName === "") {
    alert("Please enter the userName .!");
    return;
  }

  if (data.userPassword === "") {
    alert("Please enter the Password .!");
    return;
  }

  isLogin = userArr.find((item) => {
    return item.userName == data.userName && item.password == data.userPassword;
  });
  if (isLogin) {
    alert("đang nhập thành công");
  } else {
    alert("sai username hoặc pass");
    return;
  }
  return data;
};
loginBtn.addEventListener("click", function () {
  const data = {
    userName: userNameEl.value.trim(),
    userPassword: passwordEl.value.trim(),
  };
  const validate = validateData(data);
  // lưu user đang login vào storage và chuyển trang
  if (validate) {
    currentUser = data;
    saveToStorage("currentUser", JSON.stringify(currentUser));
    console.log(currentUser);
    window.location.replace("../index.html");
  }
});
