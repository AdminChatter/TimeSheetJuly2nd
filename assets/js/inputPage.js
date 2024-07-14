const form = document.querySelector('form');
const payInput = document.getElementById('payRate');
const companyInput = document.getElementById('companyName');

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

//Check if the company already exists. If it does, check if the payrate is the same. If yes, update the payrate
const companyExist = (payInfo) => {
    let existingData = localStorage.getItem('payInfo');
    if (!existingData){
        window.alert(`Company ${payInfo.company} has been added`);
        return false;
    }else{
        existingData = JSON.parse(existingData);
        for (let i = 0; i < existingData.length; i++) {
            if (existingData[i].company === payInfo.company && existingData[i].payrate === payInfo.payrate){
                window.alert(`The company already exist.`);
                return true;
            }else if (existingData[i].company === payInfo.company && existingData[i].payrate !== payInfo.payrate){
                window.alert(`The payrate for this company has been updated`);
                existingData[i].payrate = payInfo.payrate;
                localStorage.setItem('payInfo',JSON.stringify(existingData));
                return true;
            }
        }
        window.alert(`Company ${payInfo.company} has been added`);
        return false
    }
}

//Store the valid input value into localstorage
const storeInput = (payInfo) => {
    let existingData = localStorage.getItem('payInfo');
    if (existingData){
        existingData = JSON.parse(existingData);
        existingData.push(payInfo);
        localStorage.setItem('payInfo',JSON.stringify(existingData));
    }else {
        localStorage.setItem('payInfo',JSON.stringify([payInfo]));
    }
}

//Handles the form submission. Grab the form data and store it in local storage
const formSubmission = (event) => {
    event.preventDefault();
    const payrate = document.getElementById('payRate').value;
    const company = document.getElementById('companyName').value;
    if (validInput(payrate, company)) {
        payInput.value = "";
        companyInput.value = "";
        const payInfo = {
            payrate,
            company,
            workhour: 0,
        };
        //store the user information in local storage
        if (!companyExist(payInfo)){
            storeInput(payInfo);
        }
    }
}

//Call the function to handle the form submission
form.addEventListener('submit', formSubmission)