    // Organitzador de Tasques
    /* 

    Autor: Víctor Fuertes Centeno
    Data : Abril de 2026
    Descripció: Classe que encapsula la lògica de creació, esborrar i guardar en la memòria del navegador les tasques.
    --Aquesta classe forma part del projecte web_learn, on estic auto-aprenent desenvolupament web--
    */
    

    // Inicialitzar els elements de l'html: Inputs, botons, comptadors, etc.
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

        // Afegir el nou LI a la llista (UL) anomenada taskList i guarda la tasca
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

        // Afegir el nou LI a la llista (UL) anomenada taskList i guarda la tasca
        saveTasks();
        updateTaskCounts();
    });


    // funció per crear tasques, 
    // utilitzada pel botó (Afegir Tasca) i també per l'inicialització de tasques guardades a la memòria.
    function createTaskItem(taskText, isCompleted = false) {

        // Crea la tasca i assigna el text de l'Input
        let newTask = document.createElement("li");

        newTask.textContent = taskText;

        if (isCompleted){
            newTask.classList.add("completed");
        }

        // Possibilitat de completar tasques fent-li clic.
        newTask.addEventListener("click", function(){
            newTask.classList.toggle("completed");
            saveTasks();
            updateTaskCounts();
        });

        // Botó d'esborrar tasca
        let removeButton = document.createElement("button");
        removeButton.textContent = "❌";

        removeButton.addEventListener("click", function(event){
            event.stopPropagation();
            newTask.remove();
            saveTasks();
            updateTaskCounts();
        
        });

        // Possibilitat d'Editar Tasca
        newTask.addEventListener("dblclick", function(){
        let currentText = newTask.firstChild.textContent;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        newTask.firstChild.replaceWith(input);
        input.focus();

        input.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {

                let updatedText = input.value;

                let textNode = document.createTextNode(updatedText);

                input.replaceWith(textNode);

                saveTasks();
                updateTaskCounts();

            }

        });

        });

        // Afegir botó d'esborrar a la tasca, i la tasca a la llista de tasques.
        newTask.appendChild(removeButton);
        taskList.appendChild(newTask);

        updateTaskCounts();

    }


    // Llògica pel botó "Totes", de mostrar totes les tasques
    showAllTasksButton.addEventListener("click", function() {
        // Selecciona totes les tasques
        let taskItems = document.querySelectorAll("#taskList li");
        // Recorre totes les tasques
        taskItems.forEach(function(task){
            
            // Mostra la tasca
            task.style.display = "";

        });
    });


    // Llògica pel botó "Per Completar", de mostrar totes les tasques
    showPendingTasksButton.addEventListener("click", function() {
        let taskItems = document.querySelectorAll("#taskList li");
        taskItems.forEach(function(task){
            if (task.classList.contains("completed")){
                // Amaga la tasca
                task.style.display = "none";
            }
            else{
                task.style.display = "";
            }

        });
    });


    // Llògica pel botó "Completades"
    showCompletedTasksButton.addEventListener("click", function() {
        let taskItems = document.querySelectorAll("#taskList li");
        taskItems.forEach(function(task){
        
            if (task.classList.contains("completed")){

                task.style.display = "";
            }
            else{
                task.style.display = "none";
            }

        });

    });


    // Funció per actuallitzar els comptadors de tasques
    function updateTaskCounts() {

        let taskItems = document.querySelectorAll("#taskList li");
        let pending = 0; 
        let completed = 0;
        
        taskItems.forEach(function(task){

            if (task.classList.contains("completed")){
                completed++;
            }

            else {
                pending++;
            };
        });

        completedTasksCounter.textContent = completed;
        pendingTasksCounter.textContent = pending;
        allTasksCounter.textContent = taskItems.length;
    }


    // funció per guardar tasques encara que es refresqui el navegador, guarda totes les tasques actuals
    function saveTasks() {

        let tasks = [];

        let taskItems = document.querySelectorAll("#taskList li");

        taskItems.forEach(function(task) {

            let taskObject = {
                    
                text: task.firstChild.textContent,
                completed: task.classList.contains("completed")

            };

            tasks.push(taskObject);

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

        tasks.forEach(function(task){
            createTaskItem(task.text, task.completed);
        });

    }


    loadTasks();