    var storeLocations;
    $resultOut = $(".output_results");


	getallLocations = function(){
		$.getJSON("../json/locations.json", function(loc){
            storeLocations = loc;
	    });
	}

	searchLocations = function(search_term){
        $resultOut.empty();
		var resultArray = [];
		$.grep(storeLocations, function(r, i){
			if(r.area.toLowerCase().indexOf(search_term.toLowerCase()) !== -1){
				resultArray.push(r);
			}
		});
		return resultArray;
	}



module.exports = {
	getallLocations: getallLocations,
	searchLocations: searchLocations
}
