

// Esperar a que la página cargue completamente
document.addEventListener("DOMContentLoaded", function () {

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
                crearElementoTarea(tarea.texto, tarea.completada, tarea.creada, tarea.completadaEn, tarea.vencimiento);
            });
        }
        actualizarContador();
    }

    // Guardar tareas en el localStorage
    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    // crear un <li> en el DOM
    function crearElementoTarea(texto, completada = false, creada = null, completadaEn = null, vencimiento = null) {
        const nuevaTarea = document.createElement("li");
        const spanTexto = document.createElement("span");
        const botonEliminar = document.createElement("button");
        const infoFechas = document.createElement("div");

        spanTexto.textContent = texto;
        botonEliminar.textContent = "🗑";

        if (completada) {
            nuevaTarea.classList.add("completada");
        }

        botonEliminar.classList.add("eliminar-tarea");
        infoFechas.classList.add("text-muted", "small");

        // Mostrar las fechas (creación, vencimiento, finalización)
        infoFechas.innerHTML = `
        Creada: ${creada || "Desconocida"}
        ${vencimiento ? `<br>Vence: ${vencimiento}` : ""}
        ${completadaEn ? `<br>Completada: ${completadaEn}` : ""}
        `;

        spanTexto.addEventListener("click", function () {
            nuevaTarea.classList.toggle("completada");
            //Actualizar estado en el array de tareas
            const index = Array.from(listaTareas.children).indexOf(nuevaTarea);
            const tarea = tareas[index];

            tarea.completada = !tarea.completada;
            tarea.completadaEn = tarea.completada ? new Date().toLocaleString() : null;

            guardarTareas(); // Guardar cambios en el localStorage
            actualizarContador();

            // Actualizar fechas visualmente
            infoFechas.innerHTML = `
            Creada: ${tarea.creada}
            ${tarea.vencimiento ? `<br>Vence: ${tarea.vencimiento}` : ""}
            ${tarea.completadaEn ? `<br>Completada: ${tarea.completadaEn}` : ""}
            `;

        });

        botonEliminar.addEventListener("click", function () {
            Swal.fire({
                title: 'Estas seguro?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    const index = Array.from(listaTareas.children).indexOf(nuevaTarea);
                    tareas.splice(index, 1); // Eliminar del array
                    listaTareas.removeChild(nuevaTarea); // Eliminar del DOM
                    guardarTareas();
                    actualizarContador();
                }
            });
        });


        nuevaTarea.appendChild(spanTexto);
        nuevaTarea.appendChild(infoFechas); // Agregar la información de fechas al <li>
        nuevaTarea.appendChild(botonEliminar);
        listaTareas.appendChild(nuevaTarea);
    }


    // Funcion para agregar una nueva tarea
    function agregarTarea() {
        const tareaTexto = inputTarea.value.trim();
        const fechaLimite = document.getElementById("fechaLimite").value; // Obtener la fecha límite del input

        if (tareaTexto !== "") {
            tareas.push({ texto: tareaTexto, completada: false, creada: new Date().toLocaleString(), completadaEn: null, vencimiento: fechaLimite || null }); // Agregar la tarea al array
            guardarTareas(); // Guardar en el localStorage
            actualizarContador(); // Actualizar el contador de tareas
            crearElementoTarea(tareaTexto, false, new Date().toLocaleString(), null, fechaLimite || null); // Crear el elemento en el DOM
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
    actualizarContador();


    const botonesFiltro = document.querySelectorAll(".filtro-btn");

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function () {
            const filtro = this.getAttribute("data-filtro");
            aplicarFiltro(filtro);
        });
    });

    function aplicarFiltro(tipo) {
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

    function actualizarContador() {
        const total = tareas.length;
        const completadas = tareas.filter(tarea => tarea.completada).length;
        const pendientes = total - completadas;

        document.getElementById("total").textContent = total;
        document.getElementById("completadas").textContent = completadas;
        document.getElementById("pendientes").textContent = pendientes;
    }

    
});

