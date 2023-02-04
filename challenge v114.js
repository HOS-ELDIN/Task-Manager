let addTask = document.querySelector(".add-task");
let container = document.querySelector(".tasks-container");
let newTask = document.querySelector(".task-name");

// check if there are any tasks in storage and create them
if (localStorage.getItem("tasks")) {
  // parse reconvert the string to array
  let retrived = JSON.parse(localStorage.getItem("tasks"));
  retrived.forEach((e) => {
    createTask(e);
  });
  console.log(retrived);
}

// prevent the submit and run the create function and run save to local storage function
addTask.addEventListener("click", (e) => {
  // preventing the submit
  e.preventDefault();
  // run create function if the input not empty
  if (newTask.value !== "") {
    createTask(newTask.value);
    newTask.value = newTask.defaultValue;
  }
  // run save to local storage function
  save();
});

// function to create task and but it into the container
function createTask(title) {
  let task = document.createElement("div");
  let par = document.createElement("p");
  let taskName = document.createTextNode("");
  taskName = title;
  par.append(taskName);
  let btn = document.createElement("button");
  let btnText = document.createTextNode("Delete");
  btn.append(btnText);
  task.append(par);
  task.append(btn);
  task.classList.add("task");
  container.appendChild(task);
}

// function on mouse hover to create the del array and save the changes to the local storage
container.onmouseover = () => {
  let del = document.querySelectorAll("button");

  // go through the del array and look for a click to delete the parent
  del.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
    });
  });
  // run the save function to save the changes to local storage
  save();
};

// function to create array from tasks titles and save it local storage
function save() {
  let tasksArray = [];
  for (let i = 0; i < container.children.length; i++) {
    tasksArray.push(container.children.item(i).children.item(0).innerHTML);
  }
  // stringify convert the array to string
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// localStorage.clear()
