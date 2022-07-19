// CONTROL BUTTONS
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const setButton = document.querySelector('.set');
const stopButton = document.querySelector('.stop');
const addMinutes = document.querySelector('.add5');
const removeMinutes = document.querySelector('.remove5');
const TIMER = document.querySelector('#timer');

// Logic controls
let minutesSet = document.querySelector('.minutes');
let currentMinutes = Number(minutesSet.textContent);
let userMinutes = 25;
let nextCounter = 5;

let seconds = document.querySelector('.seconds');
let currentSeconds = 0;

let lapsCounter = 0;

let soundIsPlaying = false;
let isClocking = false;
let isResting = false;

// SOUND BUTTONS
const forestButton = document.querySelector('.forest');
const rainButton = document.querySelector('.rain');
const coffeeshopButton = document.querySelector('.coffeeshop');
const fireplaceButton = document.querySelector('.fireplace');

// SOUNDS
const forestSound = new Audio('https://drive.google.com/file/d/1CRHkV72WUMdcqec5GT_KdsqFz0z3VAOA/view');
const rainSound = new Audio('https://drive.google.com/file/d/1Ip8xBqAUJ-bty51Wz8JBtX_bWXCgA0P2/view'); // https://drive.google.com/file/d/1Ip8xBqAUJ-bty51Wz8JBtX_bWXCgA0P2/view
const coffeeshopSound = new Audio('./sounds/cafeteria.wav'); // https://drive.google.com/file/d/1OxLKpCwg2wrxXFNUHgZxJ51QEt0ac5RA/view
const firePlaceSound = new Audio('./sounds/lareira.wav'); // https://drive.google.com/file/d/1MakaBPxJvTa_whaSM3kEbRcxiVd1GRCB/view
const timeUpSound = new Audio('./sounds/kitchen-timer.mp3');



// Functions

// Sound functions

function playSound (sound) {
  soundIsPlaying = true;
  sound.play();
  sound.loop = true;
}

// function stopAllSounds () {
//   forestSound.pause();
//   rainSound.pause();
//   coffeeshopSound.pause();
//   firePlaceSound.pause();
// } 
// This one I would use to stop the currently playing sound when I select another sound button without unselecting the current one, but I realized they actually sound nice when played together 

function stopThisSound (sound) {
  sound.pause();
  soundIsPlaying = false;
}

function soundButtonHandler(sound, button) {
  if (soundIsPlaying) {
    stopThisSound(sound);
    button.classList.remove('selected-button');
    return;
  }

  playSound(sound);
  button.classList.add('selected-button');
}

// Timer functions

function updateCounter (newMinutes, newSeconds) {
  let secondsDisplay = String(newSeconds).padStart(2,"0");
  seconds.textContent = secondsDisplay;
  currentSeconds = newSeconds;

  let minutesDisplay = String(newMinutes).padStart(2, '0');
  minutesSet.textContent = minutesDisplay;
  currentMinutes = newMinutes;
}

function countdown() {
  pomoTimer = setTimeout(function () {
    isClocking = true;

    newSeconds = Number(seconds.textContent) - 1;
    newMinutes = Number(minutesSet.textContent);

    if (newSeconds < 0) {
      newSeconds = 59;
      newMinutes = newMinutes - 1;
    }

    updateCounter(newMinutes, newSeconds);

    isFinished = newSeconds === 0 && newMinutes === 0;

    if (isFinished) {
      timeUpSound.play();
      if (isResting) {
        isResting = false;
        nextCounter = userMinutes;
      } else {
        isResting = true;
        lapsCounter++;
        if (lapsCounter >= 4) {
          nextCounter = 30;
          lapsCounter = 0;
        } else {
        nextCounter = 5;
        }
      }
      timeUp();
      return;
    }

    countdown();
    
  }, 1000)
}

function pause() {
  clearTimeout(pomoTimer);
  isClocking = false;
}

function resetControls() {
  pauseButton.classList.add('hidden');
  playButton.classList.remove('hidden');
  stopButton.classList.add('hidden');
  setButton.classList.remove('hidden');
}

function timeUp() {
  clearTimeout(pomoTimer);
  updateCounter(00, 00);
  TIMER.classList.add('time-up');
  
  const delay = setTimeout(() => {
    updateCounter(nextCounter, 00);
  }, 1500);

  resetControls();
  isClocking = false;
}

function stopNow() {
  clearTimeout(pomoTimer);
  updateCounter(userMinutes, 00);
  resetControls();
  isClocking = false;
}

// events

playButton.addEventListener('click', function () {
  playButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  setButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  TIMER.classList.remove('time-up');

  countdown();
})

pauseButton.addEventListener('click', function () {
  playButton.classList.remove('hidden');
  pauseButton.classList.add('hidden');
  pause();
})

stopButton.addEventListener('click', function () {
  stopNow();
})

setButton.addEventListener('click', function () {
  userMinutes = Number(prompt('Quantos minutos de foco?'));
  if (userMinutes) {
    currentMinutes = userMinutes;
  }
  updateCounter(currentMinutes, 00);
})

addMinutes.addEventListener('click', function () {
  updateCounter(currentMinutes + 5, currentSeconds);
})

removeMinutes.addEventListener('click', function () {
  if (currentMinutes >= 5) {
    updateCounter(currentMinutes - 5, currentSeconds);
  } else {
    stopNow();
  }

  if (currentMinutes === 0 && currentSeconds === 0) {
    updateCounter(userMinutes, 00);
  }
})

forestButton.addEventListener('click', function () {
  soundButtonHandler(forestSound, forestButton);
})

coffeeshopButton.addEventListener('click', function () {
  soundButtonHandler(coffeeshopSound, coffeeshopButton);
})

fireplaceButton.addEventListener('click', function() {
  soundButtonHandler(firePlaceSound, fireplaceButton);
})

rainButton.addEventListener('click', function () {
  soundButtonHandler(rainSound, rainButton);
});