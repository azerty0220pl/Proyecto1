const scroll = document.querySelector(".scroll");
const scrollTop = document.querySelector(".scroll-top");
const popup = document.querySelector(".popup-wrapper");

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