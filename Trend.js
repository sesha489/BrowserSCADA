//-------------------------------Trend.js------------------------------

var inc = 0;
var temp = 0;
//var myVar1=setInterval(MyFunc, 5000);
var myVar2=setInterval(DrawTrend, 1000);
var myVar3=setInterval(UpdateArray, 1000);

var canvas = document.getElementById("MyCanvas");
var ctx = canvas.getContext("2d");
var p=[75,35,72,45,90,63,18,27,54,60,55,10,90,41,78,35,87,47,18,56];

function MyFunc(){
    if(inc<5){
        inc++;
    }else{
        inc = 1;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("dVal").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "https://seshatestsite.000webhostapp.com/Pages/DBoperation.php?q="+inc, true);
    xhttp.send();
    //temp = document.getElementById("dVal").innerHTML;
}

function UpdateArray(){
    temp=p[0];
    for(i=0;i<(p.length-1);i++){
        p[i]=p[i+1];
    }
    p[(p.length-1)]=temp;
    document.getElementById("CurVal").innerHTML = p[(p.length-2)];
}

function DrawTrend(){
    ctx.clearRect(0,0,300,120);

    //Horizontal lines
    ctx.lineWidth=0.5;
    for(i=105;i>0;i-=20){
        ctx.beginPath();
        ctx.moveTo(15,i);
        ctx.lineTo(300,i);
        ctx.strokeStyle="grey";
        ctx.stroke();
    }
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0,105);
    ctx.lineTo(300,105);
    ctx.strokeStyle="white";
    ctx.stroke();

    //Vertical lines
    ctx.lineWidth=0.5;
    for(i=15;i<300;i+=15){
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,105);
        ctx.strokeStyle="grey";
        ctx.stroke();
    }
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(15,0);
    ctx.lineTo(15,120);
    ctx.strokeStyle="white";
    ctx.stroke();

    //ctx.lineWidth=1;
    ctx.beginPath();
    //ctx.moveTo(0,100);
    
    for(i=0;i<p.length;i++){
        ctx.lineTo(((15*i)+15),(105-p[i]));
        ctx.strokeStyle="green";
        ctx.stroke();
    }
}