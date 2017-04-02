<script>
	$(document).ready(function(){
		$("#boton").click(function(){
			//var name = $("#name").val();
			//var password = $("#password").val();
			var datos = $("#form_datos").serialize();
			$.ajax({
					 type: "POST",
					 url: "/admin",
					 data: datos,
					 success: function(data) {
						 //Accion a realizar
					 }
			 });
		});
	});
</script>
