const selectList = document.getElementById('companyList');
const toggle = document.getElementById('toggle');
const clockTimer = document.getElementById('timer');
const existingData = JSON.parse(localStorage.getItem(payinfo));
let currentCompany = '';
let timeStop = true;
let hr = 0, min = 0, sec = 0;

//reset the textcontent for the page
const cleanPage = () => {
    hr = 0, min = 0, sec = 0;
    clockTimer.textContent = `${hr} hours ${min} mins ${sec} secs`;
    toggle.textContent = 'Clock In';
}

//Build the elements and append it to the select list
const createOptionList = (userInfo) => {
    const option = document.createElement('option');
    option.textContent = userInfo.company;
    option.value = userInfo.company;
    selectList.appendChild(option)
}

//Add value to the select list
const selectListValue = () => {
    const userInfo = JSON.parse(localStorage.getItem('payInfo'));

    if (!userInfo) {
        company.textContent = 'No Company Avaliable';
    }else {
        userInfo.forEach(createOptionList);
    }
}

//change event for the option list
selectList.addEventListener('change', function (event) {
    event.preventDefault();
    currentCompany = selectList.value;
});

//display the time and change the value
const timeChange = () => {
    if (sec === 60){
        if (min === 60){
            sec = 0
            min = 0;
            hr ++;
            clockTimer.textContent = `${hr} hours ${min} mins ${sec} secs`;
        }else{
            sec = 0;
            min ++;
            clockTimer.textContent = `${hr} hours ${min} mins ${sec} secs`;
        }
    }else{
        sec ++;
        clockTimer.textContent = `${hr} hours ${min} mins ${sec} secs`;
    }
}

//Convert time into hour
const convertHRS = () => {
    clearInterval(timeInterval);
    if (min <= 15 && min >= 5){
        hr += 0.25;
    } else if (min <= 30 && min > 15){
        hr += 0.5;
    } else if (min <= 45 && min > 30){
        hr =+ 0.75;
    } else if (min <= 60 && min > 45){
        hr =+ 1;
    }
}

//Update the working hour to specific company
const updateWorkHour = () => {
    convertHRS();
    for (let i = 0; i++; i <= existingData.length){
        if(existingData[i].company === currentCompany){
            existingData[i].workhour += hr;
                window.localStorage.setItem(JSON.stringify(existingData))
        }
    }
}

//Clock In/Clock Out
toggle.addEventListener('click', function() {
    if (toggle.textContent === 'Clock In'){
        timeStop = false
        if (currentCompany === 'No Company Avaliable'){
            window.alert('No company selected.\n Please go to input page to enter your company!')
            return;
        }else {
            toggle.textContent = 'Clock Out'
            const countStart = setInterval(() => {
                timeChange();
            }, 1000);
            if (timeStop) {
                clearInterval(countStart);
            };
        }
    }else {
        //Stop the time interval
        timeStop = true
        window.alert(`You worked ${hr} hours ${min} mins ${sec} secs. \n Good Job! Keep it up 💪`);

        updateWorkHour();
        cleanPage();
    }
})


const initial = () => {
    selectListValue();
    cleanPage();
}

//Call the function to create the content
initial();
