const form = document.querySelector("#contact-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let checks = 0;
    let name = event.target.name.value;
    let email = event.target.email.value;
    let consent = event.target.consent.checked;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (name.length < 2 || name.length > 100)
        event.target.name.style.borderColor = "red";
    else {
        event.target.name.style.borderColor = "grey";
        checks++;
    }

    if (emailRegex.test(email)) {
        event.target.email.style.borderColor = "grey";
        checks++;
    }
    else
        event.target.email.style.borderColor = "red";

    if (!consent)
        event.target.consent.style.outline = "1px solid red";
    else {
        event.target.consent.style.outline = "none";
        checks++;
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
            event.target.name.value = '';
            event.target.email.value = '';
            event.target.consent.checked = false;
        });
    }
}, true);