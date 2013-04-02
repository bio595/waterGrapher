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
	var currentTotal = 0;

	var plot = $.plot($("#chartContainer"), data, options);

	$("#addButton").click(function (e) {
		e.preventDefault();
		console.log("Curent time: " + currentTime + "\nCurrent total: " + currentTotal);
		//Get inputs
		var cumulativeTotal = $("#total").val();
		var time = $("#timeSelect").val();
		
		if(time <= currentTime){
			console.log("BAD TIME\nCurrent time: " + currentTime + "\nCurrent total: " + currentTotal);
			$("#badTime").show();
			return;

		}else if(cumulativeTotal < currentTotal){
			console.log("BAD TOTAL\nCurrent time: " + currentTime + "\nCurrent total: " + currentTotal);
			$("#badTotal").show();
			return;
		}

		currentTotal = cumulativeTotal;
		currentTime = time;

		var newCoordinate = [time, cumulativeTotal];
		data[1].push(newCoordinate);

		plot.setData(data);
		plot.draw();
	});

	$(".alert .close").click(function (e) {
		$(e.target).parent().hide();
	});

});




