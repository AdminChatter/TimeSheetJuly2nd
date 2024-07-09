const selectList = document.getElementById('companyList');
const toggle = document.getElementById('toggle');
const clockTimer = document.getElementById('timer');
const existingData = JSON.parse(localStorage.getItem(payinfo));
let currentCompany = '';
let timeStop = false;
let hr = 0, min = 0, sec = 0;

//Add value to the select list
const selectListValue = () => {
    const userInfo = JSON.parse(localStorage.getItem('payInfo'));

    if (!userInfo) {
        company.textContent = 'NONE';
    }else {
        userInfo.forEach(createOptionList);
    }
}

//Build the elements and append it to the select list
const createOptionList = (userInfo) => {
    const option = document.createElement('option');
    option.textContent = userInfo.company;
    option.value = userInfo.company;
    selectList.appendChild(option)
}

//Call the function to create the list
selectListValue();

//change event for the option list
selectList.addEventListener('change', function (event) {
    event.preventDefault();
    currentCompany = selectList.value;
});

//display the time and change the value
const timeChange = (hr,min,sec) => {
    if (sec === 60){
        if (min === 60){
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

//Clock In/Clock Out
toggle.addEventListener('click', function(event) {
    
    toggle.textContent = 'Clock Out';

    if (!currentCompany){
        window.alert('No Company Selected.\n Please go to input page to enter your company!')
    }else {
        const timeInterval = setInterval(() => {
            timeChange();
            
            if (timeStop) {
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

                for (let i = 0; i++; i <= existingData.length){
                    if(existingData[i].company === currentCompany){
                        existingData[i].workhour += hr;
                        window.localStorage.setItem(JSON.stringify(existingData))
                    }
                }

                //reset the textcontent for the page
                hr = 0, min = 0, sec = 0;
                clockTimer.textContent = `${hr} hours ${min} mins ${sec} secs`;
                toggle.textContent = 'Clock In';
            };
        }, 1000);
    }
})

