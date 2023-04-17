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

    //Crear td ID
    let td = document.createElement('td');
    td.innerText = cadenaTabla.length;

    //crear td tarea
    let tdTarea = document.createElement('td');
    tdTarea.innerText = tarea.target[0].value;

    //crear el boton eliminar Tarea
    let botonEliminar = document.createElement('button');
    botonEliminar.setAttribute('data-bs-toggle', 'modal');
    botonEliminar.setAttribute('data-bs-target', '#myModal');
    botonEliminar.innerHTML = `<i class="bi bi-trash3-fill borrar-tarea" data-id="${tarea.target[0].value
      .replace(/\s+/g, '')
      .trim()}"></i>`;

    //Crear tr
    let tr = document.createElement('tr');
    tr.appendChild(td);
    tr.appendChild(tdTarea);
    tr.appendChild(botonEliminar);

    //se agrega el tr al contenido de la tabla
    contenidoTabla.append(tr);

    //bandera para mostrar modal que se agregó correctamente la tarea
    agregarEliminarModal(true);

    //Reset el textarea
    tarea.target[0].value = '';
  } else {
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = 'Por favor, ingrese una cadena con la tarea';
    modalBody.className = 'bg-danger text-white p-2 m-1';
    tarea.target[0].value = '';
  }
}

function eliminarTarea(tarea) {
  //verifica si hay una tarea en la tabla de Tareas
  if (tarea.target.classList.contains('borrar-tarea')) {
    //tomo el id de la linea a borrar, en este caso es el elemento (nombre tarea) del array
    const nombreTarea = tarea.target.getAttribute('data-id');

    //Elimina del arrego de articulosCarrito por el data-id
    cadenaTabla = cadenaTabla.filter(
      (nombre) => nombre.replace(/\s+/g, '').trim() !== nombreTarea
    );

    //Mostrar alerta de tarea eliminada con una banderaModal en false
    agregarEliminarModal(false);

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
  if (cadenaTabla.length > 0) {
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
      botonEliminar.innerHTML = `<i class="bi bi-trash3-fill borrar-tarea" data-id=${nombre
        .replace(/\s+/g, '')
        .trim()}></i>`;
      botonEliminar.setAttribute('data-bs-toggle', 'modal');
      botonEliminar.setAttribute('data-bs-target', '#myModal');

      //Crear tr
      let tr = document.createElement('tr');
      tr.appendChild(th);
      tr.appendChild(tdTarea);
      tr.appendChild(botonEliminar);

      //se agrega el tr al contenido de la tabla
      contenidoTabla.append(tr);
    });
  } else {
    cabeceraTabla.classList.add('d-none');
  }
}

//Focus en el botón Close Modal
let myModal = document.getElementById('myModal');
let botonCloseModal = document.getElementById('botonCloseModal');
//cuando se abre el modal
myModal.addEventListener('shown.bs.modal', function () {
  botonCloseModal.focus();
});

//Poner focus en el text area cuando se cierra el Modal.
let tareaTextarea = document.getElementById('tareaTextarea');
document.getElementById('myModal').addEventListener('hidden.bs.modal', () => {
  setTimeout(() => {
    tareaTextarea.focus();
  }, 1);
});

//Modal agregar / eliminar
function agregarEliminarModal(ban) {
  if (ban) {
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = 'Se agregó correctamente la tarea';
    modalBody.className = 'bg-success text-white p-2 m-1';
  } else {
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = 'Se borró correctamente la tarea';
    modalBody.className = 'bg-info text-white p-2 m-1';
  }
}
