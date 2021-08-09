//-------------------------------Cam.js------------------------------

var EPx = EPy = EPz = ETx = ETy = ETz = 0.0;
var TPx = TPy = TPz = TTx = TTy = TTz = 0.0;
EPx = ETx = 750.0;
EPy = ETy = 750.0;
EPz = ETz = 750.0;
TPx = TTx = 0.0;
TPy = TTy = 0.0;
TPz = TTz = 250.0;
var ZoomFactor = 1.0;
var moveFactor = 0.1;
var RotPer = 0.0;

var TransBit = 0;
var ColorUpt = 0;
var RefColNum = 0;
var RefColOld = 0;

var TempCol = [1.0, 1.0, 1.0, 1.0];
var TrgtCol = [1.0, 1.0, 1.0, 1.0];

var Ang = 0.0;
var Ang1 = 0.0;
var Dist = 0.0;
var Dist1 = 0.0;

document.getElementById("tagNumber").innerHTML = "Tag number";
document.getElementById("tagNumber1").innerHTML = "Tag number";
document.getElementById("Area").innerHTML = "Flocculant area";

CTx = CTy = CTz = 0.0;

function checkSmallest(){
	var temp1 = temp2 = temp3 = 0.0;
	temp1 = Math.abs(EPx-TPx);
	temp2 = Math.abs(EPy-TPy);
	temp3 = Math.abs(EPz-TPz);
	return Math.min(temp1, temp2, temp3);
}

function getAngle(){
	var deltaX = EPx-TPx;
	var deltaY = EPy-TPy;
	var deltaZ = EPz-TPz;
	var rad = Math.atan2(deltaY, deltaX);
	Ang = rad*(180/Math.PI);
	var rad = Math.atan2(deltaZ, deltaX);
	Ang1 = rad*(180/Math.PI);
}

function getDist(){
	var a = EPx-TPx;
	var b = EPy-TPy;
	var c = EPz-TPz;
	Dist = Math.sqrt((a*a)+(b*b));
	Dist1 = Math.sqrt((a*a)+(c*c));
}

function SubmitPos(){
	EPx = document.getElementById("epx").value;
	EPy = document.getElementById("epy").value;
	EPz = document.getElementById("epz").value;
	TPx = document.getElementById("tpx").value;
	TPy = document.getElementById("tpy").value;
	TPz = document.getElementById("tpz").value;
}

function CustomRot(){
	if(RotPer == 0.0){
		RotPer = 1.0;
	}else{
		RotPer = 0.0;
	}
}

function flyFwd(){
	var m = 0.0;
	m = (EPx-TPx)/(EPy-TPy);
	CTz -= moveFactor;
	TTz -= moveFactor;
	if(m && (EPy-TPy)){
		CTx -= (moveFactor*m);
		TTx -= (moveFactor*m);
	}
}

function flyBwd(){
	var m = 0.0;
	m = (EPx-TPx)/(EPy-TPy);
	CTz += moveFactor;
	TTz += moveFactor;
	if(m && (EPy-TPy)){
		CTx += (moveFactor*m);
		TTx += (moveFactor*m);
	}
}

function flyRgt(){
	var m = 0.0;
	m = (EPx-TPx)/(EPy-TPy);
	CTx += moveFactor;
	TTx += moveFactor;
	if(m && (EPy-TPy)){
		CTz -= (moveFactor*m);
		TTz -= (moveFactor*m);
	}
}

function flyLft(){
	var m = 0.0;
	m = (EPx-TPx)/(EPy-TPy);
	CTx -= moveFactor;
	TTx -= moveFactor;
	if(m && (EPy-TPy)){
		CTz += (moveFactor*m);
		TTz += (moveFactor*m);
	}
}

function ResetPos(){
	ETx = 750.0;
	ETy = 750.0;
	ETz = 750.0;
	TTx = 0.0;
	TTy = 0.0;
	TTz = 250.0;
	CTx = CTy = CTz = 0.0;
	document.getElementById("tagNumber").innerHTML = "Tag number";
	document.getElementById("tagNumber1").innerHTML = "Tag number";
	document.getElementById("EqpTyp").innerHTML = "";
	document.getElementById("Svc").innerHTML = "";
	document.getElementById("Area").innerHTML = "Flocculant area";
	document.getElementById("Rng").innerHTML = "";

	TransBit = 1;
	RefColNum = 0;
	TrgtCol = [1.0, 1.0, 1.0, 1.0];
	ColorUpt = 1;
	moveFactor = (checkSmallest()/30.0);
	getAngle();
	getDist();
}

function PSPos(){
	//ResetPos();
	ETx = 300.0;
	ETy = 300.0;
	ETz = 750.0;
	TTx = 0.0;
	TTy = 50.0;
	TTz = 600.0;
	document.getElementById("tagNumber").innerHTML = "0000-PSL-001";
	document.getElementById("tagNumber1").innerHTML = "0000-PSL-001";
	document.getElementById("EqpTyp").innerHTML = "Pressure switch";
	document.getElementById("Svc").innerHTML = "Pressure control";
	document.getElementById("Area").innerHTML = "Compressor";
	document.getElementById("Rng").innerHTML = "0 - 6 bar";

	TransBit = 1;
	RefColNum = 367;
	TrgtCol = [0.9, 0.5, 0.0, 1.0];
	ColorUpt = 1;
	moveFactor = (checkSmallest()/30.0);
	getAngle();
	getDist();
}

function ValPos(){
	//ResetPos();
	ETx = 500.0;
	ETy = 500.0;
	ETz = 200.0;
	TTx = 100.0;
	TTy = 0.0;
	TTz = 50.0;
	document.getElementById("tagNumber").innerHTML = "0000-XV-001";
	document.getElementById("tagNumber1").innerHTML = "0000-XV-001";
	document.getElementById("EqpTyp").innerHTML = "Solenoid valve";
	document.getElementById("Svc").innerHTML = "Distribution";
	document.getElementById("Area").innerHTML = "Compressor";
	document.getElementById("Rng").innerHTML = "NA";

	TransBit = 1;
	RefColNum = 430;
	TrgtCol = [0.9, 0.5, 0.0, 1.0];
	ColorUpt = 1;
	moveFactor = (checkSmallest()/30.0);
	getAngle();
	getDist();
}

function Pump1Pos(){
	//ResetPos();
	ETx = -750.0;
	ETy = -750.0;
	ETz = 750.0;
	TTx = -100.0;
	TTy = -100.0;
	TTz = 250.0;
	document.getElementById("tagNumber").innerHTML = "0000-M1-001";
	document.getElementById("tagNumber1").innerHTML = "0000-M1-001";
	document.getElementById("EqpTyp").innerHTML = "Compressor pump-1";
	document.getElementById("Svc").innerHTML = "Compress air";
	document.getElementById("Area").innerHTML = "Compressor";
	document.getElementById("Rng").innerHTML = "0 - 1500 RPM";

	TransBit = 1;
	RefColNum = 473;
	TrgtCol = [0.0, 1.0, 0.0, 1.0];
	ColorUpt = 1;
	moveFactor = (checkSmallest()/30.0);
	getAngle();
	getDist();
}

function Pump2Pos(){
	//ResetPos();
	ETx = -750.0;
	ETy = 750.0;
	ETz = 750.0;
	TTx = -100.0;
	TTy = 100.0;
	TTz = 250.0;
	document.getElementById("tagNumber").innerHTML = "0000-M1-002";
	document.getElementById("tagNumber1").innerHTML = "0000-M1-002";
	document.getElementById("EqpTyp").innerHTML = "Compressor pump-2";
	document.getElementById("Svc").innerHTML = "Compress air";
	document.getElementById("Area").innerHTML = "Compressor";
	document.getElementById("Rng").innerHTML = "0 - 1500 RPM";

	TransBit = 1;
	RefColNum = 462;
	TrgtCol = [0.0, 1.0, 0.0, 1.0];
	ColorUpt = 1;
	moveFactor = (checkSmallest()/30.0);
	getAngle();
	getDist();
}