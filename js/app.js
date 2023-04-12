let formTextarea = document.getElementById('formTextarea');
let cabeceraTabla = document.getElementById('cabeceraTabla');
let contenidoTabla = document.getElementById('contenidoTabla');
let cadenaTabla = [];

let tablaTarea = document.getElementById('tablaTarea');
//activadores de eventos
formTextarea.addEventListener('submit', agregarTarea);
tablaTarea.addEventListener('click', eliminarTarea);

function agregarTarea(tarea) {
  tarea.preventDefault();

  //se muestra la cabecera de la tabla
  cabeceraTabla.classList.remove('d-none');

  //valida si ingresó una cadena
  if (tarea.target[0].value.length > 0) {
    //se hace un push a la cadenaTabla
    cadenaTabla.push(tarea.target[0].value);

    //Crear th
    let th = document.createElement('th');
    //th.scope = 'row';
    th.innerText = cadenaTabla.length;

    //crear td tarea
    let tdTarea = document.createElement('td');
    tdTarea.innerText = tarea.target[0].value;

    //crear el boton eliminar Tarea
    let botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = `<i class="bi bi-trash3-fill borrar-tarea" data-id=${tarea.target[0].value}></i>`;

    //Crear tr
    let tr = document.createElement('tr');
    tr.appendChild(th);
    tr.appendChild(tdTarea);
    tr.appendChild(botonEliminar);

    //se agrega el tr al contenido de la tabla
    contenidoTabla.append(tr);

    //Reset el textarea
    tarea.target[0].value = '';
  } else {
    alert('Por favor, ingrese una cadena con la tarea');
    tarea.target[0].value = '';
  }
}

function eliminarTarea(tarea) {
  //verifica si hay una tarea en la tabla de Tareas
  if (tarea.target.classList.contains('borrar-tarea')) {
    //tomo el id de la linea a borrar, en este caso es el elemento (nombre tarea) del array
    const nombreTarea = tarea.target.getAttribute('data-id');

    //Elimina del arrego de articulosCarrito por el data-id
    cadenaTabla = cadenaTabla.filter((nombre) => nombre !== nombreTarea);

    //limpiar la tabla
    limpiarTablaHTML();

    //recorrer el array y mostrar el HTML
    mostrarTablaHTML();
  }
}

function limpiarTablaHTML() {
  contenidoTabla.innerHTML = '';
}

function mostrarTablaHTML() {
  cadenaTabla.forEach((nombre, index) => {
    //Crear th
    let th = document.createElement('th');
    //th.scope = 'row';
    th.innerText = index + 1;

    //crear td tarea
    let tdTarea = document.createElement('td');
    tdTarea.innerText = nombre;

    //crear el boton eliminar Tarea
    let botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = `<i class="bi bi-trash3-fill borrar-tarea" data-id=${nombre}></i>`;

    //Crear tr
    let tr = document.createElement('tr');
    tr.appendChild(th);
    tr.appendChild(tdTarea);
    tr.appendChild(botonEliminar);

    //se agrega el tr al contenido de la tabla
    contenidoTabla.append(tr);
  });
}
