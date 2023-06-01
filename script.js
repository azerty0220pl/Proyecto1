const toggler = document.querySelector('button');
const navBar = document.querySelector(".navBar");
const menu = document.querySelector(".mobile-toggle");
const buttons = document.querySelectorAll(".nav-btn");
const scroll = document.querySelector(".scroll");
const scrollTop = document.querySelector(".scroll-top");
const form = document.querySelector("#contact-form");
const popup = document.querySelector(".popup-wrapper");
const popupForm = document.querySelector("#popup-form");
const closePopup = document.querySelector(".close");

toggler.addEventListener('click', () => {
    if (toggler.classList.contains("fa-bars")) {
        toggler.classList.add("fa-xmark");
        toggler.classList.remove("fa-bars");
        menu.classList.remove("invisible");
    } else {
        toggler.classList.add("fa-bars");
        toggler.classList.remove("fa-xmark");
        menu.classList.add("invisible");
    }
});

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => {
            b.classList.remove("text--state-selected");
        })
        btn.classList.add("text--state-selected");
        toggler.classList.add("fa-bars");
        toggler.classList.remove("fa-xmark");
        menu.classList.add("invisible");
    })
});

document.addEventListener("scroll", () => {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    let percentege = Math.round(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight) * 100);
    scroll.style.width = percentege + "%";

    if (percentege >= 25 && localStorage.getItem("popup") != "dont") {
        popup.style.display = "block";
        localStorage.setItem("popup", "dont");
    }
});


scrollTop.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
});

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
        }).then((response) => {
            event.target.name.value = '';
            event.target.email.value = '';
            event.target.consent.checked = false;
        });
    }
}, true);

setTimeout(() => {
    if (localStorage.getItem("popup") != "d ont") {
        popup.style.display = "block";
        localStorage.setItem("popup", "dont");
    }
}, 5000);

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