// Fetching elements to add event
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const search = document.querySelector("#search");
const collection = document.querySelector(".collection");
const clearGoals = document.querySelector(".clearGoals");

// Adding eventListenser
let loadEventListeners = () => {
  taskForm.addEventListener("submit", addGoals);

  collection.addEventListener("click", taskDone);
};

// Adding goals
let addGoals = (event) => {
  if (taskInput.value == "") {
    M.toast({
      html: "Please add your goals first",
      displayLength: 2000,
      outDuration: 1000,
    });
  } else {
    // Creating li as Tasks
    const task = document.createElement("li");
    task.className = "collection-item";

    // Creating Check ticks as doneLinks
    const doneLink = document.createElement("a");
    doneLink.className = "doneLink secondary-content";
    doneLink.innerHTML = '<i class="material-icons">check_box</i>';

    // Appending Parent child
    task.appendChild(document.createTextNode(taskInput.value));
    task.appendChild(doneLink);
    collection.appendChild(task);

    // Clearing Input Field
    taskInput.value = "";
  }

  event.preventDefault();
};

// Task done, removing task from collection
let taskDone = (event) => {
  if (event.target.parentElement.classList.contains("doneLink")) {
    event.target.parentElement.parentElement.remove();
  }
};

// Initalizing EventListeners
loadEventListeners();
