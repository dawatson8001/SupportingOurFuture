var myVar = setInterval(myTimer, 1000);
function myTimer() {
    var theTime = new Date();
    document.getElementById('clock').innerHTML = theTime.toLocaleTimeString();
}