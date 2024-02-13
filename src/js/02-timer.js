import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector("[data-start]");
const datetimePicker = document.getElementById("datetime-picker");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
  
      if (selectedDate <= currentDate) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  };

flatpickr("#datetime-picker", options);

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
  };

  const daysSpan = document.querySelector("[data-days]");
  const hoursSpan = document.querySelector("[data-hours]");
  const minutesSpan = document.querySelector("[data-minutes]");
  const secondsSpan = document.querySelector("[data-seconds]");
  
  let timerInterval = 0;
  
  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    datetimePicker.disabled = true;

    timerInterval = setInterval(() => {
      const selectedDate = new Date(datetimePicker.value);
      const currentDate = new Date();
      const timeDiff = selectedDate.getTime() - currentDate.getTime();
      if (timeDiff <= 0) {
        clearInterval(timerInterval);
        startButton.disabled = false;
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(timeDiff);
      daysSpan.textContent = days.toString().padStart(2, "0");
      hoursSpan.textContent = hours.toString().padStart(2, "0");
      minutesSpan.textContent = minutes.toString().padStart(2, "0");
      secondsSpan.textContent = seconds.toString().padStart(2, "0");
    }, 1000);
  });