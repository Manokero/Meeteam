BengalaFramework.Register({
    "Description" : "Misc Utils addon.",
    "Author" : "Pablo Ferreira",
    "Name" : "Misc Utilities",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Util",
    "SignName" : "BengalaFramework.Util.Misc",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});


function ParseTimeString(ts) {
  if(typeof ts === 'object') {
    if(ts.toLocaleTimeString()) {
      ts = ts.toLocaleTimeString();
    } else {
      return "0:00";
    }
  }
  var tsx = ts.split(" ");
  var x = tsx[0].split(":");
  return x[0] + ":"+ x[1] +" " + (tsx[1] || "");
}

function StringVectToVect(str) {
  str = str || "0x0";
  var x = str.split("x");
  if(x.length) {
    return {
      x : parseFloat(x[0]) || null,
      y : parseFloat(x[1]) || null
    }
  }
} 

function getDistanceFromLatLonInKm(LatLng1, LatLng2) {
  var R = 6371; // Radius of the earth in km
  
  var lat2 = LatLng2["lat"];
  var lon2 = LatLng2["lng"];

  var lat1 = LatLng1["lat"];
  var lon1 = LatLng1["lng"];

  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
  Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function LocalSession(Param) {
    return JSON.parse(localStorage[Param]);
}
function shadeBlendConvert(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    if(!this.sbcRip)this.sbcRip=function(d){
        var l=d.length,RGB=new Object();
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            if(l==8||l==6||l<4)return null; //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
        }
        return RGB;}
        var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}

function SetItemGrandientBackground(selector, hasImageBackground, ShadeLight, BaseColor, NextColor) {
        if(!hasImageBackground) {
            BaseColor = BaseColor || Settings["AppSettings"]["DefaultColor"];
            NextColor = NextColor || (!ShadeLight ? "#000000" : "#FFFFFF");
            var Colors = [
                shadeBlendConvert(0, BaseColor, ),
                shadeBlendConvert(0.25, BaseColor, NextColor),
                shadeBlendConvert(0.75, BaseColor, NextColor),
                shadeBlendConvert(1, BaseColor, NextColor),
            ]

            document.querySelector(selector).style.cssText = `background : linear-gradient(148deg, ${Colors[0]} 0,${Colors[1]} 25%,${Colors[2]} 75%, ${Colors[3]} 100%)`
            $(".PageBackground").fadeIn();
        } else { 
            document.querySelector(selector).style.cssText = `#000 url('./Image/Background.jpg') no-repeat center center fixed`;
            setTimeout(function() {
                $(selector).fadeIn();
            }, 1000)
        }
    }


function Notify(msj, type) {
    Materialize.toast(msj, 3000);
}


function zeroPad(num, q) {
    num = num.toString();
    while(num.length < q) {
        num = "0"+num;
    }
    return num;
}
