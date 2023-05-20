"use strict";

const btnAddEl = document.getElementById("btn-add");
const todoListEl = document.getElementById("todo-list");
const closeBtn = document.getElementById("close");

let todoArr = getFromStorage("todoArr")
  ? JSON.parse(getFromStorage("todoArr"))
  : [];

btnAddEl.addEventListener("click", () => {
  const inputTask = document.getElementById("input-task");
  const infor = {
    task: inputTask.value.trim(),
    owner: "nguyễn tài",
    isDone: false,
  };

  // kiểm tra ,lưu task vào storage và call hàm render
  let newTask;
  if (inputTask.value !== "") {
    newTask = new TodoTask(infor.task, infor.owner, infor.isDone);
    todoArr.push(newTask);
    console.log("arr", todoArr);
    saveToStorage("todoArr", JSON.stringify(todoArr));
    inputTask.value = "";
    renderToDoList(todoArr);
  }
});
// sử lý sự kiện click thẻ li
const eventClickLi = (e, i) => {
  const clickEdLi = e.target;
  let todocompl = todoArr.find((_, index) => index === i);

  if (todocompl.isDone === false) {
    clickEdLi.classList.add("checked");
    todocompl.isDone = true;
    saveToStorage("todoArr", JSON.stringify(todoArr));
  } else if (todocompl.isDone === true) {
    todocompl.isDone = false;
    saveToStorage("todoArr", JSON.stringify(todoArr));
    renderToDoList(todoArr);
  }
};
const liEl = document.querySelectorAll("#todo-list li");
// xóa task
const deleteTodo = (e,i) => {
  e.stopPropagation()
  todoArr = todoArr.filter((item, index) => index !== i);
  saveToStorage("todoArr", JSON.stringify(todoArr));
  renderToDoList(todoArr);
};
// hàm render
const renderToDoList = (todoArr) => {
  
  todoListEl.innerHTML = "";
  todoArr.forEach((item, i) => {
    const li = document.createElement("li");
    if (item.isDone) {
      li.classList.add("checked");
    }
    li.addEventListener("click", (e) => eventClickLi(e, i));
  const span=document.createElement('span')
  span.innerHTML='×'
  span.classList.add('close')
  span.addEventListener('click',(e)=>deleteTodo(e,i))
  li.innerHTML=`${item.task}`
  li.appendChild(span)
  todoListEl.appendChild(li)
  });
};
renderToDoList(todoArr);
