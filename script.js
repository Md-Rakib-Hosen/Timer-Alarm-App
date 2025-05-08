// CLOCK
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

function updateClock() {
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours();

  secondHand.style.transform = `rotate(${sec * 6}deg)`;
  minuteHand.style.transform = `rotate(${min * 6 + sec * 0.1}deg)`;
  hourHand.style.transform = `rotate(${(hour % 12) * 30 + min * 0.5}deg)`;
}
setInterval(updateClock, 1000);
updateClock();

// STOPWATCH
let stopwatchTime = 0;
let stopwatchInterval;

function updateStopwatch() {
  const hrs = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
  const mins = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
  const secs = String(stopwatchTime % 60).padStart(2, '0');
  document.getElementById('stopwatch').textContent = `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatch();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  updateStopwatch();
}
updateStopwatch();

// ALARM
let alarmTime = null;
const beep = document.getElementById('beep');

function setAlarm() {
  alarmTime = document.getElementById('alarmTime').value;
  if (!alarmTime) return alert("Select a valid alarm time.");
  document.getElementById('alarmStatus').textContent = `Alarm set for ${alarmTime}`;
}

setInterval(() => {
  if (!alarmTime) return;
  const now = new Date();
  const current = now.toTimeString().slice(0,5);
  if (current === alarmTime) {
    beep.play();
    alert("⏰ Alarm ringing!");
    document.getElementById('alarmStatus').textContent = `No alarm set`;
    alarmTime = null;
  }
}, 1000);
