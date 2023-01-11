let text = document.getElementById("text");
let saveInd = document.getElementById("save-index");
let addBtn = document.getElementById("addBtn");
let saveEdit = document.getElementById("save-changes");
let list = document.getElementById("new-list");
let todoArray = [];
addBtn.addEventListener("click", (e) => {
    e.preventDefault()
  let serializedTodo = localStorage.getItem("todo");
  todoArray = serializedTodo ? JSON.parse(serializedTodo) : [];
  todoArray.push(text.value);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  text.value = "";
  displayTodo();
});

function displayTodo() {
  let serializedTodo = localStorage.getItem("todo");
  todoArray = serializedTodo ? JSON.parse(serializedTodo) : [];
  let htmlCode = "";
  todoArray.forEach((elem, index) => {
    htmlCode += `
    <div style="display: flex; gap: 20px; justify-conntent: space-between">
    <p style="display: inline-block; width: 57%;">${elem}</p>
    <button onclick="edit(${index})" style="background-color: green">Edit</button>
    <button onclick="deleteTodo(${index}) " style="background-color: red">Delete</button>
    </div>
    `;
  });
  list.innerHTML = htmlCode;
}

function deleteTodo(index){
  let serializedTodo = localStorage.getItem("todo")
  todoArray = JSON.parse(serializedTodo);
  todoArray.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo()
}

function edit(index) {
  saveInd.value = index;
  let serializedTodo = localStorage.getItem("todo");
  todoArray = JSON.parse(serializedTodo);
  text.value = todoArray[index];
  addBtn.style.display = "none";
  saveEdit.style.display = "block";
}
saveEdit.addEventListener("click", () => {
  let index = saveInd.value;
  let serializedTodo = localStorage.getItem("todo");
  todoArray = JSON.parse(serializedTodo);
  todoArray[index] = text.value;
  localStorage.setItem("todo", JSON.stringify(todoArray));
  text.value = "";
  addBtn.style.display = "block";
  saveEdit.style.display = "none";
  displayTodo();
});

