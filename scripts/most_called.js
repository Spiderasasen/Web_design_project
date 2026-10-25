//getting the most used language from the logged in account
function gettingHighestLanguage() {
    try{
        const session = sessionStorage.getItem("language");

        //checking if the account has saved languages
        if(!sessionStorage.getItem("username") || !session){
            return "No language data";
        }

        //changing the saved text back into an array
        const languages = JSON.parse(session);
        if(!Array.isArray(languages)){
            return "No language data";
        }

        let highestLanguage = "No language data";
        let highestAmount = -1;

        //checking each language and keeping the one with the highest amount
        for(const languageGroup of languages){
            if(!languageGroup || typeof languageGroup !== "object"){
                continue;
            }

            for(const language of Object.keys(languageGroup)){
                const amount = languageGroup[language];

                if(typeof amount === "number" && amount > highestAmount){
                    highestAmount = amount;
                    highestLanguage = language;
                }
            }
        }

        console.log("most used language: ", highestLanguage);
        return highestLanguage;
    }
    catch(err){
        console.log("failed to read the most used language: ", err);
        return "No language data";
    }
}
