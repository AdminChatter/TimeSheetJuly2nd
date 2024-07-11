const form = document.querySelector('form');

//Check the validation of the input
const validInput = (payrate, company) => {
    if (!payrate){
        window.alert('Missing Payrate Input!');
        return false;
    }else if (!company){
        window.alert('Missing Company Input!');
        return false;
    }else if (isNaN(Number(payrate))){
        window.alert('The payrate need to be an number.');
        return false;
    } else {
        return true;
    }
}

//Handles the form submission. Grab the form data and store it in local storage
const formSubmission = (event) => {
    event.preventDefault();

    const payrate = document.getElementById('payRate').value;
    const company = document.getElementById('companyName').value;

    if (validInput(payrate, company)) {
        console.log('in if')
        const payInfo = {
            payrate,
            company,
            workhour: 0,
        };
        //store the user information in local storage
        let existingData = localStorage.getItem('payInfo');
        if (existingData){
            existingData = JSON.parse(existingData);
            existingData.push(payInfo);
            localStorage.setItem('payInfo',JSON.stringify(existingData));
        }else {
            localStorage.setItem('payInfo',JSON.stringify([payInfo]));
        }
    }
}

//Call the function to handle the form submission
form.addEventListener('submit', formSubmission)