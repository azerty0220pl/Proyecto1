const popup = document.querySelector(".popup-wrapper");
const popupForm = document.querySelector("#popup-form");
const closePopup = document.querySelector(".close");
const error = document.querySelector(".popup-error");
const popupMessage = document.querySelector("#popup-message");
const popupRequest = document.querySelector("#popup-request");

//enable popup after 5s
setTimeout(() => {
    if (localStorage.getItem("popup") != "dont") {
        popup.style.display = "block";
        localStorage.setItem("popup", "dont");
    }
}, 5000);

//disable popup
document.addEventListener("click", event => {
    if (event.target == popup)
        popup.style.display = "none";
});

closePopup.addEventListener("click", () => { popup.style.display = "none"; });

document.onkeydown = (ev) => {
    ev = ev || window.event;
    if (ev.key == "Escape")
        popup.style.display = "none";
};

//popup form
popupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (emailRegex.test(email)) {
        event.target.email.style.borderColor = "grey";
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                body: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(() => {
            event.target.email.value = '';
            popupRequest.classList.add("invisible");
            popupMessage.classList.remove("invisible");
        });
    }
    else{
        event.target.email.style.borderColor = "red";
        error.innerText = "Invalid email."
    }
}, true);