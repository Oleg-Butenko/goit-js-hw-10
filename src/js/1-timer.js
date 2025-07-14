import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startButton = document.querySelector(".start");
const daysToDate = document.querySelector('[data-days]');
const hoursToDate = document.querySelector('[data-hours]');
const minutesToDate = document.querySelector('[data-minutes]');
const secondsToDate = document.querySelector('[data-seconds]');
const dateInput = document.querySelector("#datetime-picker")
startButton.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const validDate = selectedDates[0] > Date.now();
      if (!validDate) {
          iziToast.show({
              position: 'topRight',
              message: "Please choose a date in the future",
              messageColor: 'white',
              iconUrl: null,
              backgroundColor: 'red',
              close: false,
              progressBar: false,
});
          startButton.disabled = true;
      } else {
          startButton.disabled = false;
          userSelectedDate = selectedDates[0];
      }
      
  },
}
flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
    // return value.padStart(2, "0")
    return value.toString().padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener("click", handleStart);


function handleStart() {
    let timeToDate = userSelectedDate - options.defaultDate;
    const validTimeToDate = convertMs(timeToDate);
    daysToDate.textContent = addLeadingZero(validTimeToDate.days);
    hoursToDate.textContent = addLeadingZero(validTimeToDate.hours);
    minutesToDate.textContent = addLeadingZero(validTimeToDate.minutes);
    secondsToDate.textContent = addLeadingZero(validTimeToDate.seconds);
    startButton.disabled = true;
    dateInput.disabled = true;
    const intervalId = setInterval(() => {
        timeToDate -= 1000;
        const validTimeToDate = convertMs(timeToDate);
        daysToDate.textContent = addLeadingZero(validTimeToDate.days);
    hoursToDate.textContent = addLeadingZero(validTimeToDate.hours);
    minutesToDate.textContent = addLeadingZero(validTimeToDate.minutes);
    secondsToDate.textContent = addLeadingZero(validTimeToDate.seconds);   
        if (timeToDate < 0) {
            // startButton.disabled = false;
            dateInput.disabled = false;
            clearInterval(intervalId);
            daysToDate.textContent = "00";
            hoursToDate.textContent = "00";
            minutesToDate.textContent = "00";
            secondsToDate.textContent = "00";
        }
    }, 1000)
}

