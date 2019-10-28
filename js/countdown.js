/*
 * Countdown.js
 * Taken from: https://www.w3schools.com/howto/howto_js_countdown.asp
 *
 */

// Set the date we're counting down to
const countDownDate = new Date("Jan 7, 2020 09:00:00").getTime();

// Update the count down every 1 second
const countdownInterval = setInterval(function() {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById(
    "demo"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
