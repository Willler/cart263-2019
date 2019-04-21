"use strict";

/*****************

Project 3 [Name Pending]
William L'Eriger

Javascript code for Project 3
A series of minigame pop-ups depicting daydreams
In a broader theme of Escapism

******************/

// prepping the project
$(document).ready(jquerySetup);

// defining the options variable, which will randomize the pitch and rate of responsiveVoice
let options = {
  pitch: Math.random(),
  rate: Math.random()
};

// variables for the pulsing background imagery
let backgroundImageAngle = 0;
let backgroundImageSize = 800;

// // variables for moving dots in the background
// let dotX;
// let dotY;
// let dotVX;
// let dotVY;

// preloading the audio
let answerSFX = new Audio("assets/sounds/sublayer.mp3");
let lockSFX = new Audio("assets/sounds/lockOpened.mp3");
let riddlesMusic = new Audio("assets/sounds/riddlesMusic.mp3");
let clickSFX = new Audio("assets/sounds/effects.wav");

// assigning variables to text files for Rita functionality
let hamletText;
let jekyllText;
let fellowshipText;
let monteCristoText;
let oldTestamentText;
let petitPrinceText;

// markov generator variable
let markov;

// riddle stuff
let previousRiddle = '';
let riddlesAnswered = 1;

// variable to initiate background after click
let heartClicked = false;
// setup
//
// initializing the project
function jquerySetup() {

  $.when(
   // Load Hamlet
   $.ajax({
     url: 'data/hamlet.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       hamletText = data;
     }
   }),
   // load the old testament
   $.ajax({
     url: 'data/oldTestament.txt',
     dataType: 'text',
     success: function (data) {
       // When loaded, we store the data (a string containing the book)
       // in the appropriate variable
       oldTestamentText = data;
     }
   }),
 ).then(gotHamletTestamentData); // When finished we call gotHamletTestamentData() to carry on with the show

 $.when(
     // Load jekyll and hyde text
     $.ajax({
       url: 'data/jekyllHyde.txt',
       dataType: 'text',
       success: function (data) {
         // When loaded, we store the data (a string containing the book)
         // in the appropriate variable
         jekyllText = data;
       }
     }),
     // Load lord of the rings text
     $.ajax({
       url: 'data/lotrFellowship.txt',
       dataType: 'text',
       success: function (data) {
         // When loaded, we store the data (a string containing the book)
         // in the appropriate variable
         fellowshipText = data;
       }
     })
   ).then(gotJekyllFellowshipData); // When finished we call gotData() to carry on with the show

   $.when(
       // Load the Count of Monte Cristo
       $.ajax({
         url: 'data/monteCristo.txt',
         dataType: 'text',
         success: function (data) {
           // When loaded, we store the data (a string containing the book)
           // in the appropriate variable
           monteCristoText = data;
         }
       }),
       // Load le Petit Prince
       $.ajax({
         url: 'data/petitPrince.txt',
         dataType: 'text',
         success: function (data) {
           // When loaded, we store the data (a string containing the book)
           // in the appropriate variable
           petitPrinceText = data;
         }
       })
     ).then(gotMontePrinceData); // When finished we call gotData() to carry on with the show

  $(this).one('click', startChoice);

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // dotX = width/2;
  // dotY = height/2;
  //
  // dotVX = 10;
  // dotVY = 10;
}

function draw() {

if (!heartClicked) {
  background(255);
} else {
  background("#800000");

  var imageGrowth = sin(backgroundImageAngle) * (backgroundImageSize/20);

  //ellipse parameters
  noStroke();
  ellipseMode(CENTER);

  //7th layer
  fill("#660000");
  ellipse(width/2 - 200, height/2 - 50, backgroundImageSize/1.8 + imageGrowth);
  ellipse(width/2 + 300, height/2 + 200, backgroundImageSize/1.8 + imageGrowth);

  //6th Layer
  stroke(255);
  strokeWeight(4);
  line(150, 0, width, height);
  line(0, height/2 + 300, width, 200);

  // 5th layer
  noStroke();
  fill("#4d0000");
  ellipse(width/2 - 300, height/2 - 300, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 + 500, height/2 - 200, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 + 500, height/2 + 250, backgroundImageSize/1.5 + imageGrowth);
  ellipse(width/2 - 500, height/2 + 100, backgroundImageSize/1.5 + imageGrowth);

  //4th layer
  stroke(200);
  strokeWeight(6);
  line(0, 200, width, height/2);
  line(width/2 + 100, 0, width/2 + 400, height);
  line(200, height, width/2 + 350, 0);

  //3rd Layer
  noStroke();
  fill("#330000");
  ellipse(200, 200, backgroundImageSize + imageGrowth);
  ellipse(200, height, backgroundImageSize + imageGrowth);
  ellipse(width/2 + 100, 0, backgroundImageSize + imageGrowth);
  ellipse(width, height/2, backgroundImageSize + imageGrowth);
  ellipse(width/2 + 400, height + 100, backgroundImageSize + imageGrowth);

  //2nd layer
  stroke(100);
  strokeWeight(8);
  line(width/2, height, width - 300, 0);
  line(width, height, width/2 - 300, 0);
  line(0, height/2, width - 300, 100);
  // backgroundMovingObjects();

  //1st Layer
  noStroke();
  fill("#1a0000");
  ellipse(width - 80, height - 100, backgroundImageSize + imageGrowth);
  ellipse(width - 300, 0, backgroundImageSize + imageGrowth);
  ellipse(50, height/2, backgroundImageSize + imageGrowth);
  ellipse(width/2 - 280, -150, backgroundImageSize + imageGrowth);
  ellipse(width/2 - 100, height, backgroundImageSize + imageGrowth);


  backgroundImageAngle += 0.05;
 }
}

// function backgroundMovingObjects() {
//   dotX += dotVX;
//   dotY += dotVY;
//
//   ellipse(dotX, dotY);
// }

// startChoice
//
// first window that appears after clicking the screen
// Player can choose an option which will start them off on a specific riddle
function startChoice() {

  //remove the promt text
  $('.startImage').remove();
  heartClicked = true;
  riddlesMusic.play();

  // append the div which contains the popup
  $('body').append("<div class = 'startingGame'><div>");
  console.log("First Minigame - Initiated");

  // define the text contained within the dialog window
  $(".startingGame").html("You are suffocating at the bottom of the abyss, removed from the outside world. You had always known life to be an unwinnable game; a journey without purpose. When thinking of the hand you've been dealt, a single emotion surges forward. You felt... <br> <br> [Contempt]   [Fear]  [Hopelessness]");

  if (annyang) {
        var commands = {
          'contempt': function() {
            setTimeout(firstRiddle, 5000);
            responsiveVoice.speak("Years of contempt leave you jaded.", 'Italian Male', options);
            console.log('contempt option chosen');
            answerSFX.play();
          },
          'fear': function() {
            setTimeout(secondRiddle, 5000);
            responsiveVoice.speak("Unadultered fear of the unknown cripple you.", 'UK English Male', options);
            console.log('fear option chosen');
            answerSFX.play();
          },
          'hopelessness': function() {
            setTimeout(thirdRiddle, 5000);
            responsiveVoice.speak("The broad expanse of the world weighs heavily upon your mind.", "UK English Female", options);
            console.log('hopeless option chosen');
            answerSFX.play();
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();

    }

  // variables for randomizing location of dialog boxes
  let horizontalOffset = Math.floor(Math.random() * 201) - 100;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  // defining parameters of the dialog window
  $(".startingGame").dialog({
  //position the dialog window in the center of the canvas
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  // defining size
  height: 450,
  width: 550,
  // what will happen when clicking the 'x' button
  close: function() {
    // trigger responsiveVoice
    responsiveVoice.speak("There is no escape.", 'UK English Male', options);
    // re-open the dialog window
    setTimeout(startChoice, 5000);
  },
  // removes ability to close window with the escape key
  closeOnEscape: false,
  // title of the window
  title: "The Abyss - Submerged"
});

}

function firstRiddle() {
  $(".startingGame").remove();
  $('.riddle2').remove();
  $('.riddle3').remove();

  console.log("First Riddle - Initiated");
  $('body').append("<div class = 'riddle1'><div>");

  $(".riddle1").html("A prisoner is told 'If you tell a lie we will hang you; if you tell the truth we will shoot you' What can he say to save himself?");

  //annyang functionality
  if (annyang) {
        var commands = {
          'you will hang me': function() {

            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'second' && riddlesAnswered < 3) {
              setTimeout(thirdRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' third' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }
            responsiveVoice.speak("Proceeding", 'Italian Male', options);
            console.log('first riddle solved');
            riddlesAnswered++;
            previousRiddle = 'first';
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;


  $(".riddle1").dialog({
  //position the dialog window in the center of the canvas
  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("...And yet, it persists.", 'UK English Male', options);
    $(".riddle1").remove();
    setTimeout(firstRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The First Layer - Rememberance (1)"
});
}

// secondRiddle
//
// function for the second riddle, containing the dialog popup and everything associated with it
function secondRiddle() {
  $(".startingGame").remove();
  $(".riddle1").remove();
  $('.riddle2').remove();


  $('body').append("<div class = 'riddle2'><div>");
  console.log("Second Riddle - Initiated");

  $(".riddle2").html("A murderer is condemned to death. He has to choose between three rooms. The first is full of raging fires, the second is full of assassins with loaded guns, and the third is full of lions that haven't eaten in 3 years. Which room is safest for him?")

  if (annyang) {
        var commands = {
          'lions': function() {

            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(firstRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'first' && riddlesAnswered < 3) {
              setTimeout(thirdRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' third' && riddlesAnswered < 3) {
              setTimeout(firstRiddle, 5000);
              answerSFX.play();
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }

            responsiveVoice.speak("Correct. Lions that have not eaten in three years are dead.", 'Spanish Female');
            console.log('annyang working');
            riddlesAnswered++;
            previousRiddle = 'second';
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

    // variables for randomizing location of dialog boxes
    let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
    let verticalOffset = Math.floor(Math.random() * 401) - 200;

  $(".riddle2").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Escape slips through your fingers...", 'UK English Male', options);
    $(".riddle2").remove();
    setTimeout(secondRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The First Layer - Rememberance (2)"
});

}

function thirdRiddle() {
  $(".startingGame").remove();
  $(".riddle1").remove();
  $(".riddle2").remove();

  $('body').append("<div class = 'riddle3'><div>");
  console.log("Third Riddle - Initiated");

  $(".riddle3").html("They are Dark, and always on the run. Without the sun, there would be none.");

  if (annyang) {
        var commands = {
          'shadows': function() {
            if (previousRiddle === '' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === 'second' && riddlesAnswered < 3) {
              setTimeout(firstRiddle, 5000);
              answerSFX.play();
            } else if (previousRiddle === ' first' && riddlesAnswered < 3) {
              setTimeout(secondRiddle, 5000);
              answerSFX.play();
            } else if (riddlesAnswered === 3) {
              setTimeout(firstTextGame, 5000);
              lockSFX.play();
            }

            responsiveVoice.speak("They follow you. Everywhere.", 'Spanish Female');
            console.log('annyang working');
            riddlesAnswered++;
            previousRiddle = 'third';
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

    // variables for randomizing location of dialog boxes
    let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
    let verticalOffset = Math.floor(Math.random() * 401) - 200;

  $(".riddle3").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("The light recedes, the tunnel neverending.", 'UK English Male', options);
    $(".riddle3").remove();
    setTimeout(thirdRiddle, 5000);
  },
  closeOnEscape: false,
  title: "The First Layer - Rememberance (3)"
});
}

// gotData (data)
//
// Called when .ajax has loaded our two books.
function gotHamletTestamentData () {
  // Join the two texts together into a single string
  let allText = hamletText + ' ' + oldTestamentText;
  // Create a Markov chain generator
  markov = new RiMarkov(4);
  // Load the string of both books into the Markov generator
  markov.loadText(allText);
  // Generate a paragraph of text
  generateParagraph();
  console.log('generated');
}

// gotData (data)
//
// Called when .ajax has loaded our two books.
function gotJekyllFellowshipData () {
  // Join the two texts together into a single string
  let allText = jekyllText + ' ' + fellowshipText;
  // Create a Markov chain generator
  markov = new RiMarkov(4);
  // Load the string of both books into the Markov generator
  markov.loadText(allText);
  // Generate a paragraph of text
  generateParagraph();
  console.log('generated');
}

// gotData (data)
//
// Called when .ajax has loaded our two books.
function gotMontePrinceData () {
  // Join the two texts together into a single string
  let allText = monteCristoText + ' ' + petitPrinceText;
  // Create a Markov chain generator
  markov = new RiMarkov(4);
  // Load the string of both books into the Markov generator
  markov.loadText(allText);
  // Generate a paragraph of text
  generateParagraph();
  console.log('generated');
}

// generateParagraph()
//
// Clears the current texts and generates a new one in its place
function generateParagraph() {
  // Clear the current text
  $('#content').text('');
  // Generate ten sentences for our paragraph
  // (Output is an array)
  let sentenceArray = markov.generateSentences(20);
  // Turn the array into a single string by joining with spaces
  let sentenceText = sentenceArray.join(' ');
  // Put the new text onto the page
  $('#content').append(sentenceText);
}

function firstTextGame() {

  console.log("game launched");
  $(".riddle1").remove();
  $(".riddle2").remove();
  $(".riddle3").remove();


  $('body').append("<div class = 'game1'><div>");
  $('.game1').append("<div id = 'content'><div>");
  $('.game1').html(gotHamletTestamentData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  if (annyang) {
        var commands = {
          'hamlet': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("A shakespearean classic, of course.", 'UK English Male');
            console.log('annyang working');

          },
          'shakespear': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("Good enough.", 'UK English Female');
            console.log('annyang working');
          },
          'old testament': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("A holy scripture. Of course you know about it.", 'UK English Female');
            console.log('annyang working');
          },
          'bible': function() {
            setTimeout(secondTextGame, 3000);
            responsiveVoice.speak("A little vague, but it does the job.", 'Spanish Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

  $(".game1").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Nothing noteworthy occurs.", 'UK English Male', options);
    $(".game1").remove();
    setTimeout(firstTextGame, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer - Restoration (1)"
  });
}

//secondTextGame()
//
// the second minigame involving Rita
function secondTextGame() {

  $('.game1').remove();

  $('body').append("<div class = 'game2'><div>");
  $('.game2').append("<div id = 'content'><div>");
  $('.game2').html(gotJekyllFellowshipData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  if (annyang) {
        var commands = {
          'strange case of doctor jekyll and mister hyde': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("Examplary work. Everything seems clearer now.", 'UK English Male');
            console.log('annyang working');

          },
          'jekyll and hyde': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("Correct. Another lock bursts open.", 'UK English Female');
            console.log('annyang working');
          },
          'lord of the rings': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("You always wished you could put it on as well.", 'UK English Female');
            console.log('annyang working');
          },
          'fellowship of the ring': function() {
            setTimeout(thirdTextGame, 3000);
            responsiveVoice.speak("Precisely. The misty veil parts once more.", 'Spanish Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

  $(".game2").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Nothing noteworthy occurs.", 'UK English Male', options);
    $(".game2").remove();
    setTimeout(secondTextGame, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer - Restoration (2)"
  });

}

// thirdTextGame()
//
// the second minigame involving Rita, this time with the Count of Monte Cristo and Le Petit Prince
function thirdTextGame() {

  $('.game2').remove();

  $('body').append("<div class = 'game3'><div>");
  $('.game3').append("<div id = 'content'><div>");
  $('.game3').html(gotMontePrinceData);

  // variables for randomizing location of dialog boxes
  let  horizontalOffset = Math.floor(Math.random() * 401) - 200;
  let verticalOffset = Math.floor(Math.random() * 401) - 200;

  if (annyang) {
        var commands = {
          'count of monte cristo': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("Wait and hope; Words you've always gone by.", 'UK English Male');
            console.log('annyang working');

          },
          'monte cristo': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("An unimaginable treasure. You wish you had such fortune.", 'UK English Female');
            console.log('annyang working');
          },
          'le petit prince': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("Une aventure qui a du coeur. Tu en es jaloux.", 'French Female');
            console.log('annyang working');
          },
          'little prince': function() {
            setTimeout(firstQuestion, 3000);
            responsiveVoice.speak("An emotional tale that changed your youth.", 'UK English Female');
            console.log('annyang working');
          }
        }
        // annyang functionality
        annyang.addCommands(commands);
        annyang.start();
    }

  $(".game3").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Nothing noteworthy occurs.", 'UK English Male', options);
    $(".game3").remove();
    setTimeout(thirdTextGame, 5000);
  },
  closeOnEscape: false,
  title: "The Second Layer - Restoration (3)"
  });

}

function firstQuestion() {
  $('.game3').remove();

  $('body').append("<div class = 'question1'><div>");

  $('.question1').html("Is there such a thing as destiny?");

  $(".question1").dialog({

  position: {
    my: `center`+ verticalOffset,
    at: `center`+ horizontalOffset
  },
  height: 380,
  width: 550,
  close: function() {
    responsiveVoice.speak("Nothing noteworthy occurs.", 'UK English Male', options);
    $(".game3").remove();
    setTimeout(secondQuestion, 5000);
  },
  closeOnEscape: false,
  title: "The Third Layer - Resurgeance (1)"
  });

}

function secondQuestion() {

}

function thirdQuestion() {

}
