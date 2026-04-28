// Organitzador de Tasques
/* 

Autor: Víctor Fuertes Centeno
Data : Abril de 2026
Descripció: Classe que encapsula la lògica de creació, esborrar i guardar en la memòria del navegador les tasques.
--Aquesta classe forma part del projecte web_learn, on estic auto-aprenent desenvolupament web--
*/

// Array de tasques
let tasks = [];

// Filtre seleccionat, per controlar quines tasques es mostren. Pot ser "all", "pending" o "completed".
let currentFilter = "all";

// Inicialitzar els elements HTML: Inputs, botons, comptadors, etc.
let taskInput = document.getElementById("taskInput");
let addTaskButton = document.getElementById("addTaskButton");
let taskList = document.getElementById("taskList");
let showAllTasksButton = document.getElementById("showAllTasksButton");
let showPendingTasksButton = document.getElementById("showPendingTasksButton");
let showCompletedTasksButton = document.getElementById("showCompletedTasksButton");
let allTasksCounter = document.getElementById("allTaskCount");
let pendingTasksCounter = document.getElementById("pendingTaskCount"); 
let completedTasksCounter = document.getElementById("completedTaskCount"); 


// Lògica de l'input per Afegir Tasca
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        
    // Agafar l'input de l'usuari, validar que no és nul
    let taskText = taskInput.value;

    if (taskText === "") {
        return;
    }

    // Crea la tasca
    createTaskItem(taskText, taskText.completed); 
    
    // Neteja el contingut de l'input
    taskInput.value = "";

    saveTasks();
    }
});

// Event de Click al botó d'afegir tasca
addTaskButton.addEventListener("click", function(){

    // Agafar l'input de l'usuari, validar que no és nul
    let taskText = taskInput.value;

    if (taskText === "") {

        return;
    }

    // Crea la tasca
    createTaskItem(taskText, taskText.completed); 

    // Neteja el contingut de l'input
    taskInput.value = "";
    saveTasks();
});


// funció per crear tasques, 
// utilitzada pel botó (Afegir Tasca) i també per l'inicialització de tasques guardades a la memòria.
function createTaskItem(taskText, isCompleted = false) {

    tasks.push({
        text: taskText,
        completed: isCompleted
    })
    renderTasks();
}


// Llògica pel botó "Totes", de mostrar totes les tasques
showAllTasksButton.addEventListener("click", function() {
    currentFilter = "all";
    renderTasks();
});


// Llògica pel botó "Per Completar", de mostrar totes les tasques
showPendingTasksButton.addEventListener("click", function() {
    currentFilter = "pending";
    renderTasks();
});


// Llògica pel botó "Completades"
showCompletedTasksButton.addEventListener("click", function() {
    currentFilter = "completed";
    renderTasks();
});


// Funció per actuallitzar els comptadors de tasques
function updateTaskCounts() {

    let pending = 0; 
    let completed = 0;
    
    tasks.forEach(function(task){

        if (task.completed){
            completed++;
        }

        else {
            pending++;
        };
    });

    completedTasksCounter.textContent = completed;
    pendingTasksCounter.textContent = pending;
    allTasksCounter.textContent = tasks.length;
}


// funció per guardar tasques encara que es refresqui el navegador, guarda totes les tasques actuals
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// funció per carregar tasques des de la memòria del navegador
function loadTasks(){
    
    let savedTasks = localStorage.getItem("tasks");

    tasks = JSON.parse(savedTasks)

    renderTasks();
}

function renderTasks(){

    console.log("Rendering Tasks!");

    // Esborra el contingut html
    taskList.innerHTML = "";

    // Itera l'array de tasques i manté un index
    tasks.forEach(function(task, index) {

        if (currentFilter === "pending" && task.completed) {
            return;
        }
        if (currentFilter === "completed" && !task.completed){
            return;
        }
        let newTask = document.createElement("li");
        newTask.textContent = task.text ;
        if (task.completed) {
            newTask.classList.add("completed");
        }

        // Possibilitat de completar tasques fent-li clic.
        newTask.addEventListener("click", function(){
            
            // Això fa canviar d'estat de false a true o true a false. "Interruptor".
            tasks[index].completed = !tasks[index].completed;
            
            // Cal guardar renderitzar de nou
            saveTasks();
            updateTaskCounts();
            renderTasks();
        });

        // Botó d'esborrar tasca
        let removeButton = document.createElement("button");
        removeButton.textContent = "❌";

        removeButton.addEventListener("click", function(event){
            console.log(tasks[index]);
            event.stopPropagation();

            // Elimina l'element de l'array seleccionat.
            tasks.splice(index, 1);
            saveTasks();
            updateTaskCounts();
            renderTasks();
        
        });

        // Afegeix el botó a la tasca, i la tasca a la llista.
        newTask.appendChild(removeButton);
        taskList.appendChild(newTask);

    });
    updateTaskCounts();
}


loadTasks();