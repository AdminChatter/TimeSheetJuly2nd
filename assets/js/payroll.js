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
        console.log('in calculate')
        let income = hours * pay;
        console.log(income)
        hoursWorked.textContent = `Hours: ${hours}`;
        payRate.textContent = `Payrate: ${pay.toFixed(2)}`;
        totalIncome.textContent = `Total Income: ${income.toFixed(2)}`;
    }
    const getWorkedHours = (company) => {
        let hour = 0
        const existingData = JSON.parse(localStorage.getItem('payInfo'));
        for (let i = 0;  i < existingData.length; i++){
            if(existingData[i].company === company){
                hour = existingData[i]. workhour;
            }
            return hour;
        }}
    
    // Initialize the select list with companies
    selectListValue();

    // Event listener for the select list change
    selectList.addEventListener('change', (event) => {
        console.log("in change")
        const selectedCompany = event.target.value;
        console.log(selectedCompany)
        const payInfo = JSON.parse(localStorage.getItem('payInfo')) || [];
        const companyInfo = payInfo.find(info => info.company === selectedCompany);
        console.log(companyInfo)

        if (companyInfo) {
            const hoursWorked = getWorkedHours(selectedCompany); // Get total hours worked from local storage
            const payRate = parseFloat(companyInfo.payrate);
            calculatePayroll(hoursWorked, payRate);
        }
    });

    const initial = () => {
        let currentCompany = document.getElementById('companyList').value;
        console.log("in initial")
        const payInfo = JSON.parse(localStorage.getItem('payInfo')) || [];
        console.log(currentCompany)
        const companyInfo = payInfo.find((element) => element.company == currentCompany);
        console.log(companyInfo)

        if (companyInfo) {
            const hoursWorked = getWorkedHours(currentCompany); // Get total hours worked from local storage
            const payRate = parseFloat(companyInfo.payrate);
            calculatePayroll(hoursWorked, payRate);
        }
    }

    initial();
    });