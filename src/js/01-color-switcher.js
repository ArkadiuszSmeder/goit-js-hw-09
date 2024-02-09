function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const startBtn = document.querySelector("[data.start]");
  const stopBtn = document.querySelector("[data.stop]");
  let intervalId = null;
  
  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  
  
  stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(intervalId);
  });
