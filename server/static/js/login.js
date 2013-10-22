$(function(){

	$("#signUpButton").click(function(e){
		e.preventDefault();
		
		$("#errorBox").hide();

		var username = $("#usernameInput").val();
		var password = $("#passwordInput").val();

		var body = { "username" : username, "password" : password }; 
		
		$.ajax({ 
			type: "POST",
			data: JSON.stringify(body),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			url: "/signup",
			statusCode: {
				409: function(){
					$("#errorBox").show().html("That username is already in use :(");
				},
				302: function(){
					alert("Wazup");
				}
			}
		});
	});

});