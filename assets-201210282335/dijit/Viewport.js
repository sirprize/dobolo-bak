//>>built
define("dijit/Viewport","dojo/Evented,dojo/on,dojo/domReady,dojo/sniff,dojo/_base/window,dojo/window".split(","),function(f,g,h,i,j,d){var a=new f;h(function(){var b=d.getBox();a._rlh=g(j.global,"resize",function(){var c=d.getBox();b.h==c.h&&b.w==c.w||(b=c,a.emit("resize"))});if(8==i("ie")){var e=screen.deviceXDPI;setInterval(function(){if(screen.deviceXDPI!=e)e=screen.deviceXDPI,a.emit("resize")},500)}});return a});