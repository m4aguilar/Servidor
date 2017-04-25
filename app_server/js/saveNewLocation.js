var aux = true;
$(document).ready(function(){
	$("#save").click(function(){

		validarFormulario();

		var datos = $("#form-edit").serialize();

		//Enviando datos al servidor por ajax/post
		$.ajax({
				 type: "POST",
				 url: "/createLocation",
				 data: datos,
				 success: function(data) {
					 //Accion a realizar
				 }
		 });
	});
});

function validarFormulario(){
	alert("Dentro de validar Formulario");
	jQuery.validator.messages.required = 'Esta campo es obligatorio.';
	$("#save").click(function(){
     var validado = $("#form-edit").valid();
     if(validado){
        alert('El formulario es correcto.');
     }

 }
