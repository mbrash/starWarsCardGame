// --------------------------------------------
//
//	highscore.js
//
//
// --------------------------------------------
// create array to hold highscores for leaderboard
// --------------------------------------------
var highscores = []



// --------------------------------------------
// check current score to see if it a highscore
// --------------------------------------------
var addScore = function (playerScore)  {
	// new score array
	var newHighscore = {name : playerName, score: playerScore}

	// get number of current highscores
	var len = highscores.length

	// check for scores, if none, add score automatically
	if (len === 0) {
		highscores.splice(i, 0, newHighscore)

		// if scores, compare for rank
	} else {
		
		// loop through all scores
		for (var i = 0; i < len; i++ ) {
			// if current score is greater than a score
			if (playerScore >= highscores[i].score) {
				// add the current score to the highscores array at current index ('i')
				highscores.splice(i, 0, newHighscore)
				// stop loop
				break;
			}
		}
	}
}



// --------------------------------------------
// Create html for leaderboard
// --------------------------------------------
var generateLeaderboard = function() {
	// create 5 scores
	var len = highscores.length
	if (len > 5) { len = 5 }

	// create obj to hold html
	var $leaderboardObj = '';

	// no highscores
	if (len == 0 ) {
		// insert empty user with 0 score
		len = 1
		highscores.push({name : "empty", score: "00000"})
	}


	// loop through scores and create html for each score
	for (var i = 0; i < len; i++) {
		$leaderboardObj += '<div class="row highscore">';
		$leaderboardObj += '<div class="col-sm-6">';
		$leaderboardObj += '<h4>'+highscores[i].name+'</h4></div>';
		$leaderboardObj += '<div class="col-sm-6">';
		$leaderboardObj += '<h5>'+highscores[i].score+'</h5></div>';
		$leaderboardObj += '</div>' // close row
	}

	// add html obj to #leaderboard
	$('#leaderboard').append($leaderboardObj)

}


// --------------------------------------------
// Remove leaderboard
// --------------------------------------------
var removeLeaderboard = function() {
	$('.highscore').remove();
}



