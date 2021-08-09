//-------------------------------Anim.js------------------------------

const workArea = document.getElementById("gldemo");
document.addEventListener('keydown', keyDownHandler, false);
//document.addEventListener('keyup', keyUpHandler, false);
document.onwheel = zoom;

var mx1=mx2=0;
var my1=my2=0;
var mClick=leftMB=middleMB=false;
workArea.addEventListener('mousedown', e=>{
	mClick=true;
	if(e.button===0)
		leftMB=true;
	if(e.button===1)
		middleMB=true;
});
workArea.addEventListener('mousemove', e=>{
	if(mClick==true && leftMB==true)
	{
		mx1=e.offsetX;
		my1=e.offsetY;
		if(mx1>mx2){
			if(EPy>TPy){
				flyRgt();
			}if(EPy<TPy){
				flyLft();
			}
		}
		if(mx1<mx2){
			if(EPy>TPy){
				flyLft();
			}if(EPy<TPy){
				flyRgt();
			}
		}
		if(my1>my2){
			if(EPy>TPy){
				flyBwd()
			}if(EPy<TPy){
				flyFwd();
			}
		}
		if(my1<my2){
			if(EPy>TPy){
				flyFwd();
			}if(EPy<TPy){
				flyBwd()
			}
		}
		mx2=mx1;
		my2=my1;
	}
	if(mClick==true && middleMB==true)
	{
		mx1=e.offsetX;
		my1=e.offsetY;
		if(mx1>mx2){
			Ang -= 0.1;
			EPx = (Dist*(Math.sin(Ang)))+TPx;
			EPy = (Dist*(Math.cos(Ang)))+TPy;
		}
		if(mx1<mx2){
			Ang += 0.1;
			EPx = (Dist*(Math.sin(Ang)))+TPx;
			EPy = (Dist*(Math.cos(Ang)))+TPy;
		}
		if(my1>my2){
			//EPz = EPz+(moveFactor/3.0);
			EPz = EPz+5.0;
		}
		if(my1<my2){
			//EPz = EPz-(moveFactor/3.0);
			EPz = EPz-5.0;
		}
		mx2=mx1;
		my2=my1;
	}
});
workArea.addEventListener('mouseup', e=>{
	mClick=leftMB=middleMB=false;
	mx1=mx2=0;
	my1=my2=0;
});

function zoom(event){
	event.preventDefault();
	var m=0.0;
	if(event.deltaY<0){
		if(EPx>TPx){
			m=(Math.abs(EPx-TPx))/(Math.abs(EPz-TPz));
			EPx=EPx-(50.0*m);TPx=TPx-(50.0*m);}
		if(EPx<TPx){
			m=(Math.abs(EPx-TPx))/(Math.abs(EPz-TPz));
			EPx=EPx+(50.0*m);TPx=TPx+(50.0*m);}
		if(EPy>TPy){
			m=(Math.abs(EPy-TPy))/(Math.abs(EPz-TPz));
			EPy=EPy-(50.0*m);TPy=TPy-(50.0*m);}
		if(EPy<TPy){
			m=(Math.abs(EPy-TPy))/(Math.abs(EPz-TPz));
			EPy=EPy+(50.0*m);TPy=TPy+(50.0*m);}
		if(EPz>TPz){
			EPz=EPz-50.0;TPz=TPz-50.0;}
		if(EPz<TPz){
			EPz=EPz+50.0;TPz=TPz+50.0;}
	}else{
		if(EPx>TPx){
			m=(Math.abs(EPx-TPx))/(Math.abs(EPz-TPz));
			EPx=EPx+(50.0*m);TPx=TPx+(50.0*m);}
		if(EPx<TPx){
			m=(Math.abs(EPx-TPx))/(Math.abs(EPz-TPz));
			EPx=EPx-(50.0*m);TPx=TPx-(50.0*m);}
		if(EPy>TPy){
			m=(Math.abs(EPy-TPy))/(Math.abs(EPz-TPz));
			EPy=EPy+(50.0*m);TPy=TPy+(50.0*m);}
		if(EPy<TPy){
			m=(Math.abs(EPy-TPy))/(Math.abs(EPz-TPz));
			EPy=EPy-(50.0*m);TPy=TPy-(50.0*m);}
		if(EPz>TPz){
			EPz=EPz+50.0;TPz=TPz+50.0;}
		if(EPz<TPz){
			EPz=EPz-50.0;TPz=TPz-50.0;}
	}
}

function keyDownHandler(event){
	if(event.keyCode==39){
		if(EPy>TPy){
			flyRgt();
		}if(EPy<TPy){
			flyLft();
		}
	}
	if(event.keyCode==37){
		if(EPy>TPy){
			flyLft();
		}if(EPy<TPy){
			flyRgt();
		}
	}
	if(event.keyCode==38){
		if(EPy>TPy){
			flyFwd();
		}if(EPy<TPy){
			flyBwd()
		}
	}
	if(event.keyCode==40){
		if(EPy>TPy){
			flyBwd()
		}if(EPy<TPy){
			flyFwd();
		}
	}
}

function TransEx(){
	if(TransBit===1){
		if(EPx>ETx){
			EPx -= 0.005;
		}
    		if(EPy>ETy){
			EPy -= 0.005;
		}
		if(EPz>ETz){
			EPz -= 0.005;
		}
		if(EPx<ETx){
			EPx += 0.005;
		}
		if(EPy<ETy){
			EPy += 0.005;
		}
		if(EPz<ETz){
			EPz += 0.005;
		}

		if(TPx>TTx){
			TPx -= 0.005;
		}
		if(TPy>TTy){
			TPy -= 0.005;
		}
		if(TPz>TTz){
			TPz -= 0.005;
		}
		if(TPx<TTx){
			TPx += 0.005;
		}
		if(TPy<TTy){
			TPy += 0.005;
		}
		if(TPz<TTz){
			TPz += 0.005;
		}
	}
	if((Math.abs(EPx-ETx)<=1.0)&&(Math.abs(EPy-ETy)<=1.0)&&(Math.abs(EPz-ETz)<=1.0)&&(Math.abs(TPx-TTx)<=1.0)&&(Math.abs(TPy-TTy)<=1.0)&&(Math.abs(TPz-TTz)<=1.0)){
		TransBit=0;
		EPx = ETx;
		EPy = ETy;
		EPz = ETz;
		TPx = TTx;
		TPy = TTy;
		TPz = TTz;
		moveFactor = (checkSmallest()/30.0);
		getAngle();
		getDist();
	}
}