document.addEventListener("DOMContentLoaded", () => {
    let hours = 0, minutes = 0, seconds = 0, centiseconds = 0;
    let isRunning = false;
    let timer;
    let counter = 0;
    let lastLapTime = 0; 
    let totalTime = 0; 

    const timeDisplay = document.querySelector("#time");
    const startButton = document.querySelector("#start");
    const resetButton = document.querySelector("#reset");
    const lapButton = document.querySelector("#lap");
    const lapContainer = document.querySelector("#laps");
    const counterDisplay = document.querySelector("#num");
    const totalContainer = document.querySelector("#total"); 

   
    function formatTime(timeInCentiseconds) {
        const hours = Math.floor(timeInCentiseconds / 360000);
        const minutes = Math.floor((timeInCentiseconds % 360000) / 6000);
        const seconds = Math.floor((timeInCentiseconds % 6000) / 100);
        const centiseconds = timeInCentiseconds % 100;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
    }

   
    function updateTime() {
        centiseconds++;
        if (centiseconds == 100) {  
            centiseconds = 0;
            seconds++;
        }
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
        timeDisplay.innerText = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
    }

    
    function getCurrentTimeInCentiseconds() {
        return hours * 360000 + minutes * 6000 + seconds * 100 + centiseconds;
    }

    startButton.addEventListener("click", function() {
        if (!isRunning) {
            timer = setInterval(updateTime, 10);
            startButton.innerText = "Pause";
            isRunning = true;
        } else {
            clearInterval(timer);
            startButton.innerText = "Start";
            isRunning = false;
        }
    });

    resetButton.addEventListener("click", () => {
        clearInterval(timer);
        isRunning = false;
        hours = minutes = seconds = centiseconds = 0;
        timeDisplay.innerText = "00:00:00.00";
        startButton.innerText = "Start";
        lapContainer.innerHTML = ""; 
        counterDisplay.innerHTML = ""; 
        totalContainer.innerHTML = ""; 
        counter = 0;
        lastLapTime = 0;
        totalTime = 0;
    });

   
    lapButton.addEventListener("click", () => {
        if (isRunning) {
            const currentTime = getCurrentTimeInCentiseconds();
            const lapDuration = currentTime - lastLapTime; 
            lastLapTime = currentTime;

           
            const lapTime = document.createElement("li");
            lapTime.innerText = formatTime(lapDuration);
            lapContainer.appendChild(lapTime);

            counter++;
            const number = document.createElement("li");
            number.innerText = `${String(counter).padStart(2, '0')}`;
            counterDisplay.appendChild(number);

            
            const totalTimeItem = document.createElement("li");
            totalTimeItem.innerText = formatTime(totalTime);
            totalContainer.appendChild(totalTimeItem);
        }
    });
});


