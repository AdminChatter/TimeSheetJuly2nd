//This script is used to display alert messages in a modal instead of using the alert() function
const xCloseButton = document.getElementById('xButton');
const okCloseButton = document.getElementById('okButton');

//Replacement for alert() function
function showAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    $('#alertModal').modal('show');
}

//Event listeners for the close buttons on alert modal
xCloseButton.addEventListener('click', function(){
    $('#alertModal').modal('hide');
});
okCloseButton.addEventListener('click', function(){
    $('#alertModal').modal('hide');
});


