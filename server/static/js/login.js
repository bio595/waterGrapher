$(function(){

	$("#signUpButton").click(function(e){
		e.preventDefault();
		
		doRequest('/signup', 
			function (responseData, textStatus, jqXHR){
				
			},
			function(responseData, textStatus, jqXHR){
				if(responseData.status == 409){
					$("#signupError").show();
				}

			});
	});

	function doRequest(url, successFun, errorFun, completeFun){
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
			url: url,
			success: successFun,
			error: errorFun,
			complete: completeFun
		});
	}
});