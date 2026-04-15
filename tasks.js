// Classe que encapsula la lògica de creació, esborrar i guardar en la memòria del navegador les tasques.

// Botó per tasks.html - afegir tasques
let taskInput = document.getElementById("taskInput");
let addTaskButton = document.getElementById("addTaskButton");
let taskList = document.getElementById("taskList");
  
// Event de Click al botó d'afegir tasca
addTaskButton.addEventListener("click", function(){

    // Agafar l'input de l'usuari, validar que no és nul
    let taskText = taskInput.value;

    if (taskText === "") {

        return;
    }

    // Crea la tasca
    createTaskItem(taskText); 

    // Neteja el contingut de l'input
    taskInput.value = "";

    // Afegir el nou LI a la llista (UL) anomenada taskList i guarda la tasca
    saveTasks();

});


// funció per crear tasques, utilitzada pel botó (Afegir Tasca) i també per l'inicialització de tasques guardades a la memòria.
function createTaskItem(taskText) {

    // Crea la tasca i assigna el text de l'Input
    let newTask = document.createElement("li");

    newTask.textContent = taskText;

    // Possibilitat de completar tasques fent-li clic.
    newTask.addEventListener("click", function(){
        newTask.classList.toggle("completed");
        saveTasks();
    });

    // Botó d'esborrar tasca
    let removeButton = document.createElement("button");
    removeButton.textContent = "❌";

    removeButton.addEventListener("click", function(event){
        event.stopPropagation();
        newTask.remove();
        saveTasks();
       
    });

    // Afegir botó d'esborrar a la tasca, i la tasca a la llista de tasques.
    newTask.appendChild(removeButton);
    taskList.appendChild(newTask);

}

// funció per guardar tasques encara que es refresqui el navegador, guarda totes les tasques actuals
function saveTasks() {

    let tasks = [];

    let taskItems = document.querySelectorAll("#taskList li");

    taskItems.forEach(function(task) {

        tasks.push(task.textContent);

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// funció per carregar tasques des de la memòria del navegador
function loadTasks(){
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
        return;
    }

    let tasks = JSON.parse(savedTasks);

    tasks.forEach(function(taskText){
        createTaskItem(taskText);
    });

}

loadTasks();