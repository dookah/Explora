document.addEventListener("deviceready", setup, false);

function setup(){
    navigator.notification.alert('Winner', alertDismissed, 'Game Over', 'Done');
}