const toggler = document.querySelector('button');
const navBar = document.querySelector(".navBar");
const mobileMenu = document.querySelector(".mobile-toggle");
const buttons = document.querySelectorAll(".nav-btn");

const menu = () => {
    //menu mobile toggler
    toggler.addEventListener('click', () => {
        if (toggler.classList.contains("fa-bars")) {
            toggler.classList.add("fa-xmark");
            toggler.classList.remove("fa-bars");
            mobileMenu.classList.remove("invisible");
        } else {
            toggler.classList.add("fa-bars");
            toggler.classList.remove("fa-xmark");
            mobileMenu.classList.add("invisible");
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
            mobileMenu.classList.add("invisible");
        })
    });
}

export default menu;