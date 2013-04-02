var utils = require('../public/javascripts/utils');

module.exports.lerpTests = {
	testLerpBadOptions : function(test){
		test.expect(1);
		test.equals(utils.lerp(1,2,{}).length, 0);
		test.done();
	},

	testLerpUnsupportedType : function(test){
		test.expect(1);
		test.equals(utils.lerp(1,2, {type:'lol'}).length,0);
		test.done();
	},

	testLerpAmountProducesAmount : function (test) {
		test.expect(1);
		test.equals(utils.lerp(1,2, {type:'amount', amount:5}).length, 5);
		test.done();
	},

	testLerpAmountWithoutAmount : function(test){
		test.expect(1);
		test.throws(function(){
			utils.lerp(1,2, {type: 'amount'});
		}, TypeError);
		test.done();
	},

	testLerpIncrementalWithoutIncrement : function(test) {
		test.expect(1);
		test.throws(function(){
			utils.lerp(1,2, {type: 'increment'});
		}, TypeError);
		test.done();
	},

	testLerpIncremental : function (test) {
		test.expect(1);
		expected = [1, 1.25, 1.5, 1.75, 2];
		actual = utils.lerp(1, 2, {type:'increment', increment: 0.25}); 
		test.ok(utils.array_compare(expected, actual));
		test.done();
	}
};

module.exports.array_compareTests = {
	testArrayCompareEmptyArrays : function(test) {
		test.expect(1);
		test.ok(utils.array_compare([],[]));
		test.done();
	}
};