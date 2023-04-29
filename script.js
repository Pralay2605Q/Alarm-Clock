
// variables
const ring = new Audio('Alarm-ringtone.mp3');
ring.loop = true;

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;




//Analog Clock 

// Script for Time and Date
function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
                
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section
for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 
function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("setSeconds") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
        alert(`Your Alarm Set ${alarmTime}.`);
    }

}
setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm
function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
    alert(`Your Alarm ${click_id} Delete.`);
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}



//Analog Clock
let hr = document.querySelector('#hr');
let mn = document.querySelector('#mn');
let sc = document.querySelector('#sc');

setInterval(() =>{
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`; 



    //Digital clock
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    let am = h >= 12 ? "PM" : "AM";

    //convert 24hr clock to 12hr clock

    if(h>12){
        h=h-12;
    }

    //add zero before single digit number

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    yhours.innerHTML = h;
    yminutes.innerHTML = m;
    yseconds.innerHTML = s;
    yampm.innerHTML = am;

});



