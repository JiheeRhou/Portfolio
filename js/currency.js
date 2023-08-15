const units = ["EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR"];

// Set the select options with the units array
document.addEventListener("DOMContentLoaded", function () {
    const baseSelectElements = document.getElementById("base");
    const targetSelectElements = document.getElementById("target");

    for (let i = 0; i < units.length; i++) {
        const baseOption  = document.createElement("option");
        baseOption.text = units[i];
        baseOption.value = units[i];
        baseSelectElements.appendChild(baseOption);

        const targetOption  = document.createElement("option");
        targetOption.text = units[i];
        targetOption.value = units[i];
        targetSelectElements.appendChild(targetOption);
    }    
});

// Check button cheBtn
const check = document.getElementById("chkBtn");
let previousBase = document.getElementById("base").value;
let jsonData = "";
// Check button cheBtn click event
// Get currency information using API
check.addEventListener("click", function() {
    let base_currency = document.getElementById("base").value;
    
    if(previousBase == base_currency) {
        setCurrencyInfo();
    } else {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function () {
            jsonData = this.responseText; 
            console.log(jsonData);
            previousBase = base_currency;
            
            setCurrencyInfo();
        });
        oReq.open("GET", "https://api.freecurrencyapi.com/v1/latest?base_currency="+base_currency);
        oReq.setRequestHeader("apikey", "fca_live_S6sY80KE0hiZTmY3cwNgFEPSuPIXt59IzSiqlDyZ");
        oReq.send();
    }
});

// Build out the setCurrencyInfo() function
function setCurrencyInfo(){
    // Remove previous currency information
    removeArticle();
    let section = document.querySelector('section');
    // Get the selected base and target currencies
    let base_currency = document.getElementById("base").value;
    let currencies = document.getElementById("target").value;
    
    // Grab the currencies
    const jsonObj = JSON.parse(jsonData);
    let base = jsonObj.data[base_currency];
    let target = jsonObj.data[currencies].toFixed(2);
       
    // Set the currency rates
    // Build html elements for the content
    let article = document.createElement('article');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');
    
    // Set the textContent property for each of the above elements based on the JSON content
    p1.textContent = base_currency;
    p2.textContent = base;
    p3.textContent = currencies;
    p4.textContent = target;

    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    article.appendChild(p4);
    section.appendChild(article);
}

// Remove previous currency information
function removeArticle(){
    let section = document.querySelector('section');
    let article = document.querySelector('article');

    if (article) {
        section.removeChild(article);
    }
}
