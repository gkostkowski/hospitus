var app = angular.module('myApp', ['ui.bootstrap']);
var currentIndex;

app.controller('myCtrl', ['$scope', '$modal', '$location',
	function ($scope, $modal, $location) {


$scope.linkClicked = 	function (indx, view) {
	localStorage["currentIndex"] = indx;
	var curr = $location.absUrl().split('?')[0];
	var newPath = curr.substr(0, curr.length-22);
	newPath += 'show.html';
	location.assign(newPath);
}

	
	$scope.nauczyciele=[{"nazwisko":"Kowalski", "imie":"Janusz", "d_ur":"03.01.1981", "tyt_nau":"dr inż.", "katedra":"W8/K1", "specj":"A ", "ost_hosp":"09.10.2015", "imgName":"img/nau01.png", "l_zajec":"6"},{"nazwisko":"Nowak", "imie":"Piotr", "d_ur":"06.22.1976", "tyt_nau":"inż.", "katedra":"W8/K3", "specj":"A ", "ost_hosp":"11.11.2014", "imgName":"img/nau02.png", "l_zajec":"6"},{"nazwisko":"Rogowski", "imie":"Bogusław", "d_ur":"11.11.1987", "tyt_nau":"dr inż.", "katedra":"W8/K3", "specj":"A ", "ost_hosp":"15.03.2014", "imgName":"img/nau03.png", "l_zajec":"12"},{"nazwisko":"Brzozowski", "imie":"Radosław", "d_ur":"11.09.1966", "tyt_nau":"prof. dr hab. inż.", "katedra":"W8/K4", "specj":"A ", "ost_hosp":"22.09.2015", "imgName":"img/nau04.png", "l_zajec":"18"},{"nazwisko":"Burak", "imie":"Halina", "d_ur":"19.09.1985", "tyt_nau":"dr inż.", "katedra":"W8/K3", "specj":"A ", "ost_hosp":"12.02.2013", "imgName":"img/nau05.png", "l_zajec":"9"},{"nazwisko":"Kępa", "imie":"Miłosz", "d_ur":"15.12.1988", "tyt_nau":"inż.", "katedra":"W8/K2", "specj":"A ", "ost_hosp":"29.11.2014", "imgName":"img/nau06.png", "l_zajec":"8"},{"nazwisko":"Gąsowska", "imie":"Aneta", "d_ur":"11.04.1979", "tyt_nau":"Dr hab. inż.", "katedra":"W8/K7", "specj":"A ", "ost_hosp":"25.04.2015", "imgName":"img/nau07.png", "l_zajec":"14"},{"nazwisko":"Rybak", "imie":"Anna", "d_ur":"28.04.1981", "tyt_nau":"inż.", "katedra":"W8/K7", "specj":"A ", "ost_hosp":"26.06.2012", "imgName":"img/nau08.png", "l_zajec":"4"}];



  
}]);

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
};

function sliceArr (fromBegin, arr) {
	var output = [];
	for (var i=0; i< arr.length; i++) {
		output.push(fromBegin? arr[i].slice(1):arr[i].slice(0,-1));
	}
	return output;
}


app.filter("myFilter", function() {
	return function(input, searchText){
		
		var returnArray = [];
		if (searchText !== undefined && searchText !== '') {	
			var searchTextSplit = searchText.toLowerCase().split(/[ ,]+/);
			console.log(searchTextSplit);
			for(var i=0; i< input.length; i++){
				var count =0;
				for(var j=0; j< searchTextSplit.length; j++){
					var keywords = input[i].keywords.join('|').toLowerCase().split('|');
					var projName = input[i].projName.toLowerCase().split(/,+| +/);
					var words = keywords.concat(projName).filter( onlyUnique );
					var slicedWords = sliceArr(true, words).concat(sliceArr(false, words));
					if (slicedWords.indexOf(searchTextSplit[j].slice(1)) !== -1 ||
						slicedWords.indexOf(searchTextSplit[j].slice(0, -1)) !== -1) { /*sprawdza na ktorej pozycji znajduje sie slowo kluczowe -> zwraca -1 gdy go nie ma*/
						count++;
					}
				}
				if (count >= searchTextSplit.length){
					returnArray.push(input[i]);
				}
			}
			return returnArray;
			
		}
		
		return input;
	}
})

app.filter("getCurrent", function() {
	return function(input){
			var returnArray = [];
			var sel = localStorage["currentIndex"];
			for(var i=0; i< input.length; i++){				
				if (i == sel){
					returnArray.push(input[i]);
				}
			}
			return returnArray;
		}
	}
)
