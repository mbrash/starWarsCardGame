// --------------------------------------------
//
//	gameEngine.js
//
//
// --------------------------------------------
// Foward declared variables
// --------------------------------------------
var score = 250,
	moves = 0,
	fails = 0,
	gameTime = 0,
	myTimer,
	cardFlipped = false, // first card flipped
	col = 0, // columns for injecting html
	isTurn = false, // is touch enabled
	$activeCards =[], // cards selected
	cardDeck = []; // change to obj?



// ---------------------------------------------------
// Update moves
// ---------------------------------------------------
var gameUpdateMoves = function() {
	// update moves
	moves++;

	// update html #moves text
	$("#moves").text("Moves: " + moves);
}



// ----------------------------------------------------
// Update fails
// ---------------------------------------------------
var gameUpdateFails = function() {
	// update fails
	fails++

	// minus from score
	score -= 50;
	$('#score').text("Score: "+score);

	// update html #fails text 
	$('#fails').text("Fails: " + fails);
}



// -----------------------------------------------------
// Update Score
// ---------------------------------------------------
var gameUpdateScore = function (){
	score+= 1000

	// Update html #score element
	$('#score').text("Score: "+score);
}


// -----------------------------------------------------
// End of Game Loop
// ---------------------------------------------------
var gameEnd = function(){
	// stop game timer
	clearTimeout(myTimer);

	// reset loader
	$('#loading h1').text("loading.");

	// remove cards
	$('#playingCards').remove();

	// create victory html object
	$victoryObject =  '<div id="victoryScreen">';
	$victoryObject += '<h1>Congrats '+playerName+'<br>You Won!</h1>';
	$victoryObject += '<p>We hope you had fun and play again soon</p>'
	$victoryObject += '<button id="continue">continue</button>'	
	$victoryObject += '</div>'

	// add victory screen to body
	$('body').append($victoryObject);	
	
	// listener for victory screen click
	$('#victoryScreen button').on('click', function(event){
		console.log("click")
		// after game victory screen is displayed
		// store highscores and show
		addScore(score)
		generateLeaderboard();

		// return to menu
		$('#menu').show();
		$('#game').hide();

		// remove victory screen
		$('#victoryScreen').remove();

		//reset game
		score = 250;
		moves = 0;
		fails = 0;
		gameTime = 0;
		$("#timer").text("Time: "+gameTime);
		$('#score').text("Score: "+score);
		$("#moves").text("Moves: " + moves);
		$('#fails').text("Fails: " + fails);
	})
}



// -----------------------------------------------------
// Game Timer
// ---------------------------------------------------
var gameTimerUpdate = function() {
	myTimer = setTimeout(function() {
		gameTime++;
		gameTimerUpdate();
		// console.log(gameTime);
	}
	, 1000);

	// // Update html #time element
	$("#timer").text("Time: "+gameTime);
}


// --------------------------------------------------------
// Reorder array objects
// ---------------------------------------------------
var shuffleDeck = function(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;	
}


// -----------------------------------------------------
// Set Up Game Cards
// ---------------------------------------------------
var gameInit = function(results) {

	// hide loader
	$('#loading').hide();

	// Loop through each result and create a matching pair of cards
	for (var i = 0; i < results.length; i++) {
		// create original card
		cardDeck[i] = {
					   name : results[i].name, 
					   id : (i+1),
					   gender : results[i].gender,
					   birthYear : results[i].birthYear 
					 }

		// create matching card
		cardDeck[i+15] = {
							name : results[i].name, 
					   		id : (i+1),
					   		gender : results[i].gender,
					   		birthYear : results[i].birthYear
					   	}

	}

	// Shuffle Deck
	shuffleDeck(cardDeck);

	// start html
	var $htmlObject = '<div class="container" id="playingCards">';
		$htmlObject += '<div class="row cardRow">';
	
	// create cards
	for (var i = 0; i < 30; i++) {
		col++ // increment column
		// get first 3 letters of name for image path
		var path = cardDeck[i].name.toLowerCase().substr(0, 3)

		// add card back, with index as ID
		$htmlObject += '<div class="col-sm-2""><div class="cardBack" id='+i;
		$htmlObject += ' style="background: url(../img/'+path+'.png) center no-repeat;';
		$htmlObject += 'background-size: cover;">'
		$htmlObject += '<h1>'+cardDeck[i].name.toLowerCase()+'</h1>';
		$htmlObject += '</div>';

		// add card front
		$htmlObject += '<div class="cardFront" id='+i+'></div></div>';

		// close row
		if ((col % 6) == 0 ) {
			// close row
			$htmlObject += '</div>'
			// create new row
			if (i <= cardDeck.length) {
				$htmlObject += '<div class="row cardRow">';
			}
		}
	}
		// close container
		$htmlObject += '</div>'

		// append to #game
		$("#game").append($htmlObject);


		// listener for card click to start game engine
		$(".cardFront").on('click', function(event){
			if (isTurn) {
				// hide and show card top and bottom
				var cardTopObj = $(this).hide();
				var cardBotObj = $(this).siblings('.cardBack');

				// id of card clicked
				$activeCards[$activeCards.length] = $(this)

				// play card
				isTurn = false
				gameMain(cardDeck[event.target.id])
			}
		})

		// start game
		gameMain()

		// start game timer
		gameTimerUpdate()


		// gameEnd()
}



// -----------------------------------------------------
// Main Game Loop
// ---------------------------------------------------
var gameMain = function(card) {
	if (card) {
		// check if card already flipped
		if (cardFlipped) {
			// two cards have now been flipped
			gameUpdateMoves()

			// check for match
			if (card.id === cardFlipped.id) {
				// cards match, update score
				// console.log("Cards Match :)")
				gameUpdateScore();

				// reset card flipped
				cardFlipped = false;

				// check if end score reached
				if ((moves-fails) !== 15) {
					// continue game
					$activeCards = [];
					gameMain();

				} else {
					// score reached
					gameEnd();
				}

			} else {
				// cards do not match
				// console.log("Cards Do Not Match :( ")
				
				// updates fails
				gameUpdateFails();

				// reset card flipped
				cardFlipped = false

				// flip cards over w/ timer
				setTimeout(function(){
				 	for (var i = 0; i < $activeCards.length; i++) 
				 		{$activeCards[i].show();
				 	}
					// next turn
					gameMain();
				}, 1000); 	
			}

		} else {
			// only one card flipped
			cardFlipped = card;
			gameMain();
		}

	} else {
		// idle state
		// console.log("Pick a card!")
		isTurn = true

	}
}




// $htmlObject += '<p>'+cardDeck[i].gender+'</p>';
// $htmlObject += '<p>'+cardDeck[i].birthYear+'</p>';