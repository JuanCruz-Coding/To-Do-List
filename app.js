// Esperar a que la página cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    
    inputTarea = document.getElementById("input-tarea");
    agregarBtn = document.getElementById("agregar-btn");
    listaTareas = document.getElementById("lista-tareas");

    // Funcion para agregar una nueva tarea
    function agregarTarea() {
        const tareaTexto = inputTarea.value.trim();

        if (tareaTexto !== "") {
            // Crear un nuevo elemento de lista
            const nuevaTarea = document.createElement("li");
            nuevaTarea.textContent = tareaTexto;    

            // agregar el <li> a la lista
            listaTareas.appendChild(nuevaTarea);

            // Limpiar el campo de entrada
            inputTarea.value = "";
        } else {
            alert("Por favor, ingresa una tarea.");
        }
    }

    // Cuando hagan click en el botón, ejecuta agregarTarea()
    agregarBtn.addEventListener("click", agregarTarea);
});