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

  search.addEventListener("keyup", searchGoals);

  document.addEventListener("DOMContentLoaded", getGoals);
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
    doneLink.innerHTML =
      '<i class="material-icons red-text">delete_forever</i>';

    // Appending Parent child
    task.appendChild(document.createTextNode(taskInput.value));
    task.appendChild(doneLink);
    collection.appendChild(task);

    // Store in local Storage
    storeInLS(taskInput.value);

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

  // Remove done goal from local storage
  removeGoalFromLS(event.target.parentElement.parentElement);
};

// Clear all goals
const clearTaskList = () => {
  if (confirm("Are you sure?")) {
    while (collection.firstChild) {
      collection.removeChild(collection.firstChild);
    }
  }

  // clear from local storage
  clearGoalsFromLS();
};

// Search Goals
const searchGoals = (event) => {
  const text = event.target.value.toLowerCase();
  const goals = document.querySelectorAll(".collection-item");

  goals.forEach(function (goal) {
    const item = goal.firstChild.textContent.toLowerCase();

    if (item.indexOf(text) != -1) {
      goal.style.display = "block";
    } else {
      goal.style.display = "none";
    }
  });
};

// ************Local Storage Configurations************

// Adding goalslist in the local storage
const storeInLS = (goalsList) => {
  let goals;
  if (localStorage.getItem("goals") === null) {
    // For new users
    goals = [];
  } else {
    // For existing users
    goals = JSON.parse(localStorage.getItem("goals")); // for existing users
  }

  // Uploading goals in the goals array
  goals.push(goalsList);
  // Converting and uploading goals as strings
  localStorage.setItem("goals", JSON.stringify(goals));
};

// Remove goal from goalsList in local storage
const removeGoalsFromLS = (goalItem) => {
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.forEach(function (goal, index) {
    if (goalItem.textContent === goal) {
      goals.splice(index, 1);
    }
  });

  localStorage.setItem("goals", JSON.stringify(goals));
};

// Clearing goalslist from local storage
const clearGoalsFromLS = () => {
  localStorage.clear();
};

// *********** Main program **************

const getGoals = () => {
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  // Showing what's in the local storage
  goals.forEach(function (goal) {
    // Creating li as Tasks
    const task = document.createElement("li");
    task.className = "collection-item";

    // Creating Check ticks as doneLinks
    const doneLink = document.createElement("a");
    doneLink.className = "doneLink secondary-content";
    doneLink.innerHTML =
      '<i class="material-icons red-text">delete_forever</i>';

    // Appending Parent child
    task.appendChild(document.createTextNode(goal));
    task.appendChild(doneLink);
    collection.appendChild(task);
  });
};
// Initalizing EventListeners
loadEventListeners();
