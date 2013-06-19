$(function(){
	$("#logInButton").click(function(e){
		e.preventDefault();
		
	});

	$("#signUpButton").click(function(e){
		e.preventDefault();
		
		$("#signupError").hide();
		$("#loginError").hide();

		var username = $("#usernameInput").val();
		var password = $("#passwordInput").val();

		var body = { "username" : username, "password" : password }; 
		

		$.ajax({ 
			type: "POST",
			data: JSON.stringify(body),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			url: '/signup', 
			success: function (responseData, textStatus, jqXHR){
				console.log(responseData);
			},
			error: function(responseData, textStatus, jqXHR){
				if(responseData.status == 409){
					$("#signupError").show();
				}
			}
		});

	});
});