// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess.

var Letter = require('./Letter.js');
// An array of `new` Letter objects representing the letters of the underlying word
function Word(wordString) {

    this.letterArray = [];

    wordString.split('').forEach(element => {
        this.letterArray.push(new Letter(element));
        
    });
    // A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together
    this.toString = function() {
        return this.letterArray.join(' ');
    }
    // A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)
    this.makeGuess = function (guessedLetter) {
        this.letterArray.forEach(element => {
            element.makeGuess(guessedLetter);
        });
    }


    this.allGuessed = function() {
        return this.letterArray.every((currentValue) => currentValue.guessed);
    }
}   


module.exports = Word;
