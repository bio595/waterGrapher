
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
 *	GET points for a specific date in the format yyyy-mm-dd
 */

exports.pointsForDate = function(req, res){
	console.log(req.params.year + "-" + req.params.month + "-" + req.params.day);
	res.send([[8, 0], [22,5]]);
};