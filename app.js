

// Esperar a que la página cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    
    inputTarea = document.getElementById("input-tarea");
    agregarBtn = document.getElementById("agregar-btn");
    listaTareas = document.getElementById("lista-tareas");

    let tareas = [];

    // Cargar tareas desde el localStorage al cargar la página
    function cargarTareas() {
        const datosGuardados = localStorage.getItem("tareas");
        if (datosGuardados) {
            tareas = JSON.parse(datosGuardados);
            tareas.forEach(tarea => {
                crearElementoTarea(tarea.texto, tarea.completada);
            });
        }
    }

    // Guardar tareas en el localStorage
    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    // crear un <li> en el DOM
    function crearElementoTarea(texto, completada = false) {
        const nuevaTarea = document.createElement("li");
        const spanTexto = document.createElement("span");
        const botonEliminar = document.createElement("button");

        spanTexto.textContent = texto;
        botonEliminar.textContent = "🗑";

        if(completada) {
            nuevaTarea.classList.add("completada");
        }

        botonEliminar.classList.add("eliminar-tarea");

        spanTexto.addEventListener("click", function() {
            nuevaTarea.classList.toggle("completada");
            //Actualizar estado en el array de tareas
            const index = Array.from(listaTareas.children).indexOf(nuevaTarea);
            tareas[index].completada = !tareas[index].completada;
            guardarTareas(); // Guardar cambios en el localStorage
         });

        botonEliminar.addEventListener("click", function() {
            const index = Array.from(listaTareas.children).indexOf(nuevaTarea);
            tareas.splice(index, 1); // Eliminar la tarea del array
            listaTareas.removeChild(nuevaTarea); // Eliminar el <li> del DOM
            guardarTareas(); // Guardar cambios en el localStorage
        });

        nuevaTarea.appendChild(spanTexto);
        nuevaTarea.appendChild(botonEliminar);
        listaTareas.appendChild(nuevaTarea);
    }


    // Funcion para agregar una nueva tarea
    function agregarTarea() {
        const tareaTexto = inputTarea.value.trim();

        if (tareaTexto !== "") {
            tareas.push({ texto: tareaTexto, completada: false }); // Agregar la tarea al array
            guardarTareas(); // Guardar en el localStorage
            crearElementoTarea(tareaTexto); // Crear el elemento en el DOM
            inputTarea.value = ""; // Limpiar el campo de entrada
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

    // Cargar tareas al iniciar la página
    cargarTareas();

    const botonesFiltro = document.querySelectorAll(".filtro-btn");

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function() {
            const filtro = this.getAttribute("data-filtro");
            aplicarFiltro(filtro);
        });
    });

    function aplicarFiltro(tipo){
        const items = listaTareas.children;
        for (let i = 0; i < items.length; i++) {
            const li = items[i];
            const estaCompletada = li.classList.contains("completada");

            if (tipo === "todas") {
                li.style.display = "";
            } else if (tipo === "completadas") {
                li.style.display = estaCompletada ? "" : "none";
            } else if (tipo === "pendientes") {
                li.style.display = !estaCompletada ? "" : "none";
            }
        }    
    }

});
