let getHistoryButton = document.getElementById("getHistory");
let username = "";
function fetchUsername() {
    username = window.localStorage["username"];
    console.log(username);
}

getHistoryButton.addEventListener("click", getHistory);

function getHistory() {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", getHistoryHandler);
    fetchUsername()
    query= `username=${username}`
    
    url = `/getHistory`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(query)
}

function getHistoryHandler() {
    let response = this.response;
    let message = document.getElementById("myHistory");
    console.log(response["message"][0]["username"])
    let content = "<table id='history'>";
   
    content += "<tr> <th>Username</th> <th>Game ID</th> <th>win or lose</th> <th>formula</th> </tr>"
    for (let j = 0; j < response["message"].length; j++) {
        let currentRow = response["message"][j];
        content += "<tr>";
        content += "<td>" + currentRow["username"] + "</td>";
        content += "<td>" + currentRow["gameID"] + "</td>";
        content += "<td>" + currentRow["win"] + "</td>";
        content += "<td>" + currentRow["formula"] + "</td>";
        content += "</tr>";
        
    }   
    content += "</table>"
    message.innerHTML = content;
    if (response["message"] == "server error") {
        
    }
}