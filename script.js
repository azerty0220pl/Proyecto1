const toggler = document.querySelector('button');
const navBar = document.querySelector(".navBar");
const menu = document.querySelector(".mobile-toggle");
const buttons = document.querySelectorAll(".nav-btn");
const scroll = document.querySelector(".scroll");
const scrollTop = document.querySelector(".scroll-top");

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
});


scrollTop.addEventListener('click', () => {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200)
});