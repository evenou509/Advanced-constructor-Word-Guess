//letter.js contains a constructor, letter.this constructor should be able to either display an underlying cahracter or a blank placeholder 

var Letter = function(character) {
    // A string value to store the underlying character for the letter
    this.character = character;
    // A boolean value that stores whether that letter has been guessed yet
    this.guessed = false;

    // A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
    this.toString = function() {
        return this.guessed ? this.character : '_';
    }
    // A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
    this.makeGuess = function(newGuess) {
        if(this.character.toLowerCase() === newGuess.toLowerCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;