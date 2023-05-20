"use strict";

const loginModalEl = document.getElementById("login-modal");
const contentEl = document.getElementById("main-content");
const messageEl = document.getElementById("welcome-message");
const logOutBtn = document.getElementById("btn-logout");

let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : null;
let userArr = getFromStorage("KEY") ? JSON.parse(getFromStorage("KEY")) : [];
// sử lý ẩn hiện modal và logout user
console.log(currentUser);
if (currentUser) {
  loginModalEl.classList.add("hiden");
  messageEl.textContent = ` welcome ${currentUser.userName}`;
  contentEl.classList.remove("hiden");
} else {
  loginModalEl.classList.remove("hiden");
  messageEl.textContent = "";
  logOutBtn.classList.add("hiden");
}
logOutBtn.addEventListener("click", function () {
  removeItem("currentUser");
  loginModalEl.classList.add("hiden");
  messageEl.textContent = "";
  logOutBtn.classList.add("hiden");
  window.location.replace("../index.html");
});
