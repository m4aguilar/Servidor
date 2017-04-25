<script>
	$(document).ready(function(){
		$("#save").click(function(){
			var datos = $("#form-edit").serialize();
			$.ajax({
					 type: "POST",
					 url: "/editQuestion",
					 data: datos,
					 success: function(data) {
						 //Accion a realizar
					 }
			 });
		});
	});
</script>
