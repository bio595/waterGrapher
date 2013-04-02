$(function() {

	var data = [
		[[8,0], [22,5]], 
		[] //Target Line
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

	var currentTime = 7;

	var plot = $.plot($("#chartContainer"), data, options);


	$("#addButton").click(function (e) {
		e.preventDefault();

		//Get inputs
		var cumulativeTotal = $("#total").val();
		var time = $("#timeSelect").val();
		console.log(time);
		if(time <= currentTime){
			alert("Show error alert");
			return;
		}

		var newCoordinate = [time, cumulativeTotal];
		data[1].push(newCoordinate);

		console.log(data);

		plot.setData(data);
		plot.draw();
	});

});




