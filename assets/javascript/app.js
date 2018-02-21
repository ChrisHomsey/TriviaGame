$( document ).ready(function() {
	
	
	// Create an array of objects that will hold the question, choice, and answer data of each trivia question.
	var triviaQuestions = [
		{
			question: "Of Pink Floyd's four most popular albums, which one came out first ?",
			choices: ["Animals", "Dark Side of the Moon", "The Wall", "Wish You Were Here"],
			answer: 1 },
		{
			question: "When Jimi Hendrix moved to England, which guitarist took him in and watched as he became famous within a week ?",
			choices: ["Eric Clapton", "Paul McCartney", "Jimmy Page", "Peter Frampton"],
			answer: 0 },
		{
			question: "Which band's guitarist was known for the windmill style stroking of the guitar ?",
			choices: ["Creedence Clearwater Revival", "The Doors", "Led Zeppelin", "The Who"],
			answer: 3 },
		{
			question: "Which band's singer was \"... Born a ramblin\' man\" ?",
			choices: ["Lynyrd Skynrd", "The Allman Brothers", "The Doobie Brothers", "Bob Seger"],
			answer: 1 },
		{
			question: "Which was not a member of Led Zeppelin ?",
			choices: ["John Bonham", "Jethro Tull", "Robert Plant", "Jimmy Page"],
			answer: 1 },
		{
			question: "Which band has the single most sold album of all time ?",
			choices: ["The Eagles", "Pink Floyd", "Michael Jackson", "The Beatles"],
			answer: 0 },
		{
			question: "Which Beatle song was never a number one hit ?",
			choices: ["Ticket to Ride", "Hello, Goodbye", "I am the Walrus", "Lady Madonna"],
			answer: 2 },
		{
			question: "Which guitarist played his guitar with a violin bow on stage ?",
			choices: ["Jimmy Hendrix", "Chuck Schuldiner", "Jimmy Page", "Dave Grohl"],
			answer: 2 },
		{
			question: "Who performed the song \"Don't Fear the Reaper\" ?",
			choices: ["The Eagles", "Mahavishnu Orchestra", "King Crimson", "Blue Oyster Cult"],
			answer: 3 },
		{
			question: "Which band hits include \"The Big Money\", \"Red Sector A\", \"Show Dont Tell\" and \"2112 Overture\" ?",
			choices: ["Kiss", "Pink Floyd", "Rush", "AC/DC"],
			answer: 2 },
	];
	
	// Initialize game variables
	var score;
	var incorrect;
	var unanswered;
	var choiceSelected;
	var clockRunning = false;
	var triviaInterval;
	var currentQuestion;


	// triviaTimer is an object with methods that control the game timer.
	var triviaTimer = {

		remaining: 20,
		
		// Method to start the clock- the counter is restarted each time the question 
		start: function(q, a){
			
			triviaTimer.remaining = 20;
			$('#time-remaining').text(triviaTimer.remaining);
			currentQuestion = q;
			currentAnswer = a;
			if (clockRunning === false) {     
				triviaInterval = setInterval(triviaTimer.count, 1000 );
				clockRunning = true;
			}
		},
		
		// Every second, count() is run. Time remaining is decreased by one
		count: function(){
			triviaTimer.remaining--;
			
			// The displayed timer is updated. 
			$('#time-remaining').text(triviaTimer.remaining);
			
			// If time runs out, checkAnswer() is run with a null value for the user's answer.
			if (triviaTimer.remaining == 0) {
				checkAnswer(null, currentAnswer, currentQuestion);
			}
		},

		stop: function() {
			clearInterval(triviaInterval);
		}

	}
	
	// Starts a new game, reinitializes all variables.
	var newGame = function() {
		score = 0;
		incorrect = 0;
		unanswered = 0;
		choiceSelected = null;
		clockRunning = false;
		currentQuestion;
		triviaInterval;
		nextQuestion(0);
	}

	// Function that changes the current question. 
	var nextQuestion = function(q){
		choiceSelected = null;
		
		// If the game is still in progress, display the next question and choices.
		if (q < triviaQuestions.length) {
			$('#game-area').html('<h4>Time Remaining: <span id="time-remaining"></span></h4><br /><h3>' + triviaQuestions[q].question + '</h3><ol class="choice-list"></ol>');
			for (var i = 0; i < triviaQuestions[q].choices.length; i++) {
				$('.choice-list').append('<li class="choices" data-value="' + i + '">' + triviaQuestions[q].choices[i] + '</li>');
			}
			
			// Starts the timer for the current question
			triviaTimer.start(q, triviaQuestions[q].answer);
			
			// jQuery - if a choice is clicked, capture the data selected and then run the checkAnswer function
			$('.choices').click(function(){
				choiceSelected = $(this).attr('data-value');
				console.log(choiceSelected);
				console.log("You chose: " + triviaQuestions[q].choices[choiceSelected]);
				checkAnswer(choiceSelected, triviaQuestions[q].answer, q);

			})
		} else {
			// If all questions have been guessed, stop the timer and then display the score.
			triviaTimer.stop();
			$('#game-area').html('<h3>All Done! Here\'s how you did.</h3><p>Correct Answers:' + score + '</p><p>Incorrect Answers: ' + incorrect + '</p><p>Unanswered: ' + unanswered + '</p><button class="start btn-lg center-block">Start Over</button>');
			$('.start').click(function(){
				newGame();
			})
		}

	}

	// This function takes 3 properties- the user's answer, the correct answer, and the current question.
	// It compares the user's answer (or lack of answer) and the real answer and distributes points accordingly.
	// After two seconds, the nextQuestion function is run to keep the game moving.
	var checkAnswer = function(check, ans, questionNum) {
		if (check == ans) {
			score++;
			console.log("Correct! Score: " + score);
			$('#game-area').html('<h2>Correct!</h2>');
			setTimeout(function(){nextQuestion(questionNum + 1);}, 2000);	
		} else if (!check) {
			unanswered++;
			console.log("Time\'s Up! Score: " + score);
			$('#game-area').html('<h2>Time\s Up!</h2><h3>The correct answer was: ' + triviaQuestions[questionNum].choices[ans] + '</h3>');
			setTimeout(function(){nextQuestion(questionNum + 1);}, 3000);
		} else {
			incorrect++;
			console.log("Incorrect! Score " + score);
			$('#game-area').html('<h2>Incorrect!</h2><h3>The correct answer was: ' + triviaQuestions[questionNum].choices[ans] + '</h3>');
			setTimeout(function(){nextQuestion(questionNum + 1);}, 3000);
		}
	}

	// If the start button is clicked, start a new game!
	$('.start').click(function() {
		newGame();
	})

})
