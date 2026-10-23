//class element that is being used to check if the user did login
class AurthManager {
    //the class is here for if the user did logged in and is checking the session storage
    isUserLoggedIn(){
        return !!sessionStorage.getItem("username");
    }
}

const auth = new AurthManager();

function gettingUserInfo() {
    if(auth.isUserLoggedIn()){
        console.log("logged in");
        return sessionStorage.getItem("username");
    }
    else{
        console.log("No login detected");
        return "guest_account";
    }
}

function firstLetter(){
    //checking if the user logedin
    let username = gettingUserInfo();
    console.log(username);

    //making the username only have the first letter
    username = username.toUpperCase();
    console.log(username);

    username = username[0];
    console.log(username);

    return username;
}

function changing_header_logo(){
    const logo = document.getElementById("avatar");
    console.log(logo.textContent);

    logo.textContent = firstLetter();
}