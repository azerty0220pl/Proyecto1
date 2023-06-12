const form = document.querySelector("#contact-form");
const error1 = document.querySelector('.error-1');
const error2 = document.querySelector('.error-2');
const error3 = document.querySelector('.error-3');
const message = document.querySelector('#form-message');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let checks = 0;
    let name = event.target.name.value;
    let email = event.target.email.value;
    let consent = event.target.consent.checked;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (name.length < 2 || name.length > 100){
        event.target.name.style.borderColor = "red";
        error1.innerText = "Name should be between 2 and 100 characters long";
    }
    else {
        event.target.name.style.borderColor = "grey";
        checks++;
        error1.innerText = "";
    }

    if (emailRegex.test(email)) {
        event.target.email.style.borderColor = "grey";
        checks++;
        error2.innerText = "";
    }
    else{
        event.target.email.style.borderColor = "red";
        error2.innerText = "Invalid email";
    }

    if (!consent){
        event.target.consent.style.outline = "1px solid red";
        error3.innerText = "You need to give us consent to process your personal data";
    }
    else {
        event.target.consent.style.outline = "none";
        checks++;
        error3.innerText = "";
    }

    if (checks == 3) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                body: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(() => {
            message.innerText = "Thank you for trusting our service, " + event.target.name.value + ".\nWe will contact you as soon as we can.";
            event.target.name.value = '';
            event.target.email.value = '';
            event.target.consent.checked = false;
            form.classList.add("invisible");
            message.classList.remove('invisible');
        });
    }
}, true);