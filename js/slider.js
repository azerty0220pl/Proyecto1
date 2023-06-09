class Slider {
    constructor(id) {
        let main = document.querySelector("#" + id);
        this.parent = main.parentNode;
        this.elems = Array.from(this.parent.children);
        this.cur = this.elems.indexOf(main);
        main.style.display = "inline-block";
        this.timer;
        this.setTimer();

        this.right = document.createElement("button");
        this.left = document.createElement("button");

        this.dotWrapper = document.createElement("div");

        this.btns = this.elems.map((b, i) => {
            b = document.createElement("button");
            b.classList.add("button", "button--slider-dot");
            b.addEventListener("click", () => {
                this.any(i);
            });

            if(this.cur == i)
                b.classList.add("button--slider-selected");

            this.dotWrapper.appendChild(b);
            return b;
        });

        this.right.classList.add("button", "button--slider-right", "fa-solid", "fa-arrow-right");
        this.left.classList.add("button", "button--slider-left", "fa-solid", "fa-arrow-left");
        this.dotWrapper.classList.add("dot-wrapper");

        this.right.addEventListener("click", () => {
            this.next();
        });

        this.left.addEventListener("click", () => {
            this.prev();
        });

        this.parent.appendChild(this.right);
        this.parent.appendChild(this.left);
        this.parent.appendChild(this.dotWrapper);
    }

    setTimer(){
        window.clearTimeout(this.timer);
        this.timer = setTimeout(() => { this.next() }, 4000);
    }

    next() {
        let x = this.cur;
        this.cur = this.cur == this.elems.length - 1 ? 0 : this.cur + 1;

        this.btns[x].classList.remove("button--slider-selected");
        this.btns[this.cur].classList.add("button--slider-selected");

        if (this.cur == 0) {
            this.elems[x].style.left = "-100%";
            this.elems[this.cur].style.zIndex = "10";
        }

        this.elems[this.cur].style.left = this.cur == 0 ? "100%" : "0";
        this.elems[this.cur].style.display = "inline-block";
        this.elems[this.cur].style.transition = "0.1s";

        setTimeout(() => {
            this.elems[this.cur].style.left = this.cur == 0 ? "0" : "-100%";
        }, 10);

        setTimeout(() => {
            this.elems[x].style.display = "none";
            this.elems[this.cur].style.left = "0";
            this.elems[this.cur].style.transition = "none";
            this.elems[this.cur].style.zIndex = "0";
        }, 125);

        this.setTimer();
    }

    prev() {
        let x = this.cur;
        this.cur = this.cur == 0 ? this.elems.length - 1 : this.cur - 1;
        
        this.btns[x].classList.remove("button--slider-selected");
        this.btns[this.cur].classList.add("button--slider-selected");

        this.elems[this.cur].style.zIndex = "10";
        this.elems[this.cur].style.left = this.cur == this.elems.length - 1 ? "-200%" : "-100%";
        this.elems[x].style.left = this.cur == this.elems.length - 1 ? "0" : "-100%";
        this.elems[this.cur].style.display = "inline-block";
        this.elems[this.cur].style.transition = "0.1s";

        setTimeout(() => {
            this.elems[this.cur].style.left = this.cur == this.elems.length - 1 ? "-100%" : "0";
        }, 10);

        setTimeout(() => {
            this.elems[x].style.display = "none";
            this.elems[this.cur].style.left = "0";
            this.elems[this.cur].style.transition = "none";
            this.elems[this.cur].style.zIndex = "0";
        }, 125);

        this.setTimer();
    }

    any(n) {
        if(n == this.cur){
            this.setTimer();
            return;
        }

        let x = this.cur;
        this.cur = n;
        
        this.btns[x].classList.remove("button--slider-selected");
        this.btns[this.cur].classList.add("button--slider-selected");

        this.elems[this.cur].style.zIndex = "10";
        this.elems[this.cur].style.left = this.cur > x ? "-100%" : "0";
        this.elems[this.cur].style.top = "125%";
        this.elems[x].style.left = this.cur > x ? "0" : "-100%";
        this.elems[this.cur].style.display = "inline-block";
        this.elems[this.cur].style.transition = "0.1s";

        setTimeout(() => {
            this.elems[this.cur].style.top = "0%";
        }, 10);

        setTimeout(() => {
            this.elems[x].style.display = "none";
            this.elems[this.cur].style.left = "0";
            this.elems[this.cur].style.top = "0";
            this.elems[this.cur].style.transition = "none";
            this.elems[this.cur].style.zIndex = "0";
        }, 125);

        this.setTimer();
    }
}

const slider = new Slider("img-4");