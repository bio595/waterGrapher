$(function () {
	//Events for tabs
	$('a[data-toggle="tab"]').on('shown', function (e) {
	  
	  if(e.target.id === "todayTab"){
	  	//If today isnt already loaded, load it.
	  	loadToday();	
	  }else if(e.target.id === "historyTab"){
	  	loadHistory();
	  }
	  
	});


	loadToday();

	function loadToday () {
	}

	function loadHistory () {
	
	}
});

