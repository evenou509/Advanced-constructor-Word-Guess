// index.js: The file containing the logic for the course of the game, which depends on `Word.js`

var Word = require('./Word.js');

var inquirer = require('inquirer');


var picked;
var pickedWord;
var guesses;
var guessesLeft;
// array of word
var wordBank = ["Headlines", "One dance", "Work", "Hotline bling", "Best i ever had", "Started from the bottom", "Forever", "Nice for what", "Take care", "God plan", "In my feeling", "Im upset", "Finesse", "I got my eyes on you", "Find your love", "Controlla", "Passionfruit", "Over", "Successful", "No new friends"];

// Randomly selects a word and uses the `Word` constructor to store it
function randomWord (wordBank) {
    var index = Math.floor(Math.random() * wordBank.length);
    return wordBank[index];
}

// Prompts the user for each guess and keeps track of the user's remaining guesses
var questions = [
    {
        name: 'letterGuessed',
        message: 'Guess a letter',
        validate: function(value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
            return valid || 'Please enter a letter';
        },
        when: function() {
            return (!picked.allGuessed() && guessesLeft > 0);
        }
    },
    {
        type: 'confirm',
        name: 'playAgain',
        message: 'You want to play again?',

        when: function() {
            return (picked.allGuessed() || guessesLeft <= 0);
        }
    }
];

// function to reset the game

function resetGame() {
    pickedWord = randomWord(wordBank);
    picked = new Word(pickedWord);
    picked.makeGuess(' ');
    guesses = [];
    guessesLeft = 10;
}

function game() {
    if (!picked.allGuessed() && guessesLeft > 0) {
        console.log(picked + '');
    }

    inquirer.prompt(questions).then(answers => {
        if('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }
        if(answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();

            if(guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                picked.makeGuess(currentGuess);
                if(pickedWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('You already guessed', currentGuess);
            }
        }

        if(!picked.allGuessed()) {
            if(guessesLeft < 1) {
                console.log('no more guesses');
                console.log(pickedWord, 'was correct.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remainig:', guessesLeft);
            }
        } else {
            console.log(pickedWord, 'is correct!');
        }

        game();
    });
}

resetGame();

game();

