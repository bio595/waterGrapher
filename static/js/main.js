$(function () {
	//Events for tabs
	$('a[data-toggle="tab"]').on('shown', function (e) {
	  
	  if(e.target.id === "todayTab"){
	  	loadToday();	
	  }else if(e.target.id === "historyTab"){
	  	loadHistory();
	  }
	  
	});


	//Show spinner while we fetch data
	$('#spinnerContainer').spin();

	//Get information for today
	var data = loadToday();

	//with our data plot some stuff
	$.plot($("#placeholder"), data, { xaxis: { min: 0, max: 24},
									  yaxis: { min: 0, max: 6}
									});

	function loadToday () {
		return [ {data: [ [0, 0], [24, 5] ], lines: { fill: true, fillColor: "rgba(255, 0, 0, 0.25)"}, color: "rgba(255, 0, 0, 1.0)" }
				 ];
	}

	function loadHistory () {
	
	}
});

