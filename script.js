var get_word = function () {
	
	var request = new XMLHttpRequest;
	request.open('GET', 'https://crossorigin.me/http://randomword.setgetgo.com/get.php');
	request.onload = function() {
		if (request.status == 200){		
			document.getElementById("word").innerHTML = request.response;
		}
	};
	
	request.onerror = function() {
		console.log('connection error');
	};
	
	request.send();		
};

// add button click event
// document.getElementById("button").addEventListener("click", get_word);

var HangmanApp = function(elem) {

	var alphabet = "abcdefghijklmnopqrstuvwxyz",
		word = "test",
		word_length,
		letters_guessed = ["e"],
		
		displayed_word = "test",
  		lives_left = 5,
		
		// DOM elements
		top_display,
  		DOM_displayed_word,
  		DOM_lives_left,
  		DOM_letters_guessed,
  		buttons_section,
		letter_buttons = [];	
  		
  	
  	// create DOM elements
  	top_display = document.createElement("div");
  	top_display.classList.add("top-display");
  	
  	DOM_displayed_word = document.createElement("span"); 
  	top_display.appendChild(DOM_displayed_word);
  		
  	DOM_lives_left = document.createElement("span");
  	top_display.appendChild(DOM_lives_left);
  	
  	buttons_section = document.createElement("div");
  	buttons_section.classList.add("buttons-section");
  	
  	// create buttons
  	for (var i=0; i<26; i++) {
  		letter_buttons.push(createButton(alphabet[i]));
  	}
  	
	// initial DOM display    
	elem.appendChild(top_display);
	elem.appendChild(buttons_section);
	
	for (var i = 0; i < 26; i++) {
		buttons_section.appendChild(letter_buttons[i]);
	}

	function contains(arr, el) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == el) { return true }
		}
		return false
	};

	// private functions
	function renderDisplayedWord() {
		displayed_word = ""
		for (var i = 0; i < word.length; i++) {
			// var guessed = false;
// 			for (var j = 0; j < letters_guessed.length; j++) {
// 				if (word[i] == letters_guessed[j]){
// 					displayed_word += word[i] + " ";
// 					guessed = true;
// 				}
// 			}
// 			if (!guessed) {
// 				displayed_word += "_ ";
// 			}
			if (contains(letters_guessed, word[i])) {
				displayed_word += word[i] + " ";
			}
			else {
				displayed_word += "_ ";
			}
		}
		DOM_displayed_word.innerHTML = displayed_word;
	};
		
	function render() {
		renderDisplayedWord();
		DOM_lives_left.innerHTML = lives_left;
		renderButtons();
	};
	
	function startGame() {
		// get word
		render();
		
	}

	function renderButtons() {
		for (var i = 0; i < 26; i++) {
			
			
		}
	};

	function createButton(letter) {
		var b = document.createElement("button");
		b.id = letter;
		b.innerHTML = letter;
		b.addEventListener("click", letter_select);
		return b;
	}
  
	function letter_select() {
		var letter = event.target.id,
			correct_guess = false;
		// if not already there...
		letters_guessed.push(letter);
		for (var i = 0; i < word.length; i++)
			if (letter == word[i]) {
				correct_guess = true;
				break;
			}
		if (!correct_guess) {
			lives_left -= 1;
		}
		render();
	}

	startGame();

};


document.addEventListener('DOMContentLoaded', function() {

	var begin_button = document.getElementById("begin-button")
		hangman_div = document.getElementById("hangman");
		
	begin_button.addEventListener("click", function() {
		new HangmanApp(hangman_div);
	});
});



