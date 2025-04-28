

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
            const tareaCompletada = document.createElement("button")
            const eliminarTarea = document.createElement("button")

            tareaCompletada.textContent = "✔️"
            tareaCompletada.addEventListener("click", function() {
                nuevaTarea.classList.toggle("text-decoration-line-through")
            });

            eliminarTarea.textContent = "🗑"
            eliminarTarea.classList.add("eliminar-tarea")
            eliminarTarea.addEventListener("click", function() {
                listaTareas.removeChild(nuevaTarea);
            });

            nuevaTarea.textContent =tareaTexto + " - " + new Date().toLocaleString("es-ES", { timeZone: "America/Argentina/Buenos_Aires" });

           

            nuevaTarea.appendChild(tareaCompletada)
            nuevaTarea.appendChild(eliminarTarea)

            // agregar el <li> a la lista
            listaTareas.appendChild(nuevaTarea);

            // Limpiar el campo de entrada
            inputTarea.value = "";
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No se puede agregar una tarea vacía',
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
    }

    // Cuando hagan click en el botón, ejecuta agregarTarea()
    agregarBtn.addEventListener("click", agregarTarea);
});
