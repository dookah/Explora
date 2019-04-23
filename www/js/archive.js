cardFactory("I hate this city", "I want to die");
//Factory to make Card on page
//INPUT : HEADING, MESSAGE
//OUTPUT : Card on archive page 
function cardFactory(heading, message){
    //List out all possible card colour classes
    let randomCardColour = ["is-primary","is-link","is-info","is-success","is-warning"];
    let randomCardPhrase = ["A message left by a wild wilderbeast", "A message left by a wild explorer", "A message left by a roaming roomba", "A message left by a slippery snake"]
    //Pick random floored number between 0 and length of card colours
    let randomCardColourNumber = Math.floor(Math.random() * randomCardColour.length);
    let randomCardPhraseNumber = Math.floor(Math.random() * randomCardPhrase.length);
    

    //HTML to append with information inside 
    //Using ES6 Template literal strings 
    let htmlToAppend = `<div class="tile is-parent"><article class="tile is-child notification ${randomCardColour[randomCardColourNumber]}"><button class="delete is-medium"></button><p class="title">${heading}</p><p class="subtitle">${randomCardPhrase[randomCardPhraseNumber]}</p><div class="content"><p>${message}</p></div></article></div>`


    //Use JQuerys append to add html to the page
    $( "#tileContainer" ).append(htmlToAppend);
}