var HangmanApp = function(elem) {

	var alphabet = "abcdefghijklmnopqrstuvwxyz",
		request,
		word = "testosterone",
		word_length,
		letters_guessed = [],
		
		displayed_word,
  		lives_left = 5,
  		game_complete = false;
		
	// create DOM elements
	var top_display = quickCreateElement("div", "top-display"),  	
		DOM_displayed_word = quickCreateElement("div", "displayed-word"),
		DOM_lives_left = quickCreateElement("div", "lives-left"),
		DOM_game_message = quickCreateElement("div", "message"),
		buttons_section = quickCreateElement("div", "buttons-section"),
  		// DOM_letters_guessed,
		letter_buttons = [];	
  		
  	// create buttons
  	for (var i=0; i<26; i++) {
  		letter_buttons.push(quickCreateElement("button", "letter-button", alphabet[i]));
  	}
  	
  	// organise DOM elements	  	
  	top_display.appendChild(DOM_displayed_word);
  	top_display.appendChild(DOM_lives_left);
  	top_display.appendChild(DOM_game_message);
  	
	for (var i = 0; i < 26; i++) {
		buttons_section.appendChild(letter_buttons[i]);
	}
  	
  	
  	// HELPER FUNCTIONS
  	
  	function quickCreateElement(type, cls, id) {
  		var ret = document.createElement(type);
  		if (cls) { ret.classList.add(cls); }
  		if (id) { ret.id = id; }
  		return ret
  	}
  		
	function contains(arr, el) {
	// function to check if arr contains el
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == el) { return true }
		}
		return false
	};


	// PROCESS FUNCTIONS
	
	var getWord = function () {
		request = new XMLHttpRequest;
		request.open('GET', 'https://crossorigin.me/http://randomword.setgetgo.com/get.php');
		request.onload = function() {
			if (request.status == 200){		
				word = request.response;
			}
			// ...else
		};
		request.onerror = function() {
			console.log('connection error');
		};
		request.send();		
	};
	
	function loadInitialDOM() {    
		elem.appendChild(top_display);
		elem.appendChild(buttons_section);
	}

	function render() {
		renderDisplayedWord();
		DOM_lives_left.innerHTML = "Lives left: " + lives_left;
		evaluateResult();
		if (game_complete) {
			DOM_game_message.innerHTML = game_complete;
		}
		renderButtons(game_complete);
	};

	function renderDisplayedWord() {
		displayed_word = "";
		for (var i = 0; i < word.length; i++) {
			if (contains(letters_guessed, word[i])) {
				displayed_word += word[i];
			}
			else {
				displayed_word += "_";
			}
			displayed_word += (i == word.length) ? "" : " " ;
		}
		DOM_displayed_word.innerHTML = displayed_word;
	};
	
	function evaluateResult() {
		if (!contains(displayed_word, "_")) {
			game_complete = "Congratulations! You win!";
		}
		if (lives_left <= 0) {
			game_complete = "Bad luck, you lose! The correct word was " + word;
		}
	}

	function renderButtons(game_over) {
		for (var i = 0; i < 26; i++) {
			b = letter_buttons[i];
			b.innerHTML = "";
			b.removeEventListener("click", letter_select);
			if (!game_over && !contains(letters_guessed, alphabet[i])) {
				b.innerHTML = alphabet[i];
				b.addEventListener("click", letter_select);
			}
		}
	};
  
	function letter_select() {
		var letter = event.target.id;
		// if not already there..
		letters_guessed.push(letter);
		if (!contains(word, letter)) {
			lives_left -= 1;
		}
		render();
	}

	// START GAME (was previous abstracted into startGame() function)
	
	// getWord();
	loadInitialDOM();
	render();	

};


document.addEventListener('DOMContentLoaded', function() {

	var begin_button = document.getElementById("begin-button")
		hangman_div = document.getElementById("hangman");
		
	begin_button.addEventListener("click", function() {
		new HangmanApp(hangman_div);
	});
});



