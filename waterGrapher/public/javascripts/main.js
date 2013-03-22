$(function() {

	var labels = lerp(8, 24, {type: 'increment', increment: 1});
	var expectedAmounts = lerp(0, 5, {type: 'amount', amount: labels.length})
	
	var data = {
		labels: labels,
		datasets: [
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : []
			},
			{
				fillColor : "rgba(220,120,120,0.5)",
				strokeColor : "rgba(220,120,120,1)",
				pointColor : "rgba(220,120,120,1)",
				pointStrokeColor : "#fff",
				data : expectedAmounts	
			}
		]
	}

	var ctx = $("#chart").get(0).getContext("2d");

	var chartConfig = {bezierCurve: false, pointDot: true};

	var chart = new Chart(ctx).Line(data, chartConfig);

	$("#addButton").click(function (e) {
		e.preventDefault();

		var yPos = $("#total").val();
		var xPos = $("#timeSelect").val() - 8;

		var currentPos = data.datasets[0].data.length;

		if(xPos < currentPos){
			alert("Awesome error handling");
			return;
		}else if(xPos === currentPos){
			data.datasets[0].data.push(yPos);
		}else{
			//Pretend that we drank at a linear rate
			
			var points = lerp(data.datasets[0].data[currentPos-1], yPos, {type:'amount', amount: xPos - currentPos + 2});
			console.log(points);
		}
		chart = new Chart(ctx).Line(data, chartConfig);

	});

});


function lerp(start, end, options){
	var result = [];
	if(options.type === 'increment'){
		for(i = start; i <= end; i += options.increment){
			result.push(i);
		}
	}else if(options.type === 'amount'){
		for(i = start; i <= end; i += (end - start) / (options.amount - 1)) {
			console.log(i);
			result.push(i);
		}
	}
	return result;
}

