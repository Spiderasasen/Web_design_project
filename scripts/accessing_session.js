//class element that is being used to check if the user did login
class AurthManager {
    //the class is here for if the user did logged in and is checking the session storage
    isUserLoggedIn(){
        return !!sessionStorage.getItem("username");
    }
    userLangauges(){
        if(this.isUserLoggedIn()){
            try{
                //changing the saved text back into the language array
                const savedLanguages = sessionStorage.getItem("language");
                const languages = JSON.parse(savedLanguages);

                if(Array.isArray(languages) && languages.length > 0){
                    //getting the names from the first object, not the percentages
                    return Object.keys(languages[0]);
                }
            }
            catch(err){
                console.log("failed to read languages, please log in again: ", err);
            }
            return [];
        }
        else{
            return ["TypeScript", "Python", "HTML", "Javascript"];
        }
    }
    userRepository(){
        if(!!sessionStorage.getItem("repository")){
            const savedRepositories = sessionStorage.getItem("repository");
            const repo = JSON.parse(savedRepositories);
            console.log(repo);
            return repo;

        }
        else{
            return ["Web_design_project", "Robotics_with_python", "Testing_library", "Algorithm_notes"]
        }
    }
}

const auth = new AurthManager();

//getting the username
function gettingUserInfo() {
    if(auth.isUserLoggedIn()){
        console.log("logged in");
        document.getElementById("login-button").textContent = "Log Out";
        return sessionStorage.getItem("username");
    }
    else{
        console.log("No login detected");
        return "guest_account";
    }
}

//getting the langauges
function gettingLangauges(){
    const langauge = auth.userLangauges();
    console.log(langauge);
    return langauge;
}

//getting the repositories
function gettingRepo(){
    const repo = auth.userRepository();
    console.log(repo);
    return repo;
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

//if the user clicks log out, it just removes the session account
function logging_out(){
    const logoutButton = document.getElementById("login-button");

    logoutButton.addEventListener("click", () => {
        console.log("logging out");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("language");
        sessionStorage.removeItem("repository");


        logoutButton.textContent = "Login"
    });
}