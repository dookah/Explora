$("#messageButton").bind('tap', function () {
    displayToast('Saved!', 'Message added to map.', '#Map');
})

function displayToast(title, message, redirect) {
    iziToast.success({
        title: title,
        message: message,
        timeout: 1650,
        onClosed: function (instance, toast, closedBy) {
            $.mobile.pageContainer.pagecontainer("change", redirect);
        }
    });
}

//Called on click of marker information
//Gets the data and adds to archive
function saveMarker() {
    //How to access the marker content through the DOM 
    //this.document.activeElement.innerText;
    //Split the accessed text into an array
    // [0] = Title, [1] = Message
    var SplitMarker = this.document.activeElement.innerText.split('\n\n');

    //Get local storage messages
    var savedMessages = localStorage.getItem("savedMessages");
    //Parse them into a string
    var savedMessages = JSON.parse(savedMessages);

    //If no saved messages
    if (savedMessages == null) {
        //Create an array to hold messages
        savedMessages = [];
        //Push new Object into created array
        savedMessages.push({
            title: SplitMarker[0],
            message: SplitMarker[1]
        })
        //Push strinfiied object array into local storage
        localStorage.setItem("savedMessages", JSON.stringify(savedMessages));
    } else {
        //If we areadt have local storage 
        //Push new message into array
        savedMessages.push({
            title: SplitMarker[0],
            message: SplitMarker[1]
        })
        //Parse to string and save to local storage again
        localStorage.setItem("savedMessages", JSON.stringify(savedMessages));
    }
    //Update the archive cards with the new message
    cardFactory(SplitMarker[0], SplitMarker[1]);

    //Tell user that their marker has been saved
    displayToast('Saved!', 'Message added to archive.', '#Archive');
}


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