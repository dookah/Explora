"use strict";

document.addEventListener("deviceready", yourCallbackFunction, false);

function yourCallbackFunction(){
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
};

function alertDismissed() {
};