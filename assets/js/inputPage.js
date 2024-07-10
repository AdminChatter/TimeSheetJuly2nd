const form = document.querySelector('form');

//Check the validation of the input
const validInput = (payrate, company) => {
    if (!payrate){
        window.alert('Missing Payrate Input!');
        return false;
    }else if (!company){
        window.alert('Missing Company Input!');
        return false;
    }else if (typeof payrate !== "number"){
        window.alert('The payrate need to be an number.');
        return false;
    } else {
        return true;
    }
}

//Handles the form submission. Grab the form data and store it in local storage
const formSubmission = (event) => {
    event.preventDefault();

    const payRate = document.getElementById('payRate').value;
    const userCompany = document.getElementById('companyName').value;

    if (validInput(payRate, userCompany)) {
        const payInfo = {
            payrate,
            company,
            workhour: 0,
        };
        //store the user information in local storage
        const existingData = JSON.parse(localStorage.getItem('payInfo'));
        existingData.push(payInfo);
        localStorage.setItem('payInfo',JSON.stringify('payInfo'));
    }
}

//Call the function to handle the form submission
form.addEventListener('submit', formSubmission)