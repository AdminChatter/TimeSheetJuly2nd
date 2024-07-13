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
    const calculatePayroll = (hoursWorked, payRate) => {
        const totalIncome = hoursWorked * payRate;
        const hoursWorkedElement = document.getElementById('hoursWorkedValue');
        const payRateElement = document.getElementById('payRateValue');
        const totalIncomeElement = document.getElementById('totalIncomeValue');
        document.getElementById('hoursWorked').textContent = hoursWorked.toFixed(2);
        document.getElementById('payRate').textContent = payRate.toFixed(2);
        document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    };

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
            // Assuming hoursWorked is obtained from another source (timecard.js)
            const hoursWorked = 40; // Placeholder value, replace with actual value
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
            console.log("in if")
            // Assuming hoursWorked is obtained from another source (timecard.js)
            const hoursWorked = 40; // Placeholder value, replace with actual value
            const payRate = parseFloat(companyInfo.payrate);
            calculatePayroll(hoursWorked, payRate);
        }
    }

    initial();
    });
