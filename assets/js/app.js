// Fetching elements to add event
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const search = document.querySelector("#search");
const collection = document.querySelector(".collection");
const clearGoals = document.querySelector(".clearGoals");

// Adding eventListenser
const loadEventListeners = () => {
  taskForm.addEventListener("submit", addGoals);

  collection.addEventListener("click", taskDone);

  clearGoals.addEventListener("click", clearTaskList);
};

// Adding goals
const addGoals = (event) => {
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
const taskDone = (event) => {
  if (event.target.parentElement.classList.contains("doneLink")) {
    event.target.parentElement.parentElement.remove();
  }
};

// Clear all goals
const clearTaskList = () =>{
  if (confirm("Are you sure?")){
    while(collection.firstChild){
      collection.removeChild(collection.firstChild)
    }
  }
}

// Initalizing EventListeners
loadEventListeners();
