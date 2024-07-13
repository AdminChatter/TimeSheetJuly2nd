document.addEventListener('DOMContentLoaded', () => {
    const hoursWorkedDiv = document.getElementById('hoursWorked');
    const payRateDiv = document.getElementById('payRate');
    const totalIncomeDiv = document.getElementById('totalIncome');
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
    const calculatePayroll = (hoursWorked, payRate) => {
        const totalIncome = hoursWorked * payRate;
        document.getElementById('hoursWorked').textContent = hoursWorked.toFixed(2);
        document.getElementById('payRate').textContent = payRate.toFixed(2);
        document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    };

    // Initialize the select list with companies
    selectListValue();

    // Event listener for the select list change
    selectList.addEventListener('change', (event) => {
        const selectedCompany = event.target.value;
        const payInfo = JSON.parse(localStorage.getItem('payInfo')) || [];
        const companyInfo = payInfo.find(info => info.company === selectedCompany);

        if (companyInfo) {
            // Assuming hoursWorked is obtained from another source (timecard.js)
            const hoursWorked = 40; // Placeholder value, replace with actual value
            const payRate = parseFloat(companyInfo.payrate);
            calculatePayroll(hoursWorked, payRate);
        }
    });
    });