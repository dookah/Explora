//Factory to make Card on page
//INPUT : HEADING, MESSAGE
//OUTPUT : Card on archive page 
function cardFactory(heading, message) {
    //List out all possible card colour classes
    let randomCardColour = ["is-primary", "is-link", "is-info", "is-success", "is-warning"];
    let randomCardPhrase = ["A message left by a wild wilderbeast", "A message left by a wild explorer", "A message left by a roaming roomba", "A message left by a slippery snake"]
    //Pick random floored number between 0 and length of card colours
    let randomCardColourNumber = Math.floor(Math.random() * randomCardColour.length);
    let randomCardPhraseNumber = Math.floor(Math.random() * randomCardPhrase.length);


    //HTML to append with information inside 
    //Using ES6 Template literal strings 
    let htmlToAppend = `<div class="tile is-parent"><article class="tile is-child notification ${randomCardColour[randomCardColourNumber]}"><button class="delete is-medium"></button><p class="title">${heading}</p><p class="subtitle">${randomCardPhrase[randomCardPhraseNumber]}</p><div class="content"><p>${message}</p></div></article></div>`


    //Use JQuerys append to add html to the page
    $("#tileContainer").append(htmlToAppend);
}

//Code runs when archive page is shown
//Re-renders all saved messages from local storage
$(document).delegate('#Archive', 'pageshow', function () {
    //Clear the page on load
    $('#tileContainer').empty();

    //Load all the archive items
    savedMessages = localStorage.getItem("savedMessages");
    //Convert from string to array of JSON objects
    savedMessages = JSON.parse(savedMessages);

    //Ensure saved messages exists and has an item in it
    if (savedMessages != null && savedMessages.length >= 1) {
        //Loop through messages
        for (var i = 0; i < savedMessages.length; i++) {
            //take each message and send it to card factory to make archive cards
            cardFactory(savedMessages[i].title, savedMessages[i].message);
        }
    } else {
        $('#tileContainer').append('<span class="tag is-large is-danger"> No Saved Messages. </span>');
    }

    //Implementation for delete message
    //Get all the delete buttons
    deleteButtons = document.getElementsByClassName("delete");
    //Get all the message cards
    messageCards = document.getElementsByClassName("tile");
    //Loop through each delete button using let to bind each instance
    for (let i = 0; i < deleteButtons.length; i++) {
        //Add event listener to listen to click of delete button
        deleteButtons[i].addEventListener("click", function () {
            savedMessages.splice(i, 1);
            savedMessages = JSON.stringify(savedMessages);
            localStorage.setItem("savedMessages", savedMessages);
            iziToast.warning({
                title: "Deleted!",
                message: "Message successfully deleted.",
                timeout: 1250,
                onClosing: function (instance, toast, closedBy) {
                    $.mobile.pageContainer.pagecontainer("change", '#Map');
                }
            });
        });
    }

});