//only getting the length
function getLength(function_called){
    return function_called.length;
}

//getting the length depending on what you asked for
function lengthOfLOrR(type){
    //main vars
    let list = [];

    //checking which is being called
    if(type.toLowerCase() === "l"){
        list = gettingLangauges();
    }
    else if(type.toLowerCase() === "r"){
        list = gettingRepo();
    }
    console.log(list);
    return getLength(list);
}