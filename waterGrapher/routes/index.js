
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

/*
 * PUBLIC API FROM HERE
 *
 *
 *
 *	GET points for a specific day 
 */

exports.pointsForDay = function(req, res){
	console.log(req.params.day);
	res.send([[8, 0], [22,5]]);
};