(function(exports){

    exports.lerp = function (start, end, options){
		if (start === undefined) {
			start = 0;
		}
		var result = [];

		if(options.type === 'increment'){
			for(i = start; i <= end; i += options.increment){
				result.push(i);
			}
		}else if(options.type === 'amount'){
			for(i = start; i <= end; i += (end - start) / (options.amount - 1)) {
				result.push(i);
			}
		}
		return result;
	}

	exports.array_compare = function (array1, array2) {
		if (array1.length !== array2.length){
			return false;
		}

		for (var i = array1.length - 1; i >= 0; i--) {
			if (array1[i] !== array2[i]){
				return false;
			}
		}
		return true;
	}

})(typeof exports === 'undefined'? this['utils']={}: exports);

