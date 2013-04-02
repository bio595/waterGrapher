$(function() {


	var data = [
		[[0,0], [1,1]], //Series 1
		[[0,0], [2,1]] //Series 2
	];

	var options = {
		series: {
			lines: {
				fill: true
			}
		},
		yaxis: {
			max: 5
		}
	};

	$.plot($("#chartContainer"), data, options);


	$("#addButton").click(function (e) {
		
	});

});




