window.onload = function(){
    var date = new Date();
    var day = date.getDate();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString();
    var hours = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    var seconds = date.getSeconds();
    
    var localtime = document.getElementById("localtime");
    var localdate = document.getElementById("localdate");
    var cdInputSec = document.getElementById("cd-input-seconds");
    var cdInputMin = document.getElementById("cd-input-minutes");
    var cdDisplay = document.getElementById("cd-display");
    var cdStart = document.getElementById("cd-start");
    var cdReset = document.getElementById("cd-reset");
    var swDisplay = document.getElementById("sw-display");
    var swStart = document.getElementById("sw-start");
    var swStop = document.getElementById("sw-stop");
    var swReset = document.getElementById("sw-reset");
    var swLap = document.getElementById("sw-lap");
    var lapTimes = document.getElementById("lap-times");
    var lapHeader = document.getElementById("lap-header");
    var remindHour = document.getElementById("remind-hour");
    var remindMin = document.getElementById("remind-minute");
    var remindSec = document.getElementById("remind-second");
    var remindBtn = document.getElementById("remind-btn");
    var remindDisplay = document.getElementById("remind-display");
    
    var timeRemaining, timeInterval, minutesLeft, secondsLeft, cdTime, swSeconds=0, swMinutes=0;
    
    function update(){
        date = new Date();
        day = date.getDate();
        month = (date.getMonth() + 1).toString();
        year = date.getFullYear().toString();
        hours = date.getHours().toString();
        minutes = date.getMinutes().toString();
        seconds = date.getSeconds();
    }

    function addZero(num){ 
        Number(num);
        if(num < 10){
            return num = "0" + num;
        }
        else{
            return num;
        }
    };
    
    function localClock(){
        update();
        localtime.innerHTML = hours + ":" + addZero(minutes) + ":" + addZero(seconds);
        localdate.innerHTML = day + "/" + addZero(month) + "/" + year;  
    }
    
    function countdown(){        
        cdStart.addEventListener("click",function(){
            if(false){
                alert("Value entered is not a number!");
            }
            else{
                timeRemaining = (+cdInputMin.value * 60) + +cdInputSec.value;
                timeInterval = setInterval(startCountdown,1000);
            }
        });
        cdReset.addEventListener("click",function(){
            clearInterval(timeInterval);
            cdDisplay.innerHTML = "00:00";
            cdInputSec.value = "";
            cdInputMin.value = "";
        });
    }
    
    function startCountdown(){
        if(timeRemaining >= 0){
            if(timeRemaining >= 60){
                minutesLeft = Math.floor(timeRemaining / 60);
                secondsLeft = timeRemaining % 60;
                cdTime = addZero(minutesLeft) + ":" + addZero(secondsLeft);
                cdDisplay.innerHTML = cdTime;
                timeRemaining--;
            }
            else if(timeRemaining < 60){
                cdDisplay.innerHTML = "00:" + addZero(timeRemaining);
                timeRemaining--;
            }
            else{
                return timeRemaining;
            }
        }
        else{
            alert("Countdown has finished");
            clearInterval(timeInterval);
        }
    }
    
    function stopwatch(){
        swStart.addEventListener("click",function(){
            swMinutes = swMinutes;
            swSeconds = swSeconds;
            swinterval = setInterval(startStopwatch,1000);
            swString = addZero(swMinutes) + ":" + addZero(swSeconds);
        });
        swStop.addEventListener("click",function(){
            clearInterval(swinterval);
            swMinutes = swMinutes;
            swSeconds = swSeconds;
            console.log("swMin: " + swMinutes);
            console.log("swSec: " + swSeconds);
        });
        function swAddLap(){
            lapHeader.innerHTML = "Lap Times";
            var newLi = document.createElement("LI");
            newLi.textContent = swString;
            lapTimes.appendChild(newLi);
            if(lapTimes.childElementCount === 4){
                swLap.removeEventListener("click",swAddLap);
            }
        };
        
        swLap.addEventListener("click",swAddLap);
        
        swReset.addEventListener("click",function(){
            clearInterval(swinterval);
            swDisplay.innerHTML = "00:00";
            lapHeader.innerHTML = "";
            lapTimes.innerHTML = "";
            swString = "00:00";
            swLap.addEventListener("click",swAddLap);
        });
    }
    
    function startStopwatch(){
        console.log("Start swMin: " + swMinutes);
        console.log("Start swSec: " + swSeconds)
        swSeconds++;
        if(swSeconds === 60){
            swSeconds = 0;
            swMinutes++;
        }
        swString = addZero(swMinutes) + ":" + addZero(swSeconds);
        swDisplay.innerHTML = swString;
    }
    
    function reminder(){
        update();
        var userH, userM, userS;
        remindBtn.addEventListener("click",function(){
            userS = remindSec.value;
            userM = remindMin.value;
            userH = remindHour.value;
            remindDisplay.innerHTML = "Your reminder is at: " + userH + ":" + userM + ":" + userS;
            remindInterval = setInterval(checkTime,1000);
        });
        function checkTime(){
            var newDate = new Date(2015,04,27,userH,userM,userS,0);
            if(newDate.getHours() === date.getHours() && newDate.getMinutes() === date.getMinutes() && newDate.getSeconds() === date.getSeconds()){
                alert("Reminder!");
                clearInterval(remindInterval);
            }
        };
    }
    
    setInterval(localClock,500);
    countdown();
    stopwatch();
    reminder();
}

