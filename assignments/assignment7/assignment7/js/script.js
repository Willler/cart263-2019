"use strict";

/*****************

Music Box
Pippin Barr

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

******************/

// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

// We need an array of the possible notes to play as frequencies (in Hz)
// A Major =  A, B, C♯, D, E, F♯, and G♯
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  220,246.94,277.18,293.66,329.63,369.99,415.30
];
// The synth
let synth;
// The sound files
let kick;
let snare;
let hihat;
// Our drum pattern
// Each array element is one beat and has a string with each
// drum to play for that beat
// x = kick, o = snare, * = hihat
let pattern = ['x', 'x', 'o', '*', '*', 'o', 'o', 'x'];
// Which beat of the pattern we're at right now
let patternIndex = 0;

// check if soundtrack has been started already, if yes, dont start another instance
let trackStarted = false;


// setup()
//
// Creat canvas, set up the synth and sound files.
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Create the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });

  // Load the three drum sounds as wav files
  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });

  var flanger = new Pizzicato.Effects.Flanger({
    time: 0.45,
    speed: 0.2,
    depth: 0.1,
    feedback: 0.1,
    mix: 0.5
});

  synth.addEffect(flanger);
}

// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {

  if (!trackStarted) {
    // Start an interval for the notes
    setTimeout(playNote,NOTE_TEMPO);
    // Start an interval for the drums
    setInterval(playDrum,DRUM_TEMPO);
    // change value of trackStarted
    trackStarted = true;
  }
}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {

  let pauseSynth = Math.floor(Math.random() * 10);

  if (pauseSynth === 5) {

    synth.pause();
    console.log("Synth Sequence has been paused");

  } else {

    // Pick a random frequency from the array
    let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
    // Set the synth's frequency
    synth.frequency = frequency;

    // If it's note already playing, play the synth
    synth.play();

  }

    setTimeout(playNote, NOTE_TEMPO * (Math.floor(Math.random() * 10)/3));
    console.log("Duration Altered");

}

// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[patternIndex];

  // If there's an 'x' in there, play the kick
  if (symbols.indexOf('x') !== -1) {
    kick.play();
    document.body.style.backgroundColor = "#4286f4";
  }
  // If there's an 'o' in there, play the snare
  if (symbols.indexOf('o') !== -1) {
    snare.play();
    document.body.style.backgroundColor = "#f441be";
  }
  // If there's an '*' in there, play the hihat
  if (symbols.indexOf('*') !== -1) {
    hihat.play();
    document.body.style.backgroundColor = "#33e8bd";
  }
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

// draw()
//
// Nothing right now.

function draw() {
}
