//Replacement for alert() function
function showAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    $('#alertModal').modal('show');
}
