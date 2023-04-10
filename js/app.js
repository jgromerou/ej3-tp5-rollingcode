let formTextarea = document.getElementById('formTextarea');
let cabeceraTabla = document.getElementById('cabeceraTabla');
let contenidoTabla = document.getElementById('contenidoTabla');
let cadenaTabla = [];

//activadores de eventos
formTextarea.addEventListener('submit', agregarTarea);

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

    //crear td boton eliminar
    let tdBotonEliminar = document.createElement('td');
    tdBotonEliminar.innerHTML = `<i class="bi bi-trash3-fill"></i>`;

    //Crear tr
    let tr = document.createElement('tr');
    tr.appendChild(th);
    tr.appendChild(tdTarea);
    tr.appendChild(tdBotonEliminar);

    //se agrega el tr al contenido de la tabla
    contenidoTabla.append(tr);

    //Reset el textarea
    tarea.target[0].value = '';
  } else {
    alert('Por favor, ingrese una cadena con la tarea');
    tarea.target[0].value = '';
  }
}
