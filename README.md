# music-trivia-game

I had a good time with this app. This was larger in scale than games I'd made in previous assignments. *It holds a few functions that run asynchronous*, including a **timer** built via JavaScript's native functions **setTimeout()** and **setInterval()**.

The idea was to make a trivia game that would task the user with completing classic rock trivia questions under the stress of a timer. I decided that I'd like to improve on the original requirement by timing each question.

The user can select an answer and will accumulate a score by the end of the trivia game. *If the user runs out of time without answering, or gets the question wrong, they are not awarded a point.* After all questions have been completed, the results are displayed.

*My favorite part about this app (besides music history) is the scalability and potential to be reused. By making each question an object, and placing each question object into an array, I am able add as many questions as I'd like, because the array.length controls how many times the nextQuestion() function is run. This makes the code very reuseable for any kind of trivia app I could think of.*
