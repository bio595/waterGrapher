$(function() {

	var data = [
		[[8,0], [22,5]] //Target Line
	];

	var options = {
		series: {
			lines: {
				fill: true
			}
		},
		yaxis: {
			max: 5
		},
		xaxis: {
			min: 8
		}
	};

	var plot = $.plot($("#chartContainer"), data, options);


	$("#addButton").click(function (e) {
		
	});

});




