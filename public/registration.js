let registerButton = document.getElementById("register")
let username = document.getElementById("username")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm_password");
let passwordValid = false;
password.addEventListener("input", checkScreenName);
function checkScreenName(event) {
    passwordValid = false;
    
    // check if the input is correct
    password.style.setProperty("background-color", "OrangeRed");
    document.getElementById("passwordWarning").innerText = "password length must be greater than 5."
    if (password.value.length > 0 && password.value.length > 5) {
        password.style.setProperty("background-color", "white");
        document.getElementById("passwordWarning").innerText = "Password:"
        passwordValid = true;
    } 
    console.log(screenNameValid);
}

function register(event){
    event.preventDefault()
    if (password.value === confirmPassword.value && passwordValid){
        let xhr = new XMLHttpRequest
        xhr.addEventListener("load", responseHandler)
        query=`username=${username.value}&password=${password.value}`
        // when submitting a GET request, the query string is appended to URL
        // but in a POST request, do not attach the query string to the url
        // instead pass it as a parameter in xhr.send()
        url = `/register`
        xhr.responseType = "json";   
        xhr.open("POST", url)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        // notice the query string is passed as a parameter in xhr.send()
        // this is to prevent the data from being easily sniffed
        xhr.send(query)
    }
    else{
        message.style.display = "block"
        message.innerText = "passwords don't match"
    }
    
}

function responseHandler(){
    let message = document.getElementById("message")
    message.style.display = "block"
    if (this.response.success){    
        message.innerText = this.response.message
    }else{
        console.log(this.response.success)
        message.innerText = this.response.message
    }
}
console.log(username)
registerButton.addEventListener("click", register)