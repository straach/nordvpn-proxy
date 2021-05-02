document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentCountry();
    initSubmitListener();
}, false);

function fetchCurrentCountry() {
    const select = document.getElementById("country");
    var request = new XMLHttpRequest();
    request.open('GET', '/countries', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            select.value = this.response;
        } else {
            // error
        }
    };
    request.onerror = function () {
        // conn error
    };
    request.send();
}

function initSubmitListener() {
    const countryForm = document.getElementById("country-form");
    countryForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendCountry();
        startWaitForReset();
    });
}

function sendCountry() {
    var request = new XMLHttpRequest();
    request.open('POST', '/countries', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    var country = document.getElementById("country").value;
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var jsonData = JSON.parse(request.response);
            console.log(jsonData);
        } else {
            console.error(request.response);
        }
    };
    request.send(JSON.stringify({ country }));
}

function startWaitForReset() {
    const content = document.getElementById("content");
    content.classList.add('blurred');
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.add('show');
    modal.classList.add('breathing-animation');
    let timeoutCount = 3;
    const intervalId = setInterval(function () {
        checkBackendIsUp(function () {
            clearInterval(intervalId);
            modal.classList.remove('show');
            content.classList.remove('blurred');
        }, function () {
            timeoutCount--;
            if (timeoutCount <= 0) {
                modal.classList.add('error');
                modal.classList.remove('breathing-animation');
                modal.children[0].textContent = "Error";
                clearInterval(intervalId);
            }
        });

    }, 5000);
}


function checkBackendIsUp(callback, failed) {
    const select = document.getElementById("country");
    var request = new XMLHttpRequest();
    request.open('GET', '/isup', true);
    request.timeout = 2000;
    request.ontimeout = function (e) {
        failed();
    };
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            callback();
        } else {
            failed();
        }
    };
    request.onerror = function () {
        failed();
    };
    request.send();
}



