const readline = require("readline");

// Task object constructor
function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

// To-do list array
const tasks = [];

// Function to print available actions
function printActions() {
  console.log(`
***************************
Welcome to JS TODO-APP
***************************
Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark a task as done
5) Delete a task
6) Sort tasks by due date
7) Sort tasks by priority
8) Clear all tasks
9) Quit`);
}

const handleInput = (input) => {
  switch (input) {
    case "1":
      addTask();
      break;
    case "2":
      listAllTasks();
      break;
    case "3":
      listCompletedTasks();
      break;
    case "4":
      markTaskAsDone();
      break;
    case "5":
      deleteTask();
      break;
    case "6":
      sortTasksByDueDate();
      break;
    case "7":
      sortTasksByPriority();
      break;
    case "8":
      clearAllTasks();
      break;
    case "9":
      console.log("Goodbye!");
      process.exit();
      break;
    default:
      console.log("Invalid input.");
      printActions();
      break;
  }
};

// Function to add a new task
const addTask = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter task description: ", (description) => {
    rl.question("Enter due date: ", (dueDate) => {
      rl.question("Enter priority: ", (priority) => {
        const task = new Task(description, dueDate, priority);
        tasks.push(task);
        console.log("Successfully added a new task.");
        printActions();
        rl.close();
      });
    });
  });
};

// Function to list all tasks
const listAllTasks = () => {
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}) ${task.description} (Due: ${task.dueDate}, Priority: ${
        task.priority
      }, Completed: ${task.completed ? "Yes" : "No"})`
    );
  });
  printActions();
};

// Function to list completed tasks
const listCompletedTasks = () => {
  const completedTasks = tasks.filter((task) => task.completed);
  if (completedTasks.length === 0) {
    console.log("Oops, there are no completed tasks yet.");
  } else {
    completedTasks.forEach((task, index) => {
      console.log(
        `${index + 1}) Description: ${task.description}\nDue Date: ${
          task.dueDate
        }\nPriority: ${task.priority}`
      );
    });
  }
  printActions();
};
  
  // Function to sort tasks by due date
  const sortTasksByDueDate = () => {
    tasks.sort((task1, task2) => new Date(task1.dueDate) - new Date(task2.dueDate));
    console.log("Tasks sorted by due date.");
    printActions();
  };
  
  // Function to sort tasks by priority
  const sortTasksByPriority = () => {
    tasks.sort((task1, task2) => task2.priority - task1.priority);
    console.log("Tasks sorted by priority.");
    printActions();
  };
  
  // Function to clear all tasks
  const clearAllTasks = () => {
    tasks.length = 0;
    console.log("All tasks cleared.");
    printActions();
  };
  
  // Start the app
  printActions();
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.on("line", (input) => {
    handleInput(input.trim());
  });
  
  rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
  });