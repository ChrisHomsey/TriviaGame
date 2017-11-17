$( document ).ready(function() {
	
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

	var score;
	var incorrect;
	var unanswered;
	var choiceSelected;
	var clockRunning = false;
	var triviaInterval;
	var currentQuestion;



	var triviaTimer = {

		remaining: 20,

		start: function(q, a){
			
			triviaTimer.remaining = 20;
			$('#time-remaining').text(triviaTimer.remaining);
			currentQuestion = q;
			currentAnswer = a;
			if (clockRunning == false) {     
				triviaInterval = setInterval(triviaTimer.count, 1000 );
				clockRunning = true;
			}
		},

		count: function(){
			triviaTimer.remaining--;
			$('#time-remaining').text(triviaTimer.remaining);
			
			if (triviaTimer.remaining == 0) {
				checkAnswer(null, currentAnswer, currentQuestion);
			}
		},

		stop: function() {
			clearInterval(triviaInterval);
		}

	}

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


	var nextQuestion = function(q){
		choiceSelected = null;
		if (q < triviaQuestions.length) {
			$('#game-area').html('<h4>Time Remaining: <span id="time-remaining"></span></h4><br /><h3>' + triviaQuestions[q].question + '</h3><ol class="choice-list"></ol>');
			for (var i = 0; i < triviaQuestions[q].choices.length; i++) {
				$('.choice-list').append('<li class="choices" data-value="' + i + '">' + triviaQuestions[q].choices[i] + '</li>');
			}

			triviaTimer.start(q, triviaQuestions[q].answer);

			$('.choices').click(function(){
				choiceSelected = $(this).attr('data-value');
				console.log(choiceSelected);
				console.log("You chose: " + triviaQuestions[q].choices[choiceSelected]);
				checkAnswer(choiceSelected, triviaQuestions[q].answer, q);

			})
		} else {
			triviaTimer.stop();
			$('#game-area').html('<h3>All Done! Here\'s how you did.</h3><p>Correct Answers:' + score + '</p><p>Incorrect Answers: ' + incorrect + '</p><p>Unanswered: ' + unanswered + '</p><button class="start btn-lg center-block">Start Over</button>');
			$('.start').click(function(){
				newGame();
			})
		}

	}

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


	$('.start').click(function() {
		newGame();
	})

})
