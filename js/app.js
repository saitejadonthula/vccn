let btn=document.getElementById("btn1");
let input=document.getElementById("pin-input");
let pincode=000000;
var field = document.querySelector('#today');
var date = new Date();
document.getElementById("day").value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);
input.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
    e.preventDefault();
    $("#buttonSrch").click(); 
    return true;
    }
});
input.addEventListener("keyup",function(e){
    if(e.key==="Enter"){
        fn1();
    }
});
btn.addEventListener("click",function(){
    fn1();
});
function fn1(){
    let pincode=document.getElementById("pin-input").value;
    let today=document.getElementById("day").value;
    let date = today[8]+today[9]+today[7]+today[5]+today[6]+today[4]+today[0]+today[1]+today[2]+today[3];
    console.log(date);
    const req = new XMLHttpRequest();
    req.onload = function () {
        console.log("DONE LOADING!!");
        const txt = JSON.parse(this.responseText);
        let obj=txt.sessions;
        var tbody = document.getElementById('tbody');
        try{if(obj.length==0){
            console.log("fetch-failed");
            alert("No slots! Try with another date or Pincode");
            return;
        }
        for (var i = 0; i < obj.length; i++) {
            var tr = "<tr>";
            tr += "<td>" + (i+1).toString()+". </td>" + "<td>" + obj[i].name + "</td>" + "<td>" + obj[i].fee.toString()+", " + "</td>" + "<td>" + obj[i].available_capacity_dose1.toString() +", "+"</td>" + "<td>" + obj[i].available_capacity_dose2.toString() +", "+ "</td> </tr>";
            tbody.innerHTML += tr;
        }}
        catch(err){
            console.log(err);
            alert("Unable to fetch data!");
        }
    };
    req.onerror = function () {
        console.log("ERROR");
        console.log(this);
    };
    req.open(
       "GET",
       `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
    );
    req.send();

}
