"use strict";

const $$ = document.getElementById.bind(document);
const firstNameEl = $$("input-firstname");
const lastNameEl = $$("input-lastname");
const userNameEl = $$("input-username");
const passwordEl = $$("input-password");
const passwordConfirm = $$("input-password-confirm");
const registerBtn = $$("btn-submit");

const KEY = "USER-ARRAY";
let userArr = getFromStorage(KEY) ? JSON.parse(getFromStorage(KEY)) : [];
// validate
const validateData = (data) => {
  if (data.firstName === "") {
    alert("Please enter the firstName .!");
    return;
  }
  if (data.lastName === "") {
    alert("Please enter the lastName .!");
    return;
  }
  if (data.userName == "") {
    alert("Please enter the userName .!");
    return;
  }
  for (let i = 0; i < userArr.length; i++) {
    if (data.userName === userArr[i].userName) {
      alert("userName must be unique!");
      return;
    }
  }

  if (data.password == "" ) {
    alert("Please enter the password .!");
    return;
  }
  if(data.password.length < 8){
    alert('password at least 8 characters')
    return
  }
  if (data.passwordConfirm == "" || data.passwordConfirm !== data.password) {
    alert("Passwords do not match .!");
    return;
  }
  return data;
};

// lắng nghe sự kiện submit
registerBtn.addEventListener("click", function () {
  const data = {
    firstName: firstNameEl.value.trim(),
    lastName: lastNameEl.value.trim(),
    userName: userNameEl.value.trim(),
    password: passwordEl.value.trim(),
    passwordConfirm: passwordConfirm.value.trim(),
  };
  const validate = validateData(data);
  if (validate) {
    let userObj = new User(
      data.firstName,
      data.lastName,
      data.userName,
      data.password
    );
    userArr.push(userObj);
    saveToStorage(KEY, JSON.stringify(userArr));
    // clearInput()
    window.location.href = "login.html";
  }
  console.log(userArr);
});
// const clearInput = () => {
//   firstNameEl.value = "";
//   lastNameEl.value = "";
//   userNameEl.value = "";
//   passwordEl.value = "";
//   passwordConfirm.value = "";
// };
