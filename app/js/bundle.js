/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var locations = __webpack_require__(0);

$(document).ready(function(){
    $search = $("#location");
    $resultOut = $(".output_results");
    
    $(".prevBtn").click(function() {
    event.preventDefault();
    history.back(1);
    });
    
    var checkString = function(str)
    {
        if(str === "")
        {
           return false;
           
        }
        return true;
    }
            
    var search = function()
    {
        $search.keyup(function(e){
            doSearch();
        });
    }
    
    var doSearch = function()
    {
        var $searchString = $search.val();
        if(checkString($searchString))
        {
            var searchedData = locations.searchLocations($searchString);
            outputResults(searchedData);
        }
    }
    
    var outputResults = function(result)
    {
        $.each(result, function(index, results){
           var $resultLine = $("<a href='/pages/profile.html'><li class='result-line'><h3><span class='glyphicon glyphicon-tree-conifer detailIcon' aria-hidden='true'></span>"+results.name+" | "+results.area+"</h3><h3>"+results.rating+" <span class='glyphicon glyphicon-star detailIcon' aria-hidden='true'></span> | "+results.length+"</h3></li></a>").click(saveResult(results));
           $resultOut.append($resultLine);
        });
    }
    
    var saveResult = function (result)
    {
        return function(){
            localStorage.setItem('locations', JSON.stringify(result));
            displayLocation();
        }
    }
    
    var displayLocation = function()
    {
        if(localStorage.getItem('locations') != null)
        {
            var location = $.parseJSON(localStorage.getItem('locations'));
            
            var name = location.name;
            var area = location.area;
            var rating = location.rating;
            var length = location.length;
            var features = location.features;
            
            $(".park-name").append(name);
            $(".rating").append(rating);
            $(".length").append(length);
            var checklist = $("<a href='checklist.html' role='button'>Add "+name+" to Checklist</a>").click(addtoCheckList(location));
            $(".checklist").prepend(checklist);
            
            //Loop over the features
            $.each(features, function(i, feature){
                $para = $("<li class='feature_list'>"+feature+"</li>");
                $(".features").append($para);
            });
            
            initMap(location)
            
        }
    }
    
    var addtoCheckList = function(location)
    {
        return function()
        {
            var currList = JSON.parse(localStorage.getItem('checklist')) || [];
            var item = location;
            currList.push(item);
            localStorage.setItem('checklist', JSON.stringify(currList));
        }
    }
    
    var showChecklist = function()
    {
        if(localStorage.getItem('checklist') != null)
        {
            var checklist = $.parseJSON(localStorage.getItem('checklist'));
                        
           $.each(checklist, function(i, check){
               var items = $("<a href='profile.html'><li class='result-line'><h3><span class='glyphicon glyphicon-tree-conifer detailIcon' aria-hidden='true'></span>"+check.name+" | "+check.area+"</h3><h3>"+check.rating+" <span class='glyphicon glyphicon-star detailIcon' aria-hidden='true'></span> | "+check.length+"</h3></li></a>");
               
               var rem = $("<div class='remove-check'><button class='remove'> Remove "+check.name+" from Checklist</button></div>").click(removeFromChecklist(check.name));
               
                $(".checkResult").append(items);
                $(".checkResult").append(items, rem);
               
           });
        }
    }
    
    var removeFromChecklist = function(checklist) //remove the id from web storage
    {
    	return function(){
            var showChecklist = JSON.parse(localStorage.getItem('checklist')) || [];
    		var indexNum = showChecklist.indexOf(checklist.name);
            if(indexNum === -1) {
    			showChecklist.splice(indexNum, 1);
    		}
    		localStorage.setItem("checklist", JSON.stringify(showChecklist))
            location.reload()
    	}
    }
    
    var initMap = function(location)
    {
        var park = {lat: location.lat, lng: location.lng};
        console.log(park);
		navigator.geolocation.getCurrentPosition(function (position) { 
		    var latitude = position.coords.latitude;                    
		    var longitude = position.coords.longitude;                 
		    var user_location = new google.maps.LatLng(latitude, longitude);

		    var directionsService = new google.maps.DirectionsService();
		    var directionsDisplay = new google.maps.DirectionsRenderer();
		  
		    var map = new google.maps.Map($("#map")[0], {
	          zoom: 15,
	          center: user_location
	        });
	  
  
	     	directionsDisplay.setMap(map);
		    var request = {
		       origin:user_location, 
		       destination: park,
		       travelMode: google.maps.TravelMode.DRIVING,
		     };

		    directionsService.route(request, function (response, status) {
		       if (status == google.maps.DirectionsStatus.OK) {
		        	directionsDisplay.setDirections(response);
		    	}
		    });         
		 
		    directionsService.route(request, function(response, status) {
		    	if (status == google.maps.DirectionsStatus.OK) {
		        	directionsDisplay.setDirections(response);
		        }
		    });

		});
    }
    
    var init = function()
    {
        locations.getallLocations();
        $search.focus();
        search();
        displayLocation();
        showChecklist();
    }
    
    init();
    window.initMap = initMap;
});

/***/ })
/******/ ]);