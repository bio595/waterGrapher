$(function () {
	
	//restrict the input of the form to positive numbers
	$("#amountInput").numeric({negative: false});

	

	//Get information for today
	var data = loadToday();

	//with our data plot some stuff
	var plot = $.plot($("#placeholder"), data, { xaxis: { min: 8, max: 24, ticks:16},
									  yaxis: { min: 0, max: 5, ticks:10}
									});

	function loadToday () {
		//Show spinner while we fetch data
		$('#spinnerContainer').show();
		$('#spinnerContainer').spin();
		//Create the data array with the target series as
		var data = [{data: [ [8, 0], [24, 5] ], lines: { fill: true, fillColor: "rgba(255, 0, 0, 0.25)"}, color: "rgba(255, 0, 0, 1.0)" }];
		
		//Get the data from the server
		$.ajax({
			url : "/test",
			success: function (responseData, textStatus, jqXHR){
				
				//Add it to the plot
				var series = plot.getData();
				
				if(series.length == 1){//First insert
					series.push({data: [], points:{ show: true, fill: true, fillColor: "rgba(0, 50, 200, 1)"}, lines: { show: true, fill: true, fillColor: "rgba(0, 50, 200, 0.25)"}, color: "rgba(0, 0, 230,  1.0)" });
				}
				series[1].data = series[1].data.concat(JSON.parse(responseData));
				plot.setData(series);
				plot.draw();

				//Hide the spinner now that we're done
				$('#spinnerContainer').spin(false);
				$('#spinnerContainer').hide();
			}
		});
		
		return data;
	}

	function loadHistory () {
	
	}

	//Events for tabs
	$('a[data-toggle="tab"]').on('shown', function (e) {
	  
	  if(e.target.id === "todayTab"){
	  	loadToday();	
	  }else if(e.target.id === "historyTab"){
	  	loadHistory();
	  }
	  
	});

	//Event handler for add button
	$('#addNewButton').on('click', function (e) {
		e.preventDefault();
		
		//Get the input number
		var amount = $("#amountInput").val();
		//Get the time
		var time = $("#timeSelector").val();

		var series = plot.getData();
		
		if(series.length == 1){//First insert
			series.push({data: [], points:{ show: true, fill: true, fillColor: "rgba(0, 50, 200, 1)"}, lines: { show: true, fill: true, fillColor: "rgba(0, 50, 200, 0.25)"}, color: "rgba(0, 0, 230,  1.0)" });
		}

		series[1].data.push([time, amount]);
		plot.setData(series);
		plot.draw();
	});

});
