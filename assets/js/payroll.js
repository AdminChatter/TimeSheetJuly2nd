document.addEventListener("DOMContentLoaded", () => {
    const selectList = document.getElementById("companyList");
    let currentCompany = "";

    // Function to populate the company select list
    const selectListValue = () => {
        const payInfo = JSON.parse(localStorage.getItem("payInfo")) || [];

        if (payInfo.length === 0) {
            const option = document.createElement("option");
            option.textContent = "No companies available";
            selectList.appendChild(option);
        } else {
            const uniqueCompanyNames = [
                ...new Set(payInfo.map((info) => info.company)),
            ];
            console.log(uniqueCompanyNames);
            uniqueCompanyNames.forEach((company) => {
                const option = document.createElement("option");
                option.textContent = company;
                option.value = company;
                selectList.appendChild(option);
            });
        }
    };

    // Function to calculate and display payroll information
    const calculatePayroll = (hoursWorked, payRate) => {
        const totalIncome = hoursWorked * payRate;
        document.getElementById("hoursWorked").textContent = hoursWorked.toFixed(2);
        document.getElementById("payRate").textContent = payRate.toFixed(2);
        document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    };

    // Initialize the select list with companies
    selectListValue();

    // Event listener for the select list change
    selectList.addEventListener("change", function (event) {
        currentCompany = selectList.value;
        const userInfo = JSON.parse(localStorage.getItem("payInfo")) || [];
        const companyData = userInfo.find(
            (info) => info.company === currentCompany
        );

        if (companyData) {
            calculatePayroll(companyData.workhour, companyData.payrate);
        }
    });
});
