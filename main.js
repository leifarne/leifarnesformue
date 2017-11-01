
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

            var numFmt = new Intl.NumberFormat("no-NO", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 });
            var bignumFmt = new Intl.NumberFormat("no-NO", { style: "decimal", maximumFractionDigits: 0 });
            var pctFmt = new Intl.NumberFormat("no-NO", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
            
            var totalPrice = o.ACN.regularMarketPrice * o.NOK.regularMarketPrice * stocks;
            var previousTotalPrice = o.ACN.regularMarketPreviousClose * o.NOK.regularMarketPreviousClose * stocks;
            var totalChange = (totalPrice - previousTotalPrice) / previousTotalPrice;
            
            document.getElementById("acn-price").innerHTML = numFmt.format(o.ACN.regularMarketPrice);
            document.getElementById("acn-change").innerHTML = pctFmt.format(o.ACN.regularMarketChangePercent);
            document.getElementById("usd-price").innerHTML = numFmt.format(o.NOK.regularMarketPrice);
            document.getElementById("usd-change").innerHTML = pctFmt.format(o.NOK.regularMarketChangePercent);
            document.getElementById("total-price").innerHTML = bignumFmt.format(totalPrice);
            document.getElementById("total-change").innerHTML = pctFmt.format(totalChange);

            if (o.ACN.regularMarketChangePercent < 0) {
                document.getElementById("acn-change").style.color = "red";
            }
            if (o.NOK.regularMarketChangePercent < 0) {
                document.getElementById("usd-change").style.color = "red";
            }
            if (totalChange < 0) {
                document.getElementById("total-change").style.color = "red";
            }
            
            document.getElementById("demo").innerHTML = "Status DONE.";
        }
        else {
            document.getElementById("demo").innerHTML = "Ready state: " + this.readyState;
        
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
