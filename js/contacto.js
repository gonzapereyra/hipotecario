const persona = {
    id: '0',
    nombres: '',
    apellido: '',
    telefono: '',
    correo: '',
    ciudad: '',
    pais: ''
}




function guardarDatos(e) {
    persona.nombres = document.forms["contacto"]["pnombre"].value;
    persona.apellido = document.forms["contacto"]["papellido"].value;
    persona.correo = document.forms["contacto"]["pcorreo"].value;
    persona.telefono = document.forms["contacto"]["ptelefono"].value;
    persona.ciudad = document.forms["contacto"]["pciudad"].value;
    persona.pais = document.forms["contacto"]["ppais"].value;
    if (persona.id <= 0) {
        persona.id = new Date().valueOf();
    }
    let personaJson = JSON.stringify(persona);
     localStorage.setItem(persona.id, personaJson);

    e.preventDefault();
    alert("Datos guardados con exito");
    listarContactos();
    resetfrom();
}
// reiniciar formulario
function resetfrom() {
    document.forms["contacto"].reset();
    persona.id = 0;
}

function listarContactos() {
    let dinamicTabla = "";
    dinamicTabla += "<table>";
    dinamicTabla += "<tr>";
    dinamicTabla += "<th>Id</th>";
    dinamicTabla += "<th>Nombre</th>";
    dinamicTabla += "<th>Apellido</th>";
    dinamicTabla += "<th>Telefono</th>";
    dinamicTabla += "<th>Correo electronico</th>";
    dinamicTabla += "<th>Acción</th>";
    dinamicTabla += "</tr>";
    // filas con la informacion
    let personasGuardadas = [];
    personasGuardadas = allStorge();
    for (let i = 0; i < personasGuardadas.length; i++) {
        dinamicTabla += "<tr>";
        let personaObjeto = JSON.parse(personasGuardadas[i]);
        dinamicTabla += "<td>";
        dinamicTabla += personaObjeto.id;
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += personaObjeto.nombres;
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += personaObjeto.apellido;
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += personaObjeto.telefono;
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += personaObjeto.correo;
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += '<a href="./detalles.html?id=' + personaObjeto.id + '">Ver</a>';
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += '<a href="javascript:editarContacto(' + personaObjeto.id + ');">Editar</a>';
        dinamicTabla += "</td>";
        dinamicTabla += "<td>";
        dinamicTabla += '<a href="javascript:eliminarContacto(' + personaObjeto.id + ');">Eliminar</a>';
        dinamicTabla += "</td>";
        dinamicTabla += "</tr>";
        
    }

    dinamicTabla += "</table>";
    document.getElementById("tablacontacto").innerHTML = dinamicTabla;
}

function allStorge() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

function verDetalles() {
    let contactoid = obtenerParametroUrl();
    let contacto = localStorage.getItem(contactoid);
    if (contacto.length > 0) {
        let personaObjeto = JSON.parse(contacto);
        document.getElementById("nombre").innerText = personaObjeto.nombres;
        document.getElementById("apellido").innerText = personaObjeto.apellido;
        document.getElementById("telefono").innerText = personaObjeto.telefono;
        document.getElementById("correo").innerText = personaObjeto.correo;
        document.getElementById("ciudad").innerText = personaObjeto.ciudad;
        document.getElementById("pais").innerText = personaObjeto.pais;

    }
}
function editarContacto(id) {
    let contacto = localStorage.getItem(id);
    if (contacto.length > 0) {
        let personaObjeto = JSON.parse(contacto);
        document.getElementById("pnombre").value = personaObjeto.nombres;
        document.getElementById("papellido").value = personaObjeto.apellido;
        document.getElementById("ptelefono").value = personaObjeto.telefono;
        document.getElementById("pcorreo").value = personaObjeto.correo;
        document.getElementById("pciudad").value = personaObjeto.ciudad;
        document.getElementById("ppais").value = personaObjeto.pais;
        persona.id = id;
    }
    listarContactos();
}

function eliminarContacto(id) {
    let contacto = localStorage.getItem(id);
    if (contacto.length > 0) {
        localStorage.removeItem(id);
        alert("Contacto eliminado con exito");
    }
    listarContactos();
}

function obtenerParametroUrl() {
    let url = window.location.href;
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let parameterID = 0;

    for (let pair of queryString.entries()) {
        console.log("Key is:" + pair[0]);
        console.log("Value is:" + pair[1]);
        parameterID = Number(pair[1]);
    }
    return parameterID;
}