// Botó per index.html: Text canviant
let button = document.getElementById("helloButton");
let message = document.getElementById("messageText")

button.addEventListener("click", function() {

    button.textContent = "Clicat!";

    if (message.textContent == "Aquest text canviarà..."){
        message.textContent = "El text ha canviat!";
    }
    else{
        message.textContent = "Aquest text canviarà...";
    }
});



