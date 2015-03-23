// --------------------------------------------
//
//
//	server.js
//
//
//
// --------------------------------------------
// Ajax request for swapi.co api
// --------------------------------------------
var getData = function (page, type) {
	page = Math.floor((Math.random() * page) + 1)

	// ajax request
	var req = new XMLHttpRequest();
	req.onload = function(){
			// we got results, show loading progress
			updateLoader()

			// parse data		
			var data = JSON.parse(this.responseText);


			// create our own table and transfer properties we want
			var results = [];

			// create array to hold data
			for (var i = 0; i < data.results.length; i++){
				results[i] = [];
				results[i].name = data.results[i].name;
				results[i].birthYear = data.results[i].birth_year;
				results[i].gender = data.results[i].gender;
			}
			
			// get 5 more star wars characters
			var req = new XMLHttpRequest();
			req.onload = function() {
				// got second results, show loading progress

				// parse data
				var data = JSON.parse(this.responseText);
				// console.log(data)

				// add data to results array
				for (var i = 0; i < 5; i++){
					results[results.length] = [];
					results[results.length-1].name = data.results[i].name;
					results[results.length-1].birthYear = data.results[i].birth_year;
					results[results.length-1].gender = data.results[i].gender;
				}

			// start game
			gameInit(results);		

			}

			req.open("GET", "http://swapi.co/api/"+type+"/?page="+2, true);
			req.send();

			
		}

	req.open("GET", "http://swapi.co/api/"+type+"/?page="+page, true);
	req.send();
}