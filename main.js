
function dutt() {
	console.log("Herr");
	
}

var url = "https://formue.azurewebsites.net/api/HttpTriggerJS1?code=AXeaHTx6U6y6GjekOgGjZI0GJ0w7Al3HaYeojJaooVwQt85rrSQXTA==&name=yy";

var stocks = 7712;

function loadDoc() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var o = JSON.parse(this.responseText);
            console.log(o.ACN.regularMarketPrice, o.ACN.regularMarketChangePercent, o.ACN.regularMarketPrice, o.ACN.regularMarketChangePercent);

            var totalPrice = o.ACN.regularMarketPrice * o.NOK.regularMarketPrice * stocks;
            var previousTotalPrice = o.ACN.regularMarketPreviousClose * o.NOK.regularMarketPreviousClose * stocks;
            var totalChange = (totalPrice - previousTotalPrice) / previousTotalPrice;
            
            document.getElementById("acn-price").innerHTML = o.ACN.regularMarketPrice.toFixed(2);
            document.getElementById("acn-change").innerHTML = (o.ACN.regularMarketChangePercent * 100).toFixed(2) + '%';
            document.getElementById("usd-price").innerHTML = o.NOK.regularMarketPrice.toFixed(2);
            document.getElementById("usd-change").innerHTML = (o.NOK.regularMarketChangePercent * 100).toFixed(2) + '%';
            document.getElementById("total-price").innerHTML = totalPrice.toLocaleString(); // toFixed(0);
            document.getElementById("total-change").innerHTML = (totalChange * 100).toFixed(2) + '%';

            if (o.ACN.regularMarketChangePercent < 0) {
                document.getElementById("acn-change").style.color = "red";
            }
            if (o.NOK.regularMarketChangePercent < 0) {
                document.getElementById("usd-change").style.color = "red";
            }
            if (totalChange < 0) {
                document.getElementById("total-change").style.color = "red";
            }
            
            document.getElementById("demo").innerHTML = this.responseText;
       }
    };
    
    xhttp.open("GET", url, true);
    xhttp.send(); 
}

function jsonTest() {
    var o = {
        ACN: {
            price: 144,
            change: 0.02
        },
        NOK: 7.9
    };
    
    var s = JSON.stringify(o);
    console.log(s);
    var p = JSON.parse(s);
    console.log(p);
}
