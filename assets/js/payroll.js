//this is the js file for the payroll page
document.addEventListener('DOMContentLoaded', () => {
    const hoursWorked = document.getElementById('hoursWorked');
    const payRate = document.getElementById('payRate');
    const totalIncome = document.getElementById('totalIncome');
    const selectList = document.getElementById('companyList');

    // Function to populate the company select list
    const selectListValue = () => {
        const payInfo = JSON.parse(localStorage.getItem('payInfo')) || [];
        
        if (payInfo.length === 0) {
            const option = document.createElement('option');
            option.textContent = 'No companies available';
            selectList.appendChild(option);
        } else {
            const uniqueCompanyNames = [...new Set(payInfo.map(info => info.company))];
            uniqueCompanyNames.forEach(company => {
                const option = document.createElement('option');
                option.textContent = company;
                option.value = company;
                selectList.appendChild(option);
            });
        }
    };

    // Function to calculate and display payroll information
    const calculatePayroll = (hours, pay) => {
        let income = hours * pay;
        hoursWorked.textContent = `Hours: ${hours}`;
        payRate.textContent = `Payrate: ${pay.toFixed(2)}`;
        totalIncome.textContent = `Total Income: ${income.toFixed(2)}`;
    }

    // Function to get the total hours worked for a company
    const getWorkedHours = (company) => {
        let hour = 0
        const existingData = JSON.parse(localStorage.getItem('payInfo'));
        for (let i = 0;  i < existingData.length; i++){
            if(existingData[i].company === company){
                hour = existingData[i]. workhour;
            }
            return hour;
        }
    }
    
    // Initialize the select list with companies
    selectListValue();

    // Event listener for the select list change
    selectList.addEventListener('change', (event) => {
        const selectedCompany = event.target.value;
        const payInfo = JSON.parse(localStorage.getItem('payInfo')) || [];
        const companyInfo = payInfo.find(info => info.company === selectedCompany);

        if (companyInfo) {
            const hoursWorked = getWorkedHours(selectedCompany); // Get total hours worked from local storage
            const payRate = parseFloat(companyInfo.payrate);
            calculatePayroll(hoursWorked, payRate);
        }
    });

    // Function that runs when the page loads
    const initial = () => {
        let currentCompany = document.getElementById('companyList').value;
        const payInfo = JSON.parse(localStorage.getItem('payInfo')) || [];
        const companyInfo = payInfo.find((element) => element.company == currentCompany);

        if (companyInfo) {
            const hoursWorked = getWorkedHours(currentCompany); 
            const payRate = parseFloat(companyInfo.payrate);
            calculatePayroll(hoursWorked, payRate);
        }
    }

    initial();
});