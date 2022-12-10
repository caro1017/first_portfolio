const contacto_form = document.getElementById("contacto-form");
const inputs = document.querySelectorAll("#contacto-form input")

// Validaciones de expresiones
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	asunto:  /^.{4,12}$/, // 4 a 12 digitos.
	mensaje:  /^.{4,20}$/, // 4 a 20 digitos.
}


const campos = {
	nombre : false,
	email : false,
	asunto : false,
	mensaje : false
}

// validacion de campos pendientes por llenar 

const validarFormulario = (e) =>{
	switch (e.target.name){
		case "nombre":
			validarCampo (expresiones.nombre, e.target, "nombre");	
		break;
		case "email":
			validarCampo (expresiones.email, e.target, "email");
		break;
		case "asunto":
			validarCampo (expresiones.asunto, e.target, "asunto");	
		break;
		case "mensaje":
			validarCampo (expresiones.mensaje, e.target, "mensaje");	
		break;
	}

}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.add('fa-check');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.remove('fa-xmark');
		document.querySelector(`#grupo_${campo} .form_error`).classList.remove('form_error-activo');
		campos[campo] = true;
		
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.add('fa-xmark');
		document.querySelector(`#grupo_${campo} .formulario_imput_grupo i`).classList.remove('fa-check');
		document.querySelector(`#grupo_${campo} .form_error`).classList.add('form_error-activo');
		campos[campo] = false;
		
	}
}


inputs.forEach((input)=>{
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);

});

contacto_form.addEventListener('submit', (e) =>{
	e.preventDefault();

	if (campos.nombre && campos.email && campos.asunto && campos.mensaje){
		document.getElementById("formulario_mensaje-exito").classList.add("formulario_mensaje-exito-activo");
		setTimeout(()=>{
			document.getElementById("formulario_mensaje-exito").classList.remove("formulario_mensaje-exito-activo");
		},3000);

		document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario_grupo-correcto');
		});
	} else {
		document.getElementById("formulario_mensaje").classList.add("formulario_mensaje-activo");
		setTimeout(()=>{
			document.getElementById("formulario_mensaje").classList.remove("formulario_mensaje-activo");
		},3000)
	}
});

function capturar() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;
    console.log("Nombre: "+ nombre);
    console.log("Email: "+ email);
    console.log("Asunto: "+ asunto);
    console.log("Mensaje: "+ mensaje);
};


function limpiarForm() {
	alert("Limpiar Formulario");
	document.getElementById("contacto-form").reset();
};

window.onload = function() {

	const botonLimpiar = document.getElementById("limpiar");
	botonLimpiar.onclick = limpiarForm;

	const botonEnviar = document.contacto_form.enviar_btn;
	botonEnviar.onclick = capturar;

};
