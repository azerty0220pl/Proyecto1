const eurBtn = document.querySelector("#eur");
const usdBtn = document.querySelector("#usd");
const gbpBtn = document.querySelector("#gbp");
const plnBtn = document.querySelector("#pln");
const priceElem = [document.querySelector(".price-1"), document.querySelector(".price-2"), document.querySelector(".price-3")];
const prices = [0, 25, 60];

const currencies = () => {
    eurBtn.addEventListener("click", () => {
        fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/eur.min.json").then(res => {
            res.json().then(data => {
                let x = data.eur;
    
                for (let i = 0; i < prices.length; i++)
                    priceElem[i].innerText = "€" + Math.round(prices[i] * x + Number.EPSILON);
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
                    priceElem[i].innerText = "£" + Math.round(prices[i] * x + Number.EPSILON);
            });
        });
    });
    
    plnBtn.addEventListener("click", () => {
        fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pln.min.json").then(res => {
            res.json().then(data => {
                let x = data.pln;
    
                for (let i = 0; i < prices.length; i++)
                    priceElem[i].innerText = Math.round(prices[i] * x + Number.EPSILON) + " zł";
            });
        });
    });
}

export default currencies;