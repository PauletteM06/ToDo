//Emelentos del DOM
const pendientes = document.querySelector('.pendientes');
const form = document.querySelector('.form');
const inputForm = document.getElementById('tarea');
const errorInput = document.querySelector('.error');
const listaTareas = document.querySelector('.lista-tareas');

//BTNS Filtros
const btnTodas = document.querySelector('.btn_tareas_todas');
const btnPendientes = document.querySelector('.btn_tareas_pendientes');
const btnCompletadas = document.querySelector('.btn_tareas_completadas');


let tareas = [];
let idTareas = 1;
let contadorPendientes = 0;


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
   
})

listaTareas.addEventListener('click', (event) => {
    let boton = event.target.closest('.btn_delete');

    if (boton !== null){
        let idBtn = parseInt(boton.dataset.id);
        tareas = tareas.filter(tarea => tarea.id !== idBtn);
        
        renderizarTareas();
    }
})

listaTareas.addEventListener('change', (event) => {
    let input = event.target;
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


function renderizarTareas() {

    listaTareas.innerHTML = '';

    //Recorre cada tarea creada y por cada una crea un contenedor con el texto de la tarea
    let newTareas = tareas.map( tarea => {
        let divContenedor = document.createElement('div');
        divContenedor.classList.add('tarea');
        let checkbox = document.createElement('input');
        checkbox.checked = tarea.completada;
        checkbox.type = 'checkbox';
        checkbox.setAttribute("data-check", tarea.id);
        let textTarea = document.createElement('p');
        textTarea.textContent = tarea.texto;
        let btnDelete = document.createElement('button');
        btnDelete.classList.add('btn_delete');
        btnDelete.setAttribute("data-id", tarea.id);
        btnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>';
    
        tarea.completada && textTarea.classList.add('completada');
            
        divContenedor.appendChild(checkbox);
        divContenedor.appendChild(textTarea);
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

