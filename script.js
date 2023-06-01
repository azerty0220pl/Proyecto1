//menu
const toggler = document.querySelector('button');
const navBar = document.querySelector(".navBar");
const menu = document.querySelector(".mobile-toggle");
const buttons = document.querySelectorAll(".nav-btn");

//scrolling
const scroll = document.querySelector(".scroll");
const scrollTop = document.querySelector(".scroll-top");

//contact form
const form = document.querySelector("#contact-form");

//popup
const popup = document.querySelector(".popup-wrapper");
const popupForm = document.querySelector("#popup-form");
const closePopup = document.querySelector(".close");

//currencies
const eurBtn = document.querySelector("#eur");
const usdBtn = document.querySelector("#usd");
const gbpBtn = document.querySelector("#gbp");
const plnBtn = document.querySelector("#pln");
const priceElem = [document.querySelector(".price-1"), document.querySelector(".price-2"), document.querySelector(".price-3")];
const prices = [0, 25, 60];

//menu mobile toggler
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

//menu highlight last clicked
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

//scroll bar on top & enable popup
document.addEventListener("scroll", () => {
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    let percentege = Math.round(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight) * 100);
    scroll.style.width = percentege + "%";

    if (percentege >= 25 && localStorage.getItem("popup") != "dont") {
        popup.style.display = "block";
        localStorage.setItem("popup", "dont");
    }
});

//scroll to top
scrollTop.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
});

//contact form
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
            popup.style.display = "none";
        });
    }
    else
        event.target.email.style.borderColor = "red";
}, true);

//currencies
eurBtn.addEventListener("click", () => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/eur.min.json").then(res => {
        res.json().then(data => {
            let x = data.eur;

            for (let i = 0; i < prices.length; i++)
                priceElem[i].innerText = "€" + (Math.round((prices[i] * x + Number.EPSILON) * 100) / 100);
        });
    });
});

usdBtn.addEventListener("click", () => {
    for (let i = 0; i < prices.length; i++) {
        priceElem[i].innerText = "$" + prices[i];
    }
});

gbpBtn.addEventListener("click", () => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/gbp.min.json").then(res => {
        res.json().then(data => {
            let x = data.gbp;

            for (let i = 0; i < prices.length; i++)
                priceElem[i].innerText = "£" + (Math.round((prices[i] * x + Number.EPSILON) * 100) / 100);
        });
    });
});

plnBtn.addEventListener("click", () => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pln.min.json").then(res => {
        res.json().then(data => {
            let x = data.pln;

            for (let i = 0; i < prices.length; i++)
                priceElem[i].innerText = (Math.round((prices[i] * x + Number.EPSILON) * 100) / 100) + " zł";
        });
    });
});

//Slider

class Slider {
    constructor(id) {
        this.id = document.querySelector("#" + id);
        this.elems = Array.from(this.id.parentNode.children);
        this.cur = this.elems.indexOf(this.id);
        this.id.style.display = "inline-block";
    }

    async next() {
        let x = this.cur;
        this.cur = this.cur == this.elems.length - 1 ? 0 : this.cur + 1;

        if(this.cur == 0) {
            this.elems[x].style.left = "-100%";
            this.elems[this.cur].style.zIndex = "10";
        }
        
        this.elems[this.cur].style.left = this.cur == 0 ? "100%" : "0";
        this.elems[this.cur].style.display = "inline-block";
        this.elems[this.cur].style.transition = "0.1s";

        setTimeout(() => {
            console.log("move");
            this.elems[this.cur].style.left = this.cur == 0 ? "0" : "-100%";
        }, 10);

        setTimeout(() => {
            console.log("hide");
            this.elems[x].style.display = "none";
            this.elems[this.cur].style.left = "0";
            this.elems[this.cur].style.transition = "none";
            this.elems[this.cur].style.zIndex = "0";
        }, 125);
    }

    async prev() {
        let x = this.cur;
        this.cur = this.cur == 0 ? this.elems.length - 1 : this.cur - 1;

        this.elems[this.cur].style.zIndex = "10";
        this.elems[this.cur].style.left = this.cur == this.elems.length - 1 ? "-200%" : "-100%";
        this.elems[x].style.left = this.cur == this.elems.length - 1 ? "0" : "-100%";
        this.elems[this.cur].style.display = "inline-block";
        this.elems[this.cur].style.transition = "0.1s";

        setTimeout(() => {
            console.log("move");
            this.elems[this.cur].style.left = this.cur == this.elems.length - 1 ? "-100%" : "0";
        }, 10);

        setTimeout(() => {
            console.log("hide");
            this.elems[x].style.display = "none";
            this.elems[this.cur].style.left = "0";
            this.elems[this.cur].style.transition = "none";
            this.elems[this.cur].style.zIndex = "0";
        }, 125);
    }
}

const slider = new Slider("img-4");
//setTimeout(() => {slider.next()}, 6000);
//setTimeout(() => {console.log("hello")}, 3000);
//setTimeout(() => {slider.next()}, 8000);