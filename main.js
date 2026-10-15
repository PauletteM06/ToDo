//Emelentos del DOM
const pendientes = document.querySelector('.pendientes');
const form = document.querySelector('.form');
const inputForm = document.getElementById('tarea');
const btnSubmit = document.querySelector('.btn_submit');
const errorInput = document.querySelector('.error');
const listaTareas = document.querySelector('.lista-tareas');

//BTNS Filtros
const btnContenedor = document.querySelector('.btn_tareas');

const btnTodas = document.querySelector('.btn_tareas_todas');
const btnPendientes = document.querySelector('.btn_tareas_pendientes');
const btnCompletadas = document.querySelector('.btn_tareas_completadas');


let tareas = [];
let idTareas = 1;
let contadorPendientes = 0;
let idEdicion = null;



//Evento submit
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    //Validación
    let tarea = inputForm.value.trim();
    if(tarea === ''){
        errorInput.textContent = 'Debe ingresar una tarea';

        setTimeout(() =>{
            errorInput.textContent = '';
        }, 3000);

        return;
    }

    if(idEdicion === null){
        //Crear nueva tarea
        let nuevaTarea = {
            id: idTareas,
            texto: tarea,
            completada: false
        }

        idTareas++;

        //Agregar esa tarea al array
        tareas.push(nuevaTarea);
        renderizarTareas();

        form.reset();
   

    }else {
        let id = parseInt(idEdicion);
        const tareaEditar = tareas.find(tarea => tarea.id === id);
        tareaEditar.texto = tarea;
        renderizarTareas();

        form.reset();
        idEdicion = null;
        btnSubmit.textContent = '+ Agregar';
    }
})


listaTareas.addEventListener('click', (event) => {
    let botonDelete = event.target.closest('.btn_delete');
    let botonEdit = event.target.closest('.btn_edit');
    let idEdit = parseInt(botonEdit.dataset.id);

    if (botonDelete !== null){
        let idBtn = parseInt(botonDelete.dataset.id);
        tareas = tareas.filter(tarea => tarea.id !== idBtn);
        
        renderizarTareas();
    }

    if(botonEdit !== null){
        idEdicion = idEdit;
        const tareaEditar = tareas.find(tarea => tarea.id === idEdit);
        inputForm.value = tareaEditar.texto;
        btnSubmit.textContent = 'Actualizar';
    }

})

listaTareas.addEventListener('change', (event) => {
    const input = event.target;
    let idInput = parseInt(input.dataset.check);
    const inputCheck = event.target.checked;

    tareas.forEach(tarea => {
        if(tarea.id === idInput){
            tarea.completada = inputCheck;
            console.log(tarea);
        
        }
    })
    renderizarTareas(); 
    
})
let filtroActivo = 'todas';

btnContenedor.addEventListener('click', (event) => {
    const btn = event.target;
    const btnName = btn.dataset.name;

    if (!['todas', 'pendientes', 'completadas'].includes(btnName)) return;

    filtroActivo = btnName;
    renderizarTareas();
});


function renderizarTareas() {

    listaTareas.innerHTML = '';

    let mostrarTareas = tareas;

    if (filtroActivo === 'pendientes') {
        mostrarTareas = tareas.filter(tarea => !tarea.completada);
    } else if (filtroActivo === 'completadas') {
        mostrarTareas = tareas.filter(tarea => tarea.completada);
    }

    //Recorre cada tarea creada y por cada una crea un contenedor con el texto de la tarea
    let newTareas = mostrarTareas.map( tarea => {
        let divContenedor = document.createElement('div');
        divContenedor.classList.add('tarea');

        let checkbox = document.createElement('input');
        checkbox.checked = tarea.completada;
        checkbox.type = 'checkbox';
        checkbox.setAttribute("data-check", tarea.id);

        let textTarea = document.createElement('p');
        textTarea.textContent = tarea.texto;

        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btn_edit')
        btnEdit.setAttribute('data-id', tarea.id);
        btnEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>';

        let btnDelete = document.createElement('button');
        btnDelete.classList.add('btn_delete');
        btnDelete.setAttribute("data-id", tarea.id);
        btnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>';
    
        tarea.completada && textTarea.classList.add('completada');
            
        divContenedor.appendChild(checkbox);
        divContenedor.appendChild(textTarea);
        divContenedor.appendChild(btnEdit);
        divContenedor.appendChild(btnDelete);
        return divContenedor;
    })

    contadorPendientes = tareas.filter(tarea => !tarea.completada).length;
    pendientes.textContent = contadorPendientes === 1? ' 1 pendiente': `${contadorPendientes} pendientes`;


    //Agregar las tareas al DOM
    newTareas.forEach(div => {
        listaTareas.appendChild(div);
    })
}

