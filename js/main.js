// -----------------------------------
// Query Params for API
var page = 1, // random page selection
	type = "people"; // need to verify props if changed


// -----------------------------------
// Fwd decl variables
var playerName = "";



// -----------------------------------
// Create leaderboard
generateLeaderboard();
$('#formNotification').hide()



// -----------------------------------
// listen for #playerName edit
$('#inputName').on('keyup', function(){
	// hide notification
	// $('#formNotification').hide()

	// set playerName 
	playerName = $(this).val()

	// check if it is more than 10
	if (playerName.length > 10) {
		playerName = playerName.substr(0, 10)
		$(this).val(playerName);
	}
		// trim white space
		playerName = playerName.trim();
		// to lower case
		playerName = playerName.toLowerCase();
})


// -----------------------------------
// listener for play button click
$('#play button').on('click', function(event){
	// prevent default
	event.preventDefault();

	console.log(playerName)
	console.log(playerName.length)

	if (playerName.length > 2) {
		// switch to game scene
		$('#menu').hide();
		$('#game').show();

		// remove leaderboard
		removeLeaderboard();

		// show loader
		$('#loading').show();

		// hide 
		$('#formNotification').hide()

		// start game
		getData(page, type);
		
	} else {
		// enter name
		console.log("enter name, field is blank")

		$('#formNotification').show()
		// show error name

	}

})


// listener for input submit
$('#form-name').submit(function(event) {
	// stop form from submitting
	event.preventDefault();
	// trigger play button click
	$( '#play button' ).trigger( "click" );

	// $('#formNotification').hide()
})




var updateLoader = function (){
	var loadingText = $('#loading h1').text()
	$('#loading h1').text(loadingText+'.');
}



























