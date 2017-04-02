<script>
	$(document).ready(function(){
		$("#save").click(function(){
			//var name = $("#name").val();
			//var password = $("#password").val();
			var datos = $("#form_edit").serialize();
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
