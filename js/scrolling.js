const scroll = document.querySelector(".scroll");
const scrollTop = document.querySelector(".scroll-top");
const popupElem = document.querySelector(".popup-wrapper");

const scrolling = () => {
    //scroll bar on top & enable popup
    document.addEventListener("scroll", () => {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        let percentege = Math.round(scrollPosition / (document.documentElement.scrollHeight - window.innerHeight) * 100);
        scroll.style.width = percentege + "%";
    
        if (percentege >= 25 && localStorage.getItem("popup") != "dont") {
            popupElem.style.display = "block";
            localStorage.setItem("popup", "dont");
        }
    
        if (percentege >= 10)
            scrollTop.style.display = "block";
        else
            scrollTop.style.display = "none";
    
    });
    
    //scroll to top
    scrollTop.addEventListener('click', () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    });
}

export default scrolling;