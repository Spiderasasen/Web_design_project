//getting the username and password
const username = document.getElementById("login-username");
const password = document.getElementById("login-password");
const submit = document.getElementById("submit-button");

//reading the json file
async function reading_file() {
    try{
        const response = await fetch("../data/accounts.json");
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

submit.addEventListener("click", () => {
    //checking if the code is being read
    // alert(`${username.value} (${password.value})`);
    const file = reading_file();
    alert(file)
});