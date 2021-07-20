let btn=document.getElementById("btn1");
let input=document.getElementById("pin-input");
let pincode=000000;
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
    let slots=document.getElementById("slots");        
      
    const req = new XMLHttpRequest();
    req.onload = function () {
        console.log("DONE LOADING!!");
        const txt = JSON.parse(this.responseText);
        let obj=txt.sessions;
        var tbody = document.getElementById('tbody');
        for (var i = 0; i < obj.length; i++) {
            var tr = "<tr>";
            tr += "<td>" + (i+1).toString()+". </td>" + "<td>" + obj[i].name + "</td>" + "<td>" + obj[i].fee.toString()+", " + "</td>" + "<td>" + obj[i].available_capacity_dose1.toString() +", "+"</td>" + "<td>" + obj[i].available_capacity_dose2.toString() +", "+ "</td> </tr>";
            tbody.innerHTML += tr;
        }
    };
    req.onerror = function () {
        console.log("ERROR");
        console.log(this);
    };
    req.open(
       "GET",
       `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=20-07-2021`
    );
    req.send();

}