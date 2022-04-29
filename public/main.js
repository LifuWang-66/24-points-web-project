let username = "";
function fetchUsername() {
    username = window.localStorage["username"];
    console.log(username);
}
let card1num, card2num, card3num, card4num;
let solutions = [];
document.getElementById("noSolution").addEventListener("click", function() {
    window.localStorage.setItem("solutions", solutions);
    if (solutions.length > 0) {
        window.location.replace("lose.html");
    } else {
        window.location.replace("win.html");
    }
})


function generateCard() {
	let card1 = document.getElementById("card1");
    let card2 = document.getElementById("card2");
    let card3 = document.getElementById("card3");
    let card4 = document.getElementById("card4");
    card1num = getRandomInt(13);
    card2num = getRandomInt(13);
    card3num = getRandomInt(13);
    card4num = getRandomInt(13);
    card1suit = getRandomInt(4);
    card2suit = getRandomInt(4);
    card3suit = getRandomInt(4);
    card4suit = getRandomInt(4);
    card1.src = getCardStr(card1suit, card1num);
    card2.src = getCardStr(card2suit, card2num);
    card3.src = getCardStr(card3suit, card3num);
    card4.src = getCardStr(card4suit, card4num);
    card1.alt = getCardStr(card1suit, card1num);
    card2.alt = getCardStr(card2suit, card2num);
    card3.alt = getCardStr(card3suit, card3num);
    card4.alt = getCardStr(card4suit, card4num);
    fetchFormula();
    fetchUsername();
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", generateCard);

function getCardStr(suitnum, ranknum) {
    let suit = "";
    let rank="";
    if (suitnum == 1) {
        suit ="_of_diamonds.png";
    } else if (suitnum == 2) {
        suit = "_of_clubs.png";
    } else if (suitnum ==3 ) {
        suit = "_of_hearts.png";
    } else {
        suit = "_of_spades.png";
    }
    if (ranknum == 1) {
        rank = "ace";
    } else if (ranknum == 11) {
        rank = "jack";
    } else if (ranknum == 12) {
        rank = "queen";
    } else if (ranknum == 13) {
        rank = "king";
    } else {
        rank = "" + ranknum;
    }

    return "cards/" + rank + suit;
}

function fetchFormula() {
    // TODO: Modify to use XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", formulaReceivedHandler);
    queryString = "https://helloacm.com/api/24/" + "?a=" + card1num + "&b=" + card2num
         + "&c=" + card3num + "&d=" + card4num;
    xhr.responseType = "json";
    xhr.open("GET", queryString);
    xhr.send();
 }
 
 // TODO: Add responseReceivedHandler() here
 function formulaReceivedHandler() {
    let response = this.response;
    if (response["errorCode"] == "0") {
        if (response["result"].length > 0) {
            answer = response["result"]
            message = document.getElementById("message");
            message.innerHTML = answer;
            console.log(message);
        } else {
            message = document.getElementById("message");
            message.innerHTML = "No solutions.";
        }
        solutions = response["result"];
    } else {
        message = document.getElementById("message");
        message.innerHTML = "Server error";
    }
 }

 let checkAnswerButton = document.getElementById("checkAnswer");

 function checkAnswer(event){
    event.preventDefault();
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load",  answerCheckReceivedHandler)
    let formula = document.getElementById("firstFormula");
    let result = Function(`return ${formula.value}`)();
    let inputlist = getNumber(formula.value);
    cardlist = []
    cardlist.push(card1num);
    cardlist.push(card2num);
    cardlist.push(card3num);
    cardlist.push(card4num);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (cardlist[j] == inputlist[i]) {
                cardlist.splice(j, 1);
                break;
            }
        }
    }
    if (cardlist.length > 0) {
        message = document.getElementById("message");
        message.innerHTML = "Input does not match cards";
        return;
    }
    query= `username=${username}&result=${result}&formula=${formula.value}`
    
    url = `/checkAnswer`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send(query)
}

function answerCheckReceivedHandler(){
    window.localStorage.setItem("solutions", solutions);
    if (this.response.success){    
        window.location.replace("win.html");
    }else{
        window.location.replace("lose.html");
    }
}

function getNumber(str) {
    result = []
    temp = ""
    for (let c of str) {
        if (c == " ") {
            continue
        }
        if (isNaN(c) && temp != "") {
            result.push(parseInt(temp))
            temp = ""
        } else if (isNaN(c)) {
            temp = ""
            continue
        }
        if (!isNaN(c)){
            temp += c;
        }
    }
    if (temp != "") {
        result.push(parseInt(temp))
    }
    return result
}

checkAnswerButton.addEventListener("click", checkAnswer);