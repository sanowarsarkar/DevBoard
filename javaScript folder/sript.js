// To change the background color

function changeBackgroundColor() {
    document.body.style.background = `linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)},
     #${Math.floor(Math.random()*16777215).toString(16)})`;
}

//To show live dates

function updateDateTime() {
    let now = new Date();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let todayNumber = now.getDay();
    let todayName = days[todayNumber];
    let monthName = months[now.getMonth()];
    let monthNumber = now.getMonth() + 1;
    
    document.getElementById("month").innerText = `${monthName} (${monthNumber})`; 
    document.getElementById("day").innerText = todayName;

    let day = now.getDate();
    let year = now.getFullYear();

    let dateString = `${day}/${monthNumber}/${year}`;
    document.getElementById("date").innerText = dateString;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Will only show "You have completed the task"
function handleClick(btn, title, lastOne) { 
    console.log("Button clicked:", btn);

    if (lastOne) {
        alert("Board of the successfully");
        setTimeout(function () {
            alert("Congratulations! You have completed all the current tasks.");
        }, 700);
    } else {
        alert("You have completed the task");
    }

    // Updating numbers
    let remCount = document.getElementById("remainingCount");
    let compCount = document.getElementById("completedCount");

    let r = parseInt(remCount.innerText);
    let c = parseInt(compCount.innerText);

    if (r > 0) {
        remCount.innerText = r - 1;
        compCount.innerText = c + 1;
    }

    // Disable button
    if (btn) { 
        btn.disabled = true;
        btn.style.opacity = "0.5"; 
        btn.style.cursor = "not-allowed";
        console.log("Button disabled");
    } else {
        console.error("Button element not found!");
    }

    saveHistory(title + " - You have completed the task");
}

function saveHistory(historyText) {
    let time = new Date().toLocaleTimeString();
    let hisItem = historyText + " - " + time;

    let hisList = localStorage.getItem("history");
    hisList = hisList ? JSON.parse(hisList) : [];

    hisList.push(hisItem);
    localStorage.setItem("history", JSON.stringify(hisList));
    showHistory();
}
// The previous history will be deleted
function showHistory() {
    let hisList = localStorage.getItem("history");
    hisList = hisList ? JSON.parse(hisList) : [];

    let hisDiv = document.getElementById("history");
    hisDiv.innerHTML = ""; 

    hisList.forEach(function (item) {
        let p = document.createElement("p");
        p.innerText = item;

        // Applying styles
        p.style.background = "#1D4ED8";
        p.style.color = "white";
        p.style.padding = "10px";
        p.style.border = "1px solid #2980b9";
        p.style.borderRadius = "6px";
        p.style.fontSize = "15px";
        p.style.margin = "5px";
        hisDiv.appendChild(p);
    });
}
// Delete history
function clearHistory() {
    localStorage.removeItem("history");
    document.getElementById("history").innerHTML = "";
}

showHistory();
