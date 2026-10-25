//getting the username and password
const username = document.getElementById("login-username");
const password = document.getElementById("login-password");
const submit = document.getElementById("submit-button");

//reading the json file
async function reading_file() {
    try{
        const response = await fetch("data/accounts.json");
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        return json;
    }
    catch(err){
        console.log("failed to read json: ",err);
    }
}

//looking at what the user had submited
submit.addEventListener("click", async() => {
    //checking if the code is being read
    // alert(`${username.value} (${password.value})`);

    //getting and checking if the code is being read
    const accounts = await reading_file();
    console.log(accounts);

    //checking if the username and passowrd are the same
    if(accounts){
        //checking if a matching account was found
        let isAccount = false;

        //checking each account
        for(const account of accounts){
            console.log("this is a new account", account);

            //checking if both the username and password are the same
            if(account.username === username.value && account.password === password.value){
                console.log("logged in", account);
                alert(`Welcome back ${account.username}!`);
                //saving the languages as text so they can be read on another page
                sessionStorage.setItem("language", JSON.stringify(account.languages));
                sessionStorage.setItem("repository", account.repositories);
                sessionStorage.setItem("username", account.username);
                isAccount = true;
                break;
            }
            else{
                console.log("something went wrong", account);
                isAccount = false;
            }
        }

        //if the account is not found, then just tell the user that there account was not found
        if(!isAccount){
            document.getElementById("login-note").innerHTML = "Something went wrong, please try again.";
        }
    }

});