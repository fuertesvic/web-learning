// Botó per tasks.html - afegir tasques
let taskInput = document.getElementById("taskInput");
let taskButton = document.getElementById("taskButton");
let taskList = document.getElementById("taskList");
  
taskButton.addEventListener("click", function(){

    let taskText = taskInput.value;

    if (taskText === "") {

        return;
    }

    let newTask = document.createElement("li");
    newTask.textContent = taskText;
    
    // Create delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";

    // Delete task
    deleteButton.addEventListener("click", function() {

    newTask.remove();

    });
    
    // Toggle completed when clicked
    newTask.addEventListener("click", function() {
    newTask.classList.toggle("completed");

    });

    newTask.appendChild(deleteButton);  
    taskList.appendChild(newTask);
    taskInput.value = "";

    
});