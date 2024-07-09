const form = document.querySelector('form');

const formSubmission = () => {
    event.preventDefault();

    const payRate = document.getElementById('payRate').value;
    const userCompany = document.getElementById('company').value;

    if (!payRate){
        window.alert('missing Payrate Input!');
        return;
    }else if (!userCompany){
        window.alert('missing Company Input!');
    }else{
        const payInfo = {
            payrate,
            company,
            workhour: 0
        };

        //store the user information in local storage
        const existingData = localStorage.getItem('payInfo')
        existingData.push(payInfo)
        localStorage.setItem('payInfo',JSON.stringify('payInfo'));
    }
}