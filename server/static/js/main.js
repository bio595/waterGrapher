$(function () {
	
	//restrict the input of the form to positive numbers
	$("#amountInput").numeric({negative: false});
	$("#weightInput").numeric({negative: false});

	//Get information for today
	var data = loadToday();
	var current = 0;
	var yMax = roundUp25($("#weightInput").val()) / 25; 
	//with our data plot some stuff
	var plot = $.plot($("#placeholder"), data, { xaxis: { min: 8, max: 24, ticks:16},
									  yaxis: { min: 0, max: yMax, ticks:10}
									});

	function loadToday () {
		//Show spinner while we fetch data
		$('#spinnerContainer').show();
		$('#spinnerContainer').spin();
		var yMax = roundUp25($("#weightInput").val()) / 25; 
		//Create the data array with the target series as
		var data = [{data: [ [8, 0], [24, yMax] ], lines: { fill: true, fillColor: "rgba(255, 0, 0, 0.25)"}, color: "rgba(255, 0, 0, 1.0)" }];
		
		//Get the data from the server
		$.ajax({
			url : "/today",
			success: function (responseData, textStatus, jqXHR){
				
				jsonData = JSON.parse(responseData);

				//If there is data
				if(jsonData.consumption.length != 0){				

					//Add it to the plot
					var series = plot.getData();
					
					if(series.length == 1){//First insert
						series.push({data: [], points:{ show: true, fill: true, fillColor: "rgba(0, 50, 200, 1)"}, lines: { show: true, fill: true, fillColor: "rgba(0, 50, 200, 0.25)"}, color: "rgba(0, 0, 230,  1.0)" });
					}
					series[1].data = series[1].data.concat(JSON.parse(responseData));
					plot.setData(series);
					plot.draw();
				}

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
		}else if(e.target.id === "signOutTab"){
			var req = $.post('/logout');
			req.always(function (argument) {
				window.location = "/login";
			});
			
		}
	});

	//Event handler for weight input
	$("#weightInput").on('keyup', function (e){
		//Retrieve the value
		var val = $("#weightInput").val();
		if(val === "") return;
		if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 8)) return;
		
		var targetLitres = roundUp25(val) / 25; 
		
		//Update the flot axes and target series
		var options = plot.getOptions();
		
		var data = plot.getData();
		data[0].data[1][1] = targetLitres;

		plot.setData(data);
		
		options.yaxes[0].max = targetLitres;
		
		plot = $.plot($("#placeholder"), data, options);
	});

	//Event handler for add button
	$('#addNewButton').on('click', function (e) {
		e.preventDefault();

		//Hide alert
		$("#errorAlert").hide();
		//Get the input number
		var amount = $("#amountInput").val();
		

		//Get the time and sleccted index
		var time = $("#timeSelector").val();
		var selectedIndex = $("#timeSelector")[0].selectedIndex;

		var series = plot.getData();
		
		//If this isnt the first addition
		if(series[1].data.length !== 0){
		
			//Make sure we arent losing total water
			var prev = series[1].data[series[1].data.length - 1][1];
			if(prev > amount){
				//show alert
				$("#errorAlert").show();
				return;
			}
		}else{ //Nothing has been added yet
			if (selectedIndex !== 0){
				//add a point at 8,0
				series[1].data.push([8, 0]);
			}
		}
		//Remove the possibility of drinking water back in time
		$("#timeSelector option").each(function(index, val){
			
			if(index <= selectedIndex){
				if($(this).val() == 24){
					$('#addNewButton').attr('disabled', 'disabled');
				}
				$(this).remove();
			}
			
		});


		//FInally add the new point and redraw
		series[1].data.push([time, amount]);
		plot.setData(series);
		plot.draw();
	});

	function roundUp25(weight){
		weight = parseInt(weight);
		//find the difference that we need to round up by
		var diff = weight % 25;
		if(diff === 0){
			return weight;
		}else{
			return weight + (25 - diff);
		}
	}

});

