//>>built
require({cache:{"dojo/_base/connect":function(){define("dojo/_base/connect","./kernel,../on,../topic,../aspect,./event,../mouse,./sniff,./lang,../keys".split(","),function(h,j,i,m,n,l,c,f){function o(a,b,g,e,c){e=f.hitch(g,e);if(!a||!a.addEventListener&&!a.attachEvent)return m.after(a||h.global,b,e,!0);"string"==typeof b&&"on"==b.substring(0,2)&&(b=b.substring(2));if(!a)a=h.global;if(!c)switch(b){case "keypress":b=d;break;case "mouseenter":b=l.enter;break;case "mouseleave":b=l.leave}return j(a,b,
e,c)}function a(a){a.keyChar=a.charCode?String.fromCharCode(a.charCode):"";a.charOrCode=a.keyChar||a.keyCode}c.add("events-keypress-typed",function(){var a={charCode:0};try{a=document.createEvent("KeyboardEvent"),(a.initKeyboardEvent||a.initKeyEvent).call(a,"keypress",!0,!0,null,!1,!1,!1,!1,9,3)}catch(b){}return 0==a.charCode&&!c("opera")});var k={106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39,229:113},b=c("mac")?"metaKey":"ctrlKey",e=function(b,d){var g=
f.mixin({},b,d);a(g);g.preventDefault=function(){b.preventDefault()};g.stopPropagation=function(){b.stopPropagation()};return g},d;d=c("events-keypress-typed")?function(a,b){var d=j(a,"keydown",function(a){var d=a.keyCode,g=13!=d&&32!=d&&(27!=d||!c("ie"))&&(48>d||90<d)&&(96>d||111<d)&&(186>d||192<d)&&(219>d||222<d)&&229!=d;if(g||a.ctrlKey){g=g?0:d;if(a.ctrlKey){if(3==d||13==d)return b.call(a.currentTarget,a);g=95<g&&106>g?g-48:!a.shiftKey&&65<=g&&90>=g?g+32:k[g]||g}d=e(a,{type:"keypress",faux:!0,
charCode:g});b.call(a.currentTarget,d);if(c("ie"))try{a.keyCode=d.keyCode}catch(f){}}}),g=j(a,"keypress",function(a){var d=a.charCode,a=e(a,{charCode:32<=d?d:0,faux:!0});return b.call(this,a)});return{remove:function(){d.remove();g.remove()}}}:c("opera")?function(a,d){return j(a,"keypress",function(a){var b=a.which;3==b&&(b=99);b=32>b&&!a.shiftKey?0:b;a.ctrlKey&&!a.shiftKey&&65<=b&&90>=b&&(b+=32);return d.call(this,e(a,{charCode:b}))})}:function(d,b){return j(d,"keypress",function(d){a(d);return b.call(this,
d)})};var g={_keypress:d,connect:function(a,d,b,g,e){var f=arguments,c=[],k=0;c.push("string"==typeof f[0]?null:f[k++],f[k++]);var q=f[k+1];c.push("string"==typeof q||"function"==typeof q?f[k++]:null,f[k++]);for(q=f.length;k<q;k++)c.push(f[k]);return o.apply(this,c)},disconnect:function(a){a&&a.remove()},subscribe:function(a,d,b){return i.subscribe(a,f.hitch(d,b))},publish:function(a,d){return i.publish.apply(i,[a].concat(d))},connectPublisher:function(a,d,b){var e=function(){g.publish(a,arguments)};
return b?g.connect(d,b,e):g.connect(d,e)},isCopyKey:function(a){return a[b]}};g.unsubscribe=g.disconnect;f.mixin(h,g);return g})},"dojo/on":function(){define("dojo/on",["./has!dom-addeventlistener?:./aspect","./_base/kernel","./has"],function(h,j,i){function m(a,g,e,k,c){if(k=g.match(/(.*):(.*)/))return g=k[2],k=k[1],f.selector(k,g).call(c,a,e);i("touch")&&(o.test(g)&&(e=u(e)),!i("event-orientationchange")&&"orientationchange"==g&&(g="resize",a=window,e=u(e)));d&&(e=d(e));if(a.addEventListener){var h=
g in b,p=h?b[g]:g;a.addEventListener(p,e,h);return{remove:function(){a.removeEventListener(p,e,h)}}}if(r&&a.attachEvent)return r(a,"on"+g,e);throw Error("Target must be an event emitter");}function n(){this.cancelable=!1}function l(){this.bubbles=!1}var c=window.ScriptEngineMajorVersion;i.add("jscript",c&&c()+ScriptEngineMinorVersion()/10);i.add("event-orientationchange",i("touch")&&!i("android"));i.add("event-stopimmediatepropagation",window.Event&&!!window.Event.prototype&&!!window.Event.prototype.stopImmediatePropagation);
var f=function(a,d,b,g){return"function"==typeof a.on&&"function"!=typeof d?a.on(d,b):f.parse(a,d,b,m,g,this)};f.pausable=function(a,d,b,g){var e,a=f(a,d,function(){if(!e)return b.apply(this,arguments)},g);a.pause=function(){e=!0};a.resume=function(){e=!1};return a};f.once=function(a,d,b){var g=f(a,d,function(){g.remove();return b.apply(this,arguments)});return g};f.parse=function(a,d,b,g,e,f){if(d.call)return d.call(f,a,b);if(-1<d.indexOf(",")){for(var d=d.split(/\s*,\s*/),k=[],c=0,h;h=d[c++];)k.push(g(a,
h,b,e,f));k.remove=function(){for(var a=0;a<k.length;a++)k[a].remove()};return k}return g(a,d,b,e,f)};var o=/^touch/;f.selector=function(a,d,b){return function(g,e){function k(d){for(c=c&&c.matches?c:j.query;!c.matches(d,a,g);)if(d==g||!1===b||!(d=d.parentNode)||1!=d.nodeType)return;return d}var c="function"==typeof a?{matches:a}:this,h=d.bubble;return h?f(g,h(k),e):f(g,d,function(a){var d=k(a.target);return d&&e.call(d,a)})}};var a=[].slice,k=f.emit=function(d,b,g){var e=a.call(arguments,2),f="on"+
b;if("parentNode"in d){var k=e[0]={},c;for(c in g)k[c]=g[c];k.preventDefault=n;k.stopPropagation=l;k.target=d;k.type=b;g=k}do d[f]&&d[f].apply(d,e);while(g&&g.bubbles&&(d=d.parentNode));return g&&g.cancelable&&g},b={};if(!i("event-stopimmediatepropagation"))var e=function(){this.modified=this.immediatelyStopped=!0},d=function(a){return function(d){if(!d.immediatelyStopped)return d.stopImmediatePropagation=e,a.apply(this,arguments)}};if(i("dom-addeventlistener")){b={focusin:"focus",focusout:"blur"};
if(i("opera"))b.keydown="keypress";f.emit=function(a,d,b){if(a.dispatchEvent&&document.createEvent){var g=a.ownerDocument.createEvent("HTMLEvents");g.initEvent(d,!!b.bubbles,!!b.cancelable);for(var e in b)e in g||(g[e]=b[e]);return a.dispatchEvent(g)&&g}return k.apply(f,arguments)}}else{f._fixEvent=function(a,d){if(!a)a=(d&&(d.ownerDocument||d.document||d).parentWindow||window).event;if(!a)return a;g&&a.type==g.type&&(a=g);if(!a.target){a.target=a.srcElement;a.currentTarget=d||a.srcElement;if("mouseover"==
a.type)a.relatedTarget=a.fromElement;if("mouseout"==a.type)a.relatedTarget=a.toElement;if(!a.stopPropagation)a.stopPropagation=w,a.preventDefault=x;switch(a.type){case "keypress":var b="charCode"in a?a.charCode:a.keyCode;10==b?(b=0,a.keyCode=13):13==b||27==b?b=0:3==b&&(b=99);a.charCode=b;b=a;b.keyChar=b.charCode?String.fromCharCode(b.charCode):"";b.charOrCode=b.keyChar||b.keyCode}}return a};var g,p=function(a){this.handle=a};p.prototype.remove=function(){delete _dojoIEListeners_[this.handle]};var v=
function(a){return function(d){var d=f._fixEvent(d,this),b=a.call(this,d);d.modified&&(g||setTimeout(function(){g=null}),g=d);return b}},r=function(a,d,b){b=v(b);if(((a.ownerDocument?a.ownerDocument.parentWindow:a.parentWindow||a.window||window)!=top||5.8>i("jscript"))&&!i("config-_allow_leaks")){"undefined"==typeof _dojoIEListeners_&&(_dojoIEListeners_=[]);var g=a[d];if(!g||!g.listeners){var e=g,g=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
g.listeners=[];a[d]=g;g.global=this;e&&g.listeners.push(_dojoIEListeners_.push(e)-1)}g.listeners.push(a=g.global._dojoIEListeners_.push(b)-1);return new p(a)}return h.after(a,d,b,!0)},w=function(){this.cancelBubble=!0},x=f._preventDefault=function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey)try{this.keyCode=0}catch(a){}this.defaultPrevented=!0;this.returnValue=!1}}if(i("touch"))var s=function(){},t=window.orientation,u=function(a){return function(d){var b=d.corrected;if(!b){var g=d.type;try{delete d.type}catch(e){}d.type?
(s.prototype=d,b=new s,b.preventDefault=function(){d.preventDefault()},b.stopPropagation=function(){d.stopPropagation()}):(b=d,b.type=g);d.corrected=b;if("resize"==g){if(t==window.orientation)return null;t=window.orientation;b.type="orientationchange";return a.call(this,b)}if(!("rotation"in b))b.rotation=0,b.scale=1;var g=b.changedTouches[0],f;for(f in g)delete b[f],b[f]=g[f]}return a.call(this,b)}};return f})},"dojo/topic":function(){define("dojo/topic",["./Evented"],function(h){var j=new h;return{publish:function(h,
m){return j.emit.apply(j,arguments)},subscribe:function(h,m){return j.on.apply(j,arguments)}}})},"dojo/Evented":function(){define("dojo/Evented",["./aspect","./on"],function(h,j){function i(){}var m=h.after;i.prototype={on:function(h,i){return j.parse(this,h,i,function(c,f){return m(c,"on"+f,i,!0)})},emit:function(h,i){var c=[this];c.push.apply(c,arguments);return j.emit.apply(j,c)}};return i})},"dojo/aspect":function(){define("dojo/aspect",[],function(){function h(f,c,a,k){var b=f[c],e="around"==
c,d;if(e){var g=a(function(){return b.advice(this,arguments)});d={remove:function(){d.cancelled=!0},advice:function(a,e){return d.cancelled?b.advice(a,e):g.apply(a,e)}}}else d={remove:function(){var a=d.previous,b=d.next;if(!b&&!a)delete f[c];else if(a?a.next=b:f[c]=b,b)b.previous=a},id:m++,advice:a,receiveArguments:k};if(b&&!e)if("after"==c){for(a=b;a;)b=a,a=a.next;b.next=d;d.previous=b}else{if("before"==c)f[c]=d,d.next=b,b.previous=d}else f[c]=d;return d}function j(f){return function(c,a,k,b){var e=
c[a],d;if(!e||e.target!=c){c[a]=d=function(){for(var a=m,b=arguments,e=d.before;e;)b=e.advice.apply(this,b)||b,e=e.next;if(d.around)var c=d.around.advice(this,b);for(e=d.after;e&&e.id<a;){if(e.receiveArguments)var f=e.advice.apply(this,b),c=f===i?c:f;else c=e.advice.call(this,c,b);e=e.next}return c};if(e)d.around={advice:function(a,d){return e.apply(a,d)}};d.target=c}c=h(d||e,f,k,b);k=null;return c}}var i,m=0,n=j("after"),l=j("before"),c=j("around");return{before:l,around:c,after:n}})},"dojo/_base/event":function(){define("dojo/_base/event",
["./kernel","../on","../has","../dom-geometry"],function(h,j,i,m){if(j._fixEvent){var n=j._fixEvent;j._fixEvent=function(c,f){(c=n(c,f))&&m.normalizeEvent(c);return c}}var l={fix:function(c,f){return j._fixEvent?j._fixEvent(c,f):c},stop:function(c){i("dom-addeventlistener")||c&&c.preventDefault?(c.preventDefault(),c.stopPropagation()):(c=c||window.event,c.cancelBubble=!0,j._preventDefault.call(c))}};h.fixEvent=l.fix;h.stopEvent=l.stop;return l})},"dojo/dom-geometry":function(){define("dojo/dom-geometry",
["./sniff","./_base/window","./dom","./dom-style"],function(h,j,i,m){function n(a,c,b,e,d,g){g=g||"px";a=a.style;if(!isNaN(c))a.left=c+g;if(!isNaN(b))a.top=b+g;if(0<=e)a.width=e+g;if(0<=d)a.height=d+g}function l(a){return"button"==a.tagName.toLowerCase()||"input"==a.tagName.toLowerCase()&&"button"==(a.getAttribute("type")||"").toLowerCase()}function c(a){return"border-box"==f.boxModel||"table"==a.tagName.toLowerCase()||l(a)}var f={boxModel:"content-box"};if(h("ie"))f.boxModel="BackCompat"==document.compatMode?
"border-box":"content-box";f.getPadExtents=function(a,c){var a=i.byId(a),b=c||m.getComputedStyle(a),e=m.toPixelValue,d=e(a,b.paddingLeft),g=e(a,b.paddingTop),f=e(a,b.paddingRight),b=e(a,b.paddingBottom);return{l:d,t:g,r:f,b:b,w:d+f,h:g+b}};f.getBorderExtents=function(a,c){var a=i.byId(a),b=m.toPixelValue,e=c||m.getComputedStyle(a),d="none"!=e.borderLeftStyle?b(a,e.borderLeftWidth):0,g="none"!=e.borderTopStyle?b(a,e.borderTopWidth):0,f="none"!=e.borderRightStyle?b(a,e.borderRightWidth):0,b="none"!=
e.borderBottomStyle?b(a,e.borderBottomWidth):0;return{l:d,t:g,r:f,b:b,w:d+f,h:g+b}};f.getPadBorderExtents=function(a,c){var a=i.byId(a),b=c||m.getComputedStyle(a),e=f.getPadExtents(a,b),b=f.getBorderExtents(a,b);return{l:e.l+b.l,t:e.t+b.t,r:e.r+b.r,b:e.b+b.b,w:e.w+b.w,h:e.h+b.h}};f.getMarginExtents=function(a,c){var a=i.byId(a),b=c||m.getComputedStyle(a),e=m.toPixelValue,d=e(a,b.marginLeft),g=e(a,b.marginTop),f=e(a,b.marginRight),b=e(a,b.marginBottom);return{l:d,t:g,r:f,b:b,w:d+f,h:g+b}};f.getMarginBox=
function(a,c){var a=i.byId(a),b=c||m.getComputedStyle(a),e=f.getMarginExtents(a,b),d=a.offsetLeft-e.l,g=a.offsetTop-e.t,l=a.parentNode,j=m.toPixelValue;if(h("mozilla")){var n=parseFloat(b.left),b=parseFloat(b.top);!isNaN(n)&&!isNaN(b)?(d=n,g=b):l&&l.style&&(l=m.getComputedStyle(l),"visible"!=l.overflow&&(d+="none"!=l.borderLeftStyle?j(a,l.borderLeftWidth):0,g+="none"!=l.borderTopStyle?j(a,l.borderTopWidth):0))}else if((h("opera")||8==h("ie")&&!h("quirks"))&&l)l=m.getComputedStyle(l),d-="none"!=l.borderLeftStyle?
j(a,l.borderLeftWidth):0,g-="none"!=l.borderTopStyle?j(a,l.borderTopWidth):0;return{l:d,t:g,w:a.offsetWidth+e.w,h:a.offsetHeight+e.h}};f.getContentBox=function(a,c){var a=i.byId(a),b=c||m.getComputedStyle(a),e=a.clientWidth,d=f.getPadExtents(a,b),g=f.getBorderExtents(a,b);e?(b=a.clientHeight,g.w=g.h=0):(e=a.offsetWidth,b=a.offsetHeight);h("opera")&&(d.l+=g.l,d.t+=g.t);return{l:d.l,t:d.t,w:e-d.w-g.w,h:b-d.h-g.h}};f.setContentSize=function(a,k,b){var a=i.byId(a),e=k.w,k=k.h;c(a)&&(b=f.getPadBorderExtents(a,
b),0<=e&&(e+=b.w),0<=k&&(k+=b.h));n(a,NaN,NaN,e,k)};var o={l:0,t:0,w:0,h:0};f.setMarginBox=function(a,k,b){var a=i.byId(a),e=b||m.getComputedStyle(a),b=k.w,d=k.h,g=c(a)?o:f.getPadBorderExtents(a,e),e=f.getMarginExtents(a,e);if(h("webkit")&&l(a)){var j=a.style;if(0<=b&&!j.width)j.width="4px";if(0<=d&&!j.height)j.height="4px"}0<=b&&(b=Math.max(b-g.w-e.w,0));0<=d&&(d=Math.max(d-g.h-e.h,0));n(a,k.l,k.t,b,d)};f.isBodyLtr=function(a){a=a||j.doc;return"ltr"==(j.body(a).dir||a.documentElement.dir||"ltr").toLowerCase()};
f.docScroll=function(a){var a=a||j.doc,c=j.doc.parentWindow||j.doc.defaultView;return"pageXOffset"in c?{x:c.pageXOffset,y:c.pageYOffset}:(c=h("quirks")?j.body(a):a.documentElement)&&{x:f.fixIeBiDiScrollLeft(c.scrollLeft||0,a),y:c.scrollTop||0}};if(h("ie"))f.getIeDocumentElementOffset=function(a){a=a||j.doc;a=a.documentElement;if(8>h("ie")){var c=a.getBoundingClientRect(),b=c.left,c=c.top;7>h("ie")&&(b+=a.clientLeft,c+=a.clientTop);return{x:0>b?0:b,y:0>c?0:c}}return{x:0,y:0}};f.fixIeBiDiScrollLeft=
function(a,c){var c=c||j.doc,b=h("ie");if(b&&!f.isBodyLtr(c)){var e=h("quirks"),d=e?j.body(c):c.documentElement,g=j.global;6==b&&!e&&g.frameElement&&d.scrollHeight>d.clientHeight&&(a+=d.clientLeft);return 8>b||e?a+d.clientWidth-d.scrollWidth:-a}return a};f.position=function(a,c){var a=i.byId(a),b=j.body(a.ownerDocument),e=a.getBoundingClientRect(),e={x:e.left,y:e.top,w:e.right-e.left,h:e.bottom-e.top};if(h("ie")){var d=f.getIeDocumentElementOffset(a.ownerDocument);e.x-=d.x+(h("quirks")?b.clientLeft+
b.offsetLeft:0);e.y-=d.y+(h("quirks")?b.clientTop+b.offsetTop:0)}c&&(b=f.docScroll(a.ownerDocument),e.x+=b.x,e.y+=b.y);return e};f.getMarginSize=function(a,c){var a=i.byId(a),b=f.getMarginExtents(a,c||m.getComputedStyle(a)),e=a.getBoundingClientRect();return{w:e.right-e.left+b.w,h:e.bottom-e.top+b.h}};f.normalizeEvent=function(a){if(!("layerX"in a))a.layerX=a.offsetX,a.layerY=a.offsetY;if(!h("dom-addeventlistener")){var c=a.target,c=c&&c.ownerDocument||document,b=h("quirks")?c.body:c.documentElement,
e=f.getIeDocumentElementOffset(c);a.pageX=a.clientX+f.fixIeBiDiScrollLeft(b.scrollLeft||0,c)-e.x;a.pageY=a.clientY+(b.scrollTop||0)-e.y}};return f})},"dojo/_base/window":function(){define("dojo/_base/window",["./kernel","./lang","../sniff"],function(h,j,i){var m={global:h.global,doc:this.document||null,body:function(i){i=i||h.doc;return i.body||i.getElementsByTagName("body")[0]},setContext:function(i,l){h.global=m.global=i;h.doc=m.doc=l},withGlobal:function(i,l,c,f){var j=h.global;try{return h.global=
m.global=i,m.withDoc.call(null,i.document,l,c,f)}finally{h.global=m.global=j}},withDoc:function(j,l,c,f){var o=m.doc,a=i("quirks"),k=i("ie"),b,e,d;try{h.doc=m.doc=j;h.isQuirks=i.add("quirks","BackCompat"==h.doc.compatMode,!0,!0);if(i("ie")&&(d=j.parentWindow)&&d.navigator)b=parseFloat(d.navigator.appVersion.split("MSIE ")[1])||void 0,(e=j.documentMode)&&5!=e&&Math.floor(b)!=e&&(b=e),h.isIE=i.add("ie",b,!0,!0);c&&"string"==typeof l&&(l=c[l]);return l.apply(c,f||[])}finally{h.doc=m.doc=o,h.isQuirks=
i.add("quirks",a,!0,!0),h.isIE=i.add("ie",k,!0,!0)}}};j.mixin(h,m);return m})},"dojo/dom":function(){define("dojo/dom",["./sniff","./_base/lang","./_base/window"],function(h,j,i){if(7>=h("ie"))try{document.execCommand("BackgroundImageCache",!1,!0)}catch(m){}var n={};n.byId=h("ie")?function(h,c){if("string"!=typeof h)return h;var f=c||i.doc,j=h&&f.getElementById(h);if(j&&(j.attributes.id.value==h||j.id==h))return j;f=f.all[h];if(!f||f.nodeName)f=[f];for(var a=0;j=f[a++];)if(j.attributes&&j.attributes.id&&
j.attributes.id.value==h||j.id==h)return j}:function(h,c){return("string"==typeof h?(c||i.doc).getElementById(h):h)||null};n.isDescendant=function(h,c){try{h=n.byId(h);for(c=n.byId(c);h;){if(h==c)return!0;h=h.parentNode}}catch(f){}return!1};n.setSelectable=function(i,c){i=n.byId(i);if(h("mozilla"))i.style.MozUserSelect=c?"":"none";else if(h("khtml")||h("webkit"))i.style.KhtmlUserSelect=c?"auto":"none";else if(h("ie"))for(var f=i.unselectable=c?"":"on",j=i.getElementsByTagName("*"),a=0,k=j.length;a<
k;++a)j.item(a).unselectable=f};return n})},"dojo/dom-style":function(){define("dojo/dom-style",["./sniff","./dom"],function(h,j){function i(d,b,c){b=b.toLowerCase();if(h("ie")){if("auto"==c){if("height"==b)return d.offsetHeight;if("width"==b)return d.offsetWidth}if("fontweight"==b)switch(c){case 700:return"bold";default:return"normal"}}b in a||(a[b]=k.test(b));return a[b]?l(d,c):c}var m,n={};m=h("webkit")?function(a){var b;if(1==a.nodeType){var c=a.ownerDocument.defaultView;b=c.getComputedStyle(a,
null);if(!b&&a.style)a.style.display="",b=c.getComputedStyle(a,null)}return b||{}}:h("ie")&&(9>h("ie")||h("quirks"))?function(a){return 1==a.nodeType&&a.currentStyle?a.currentStyle:{}}:function(a){return 1==a.nodeType?a.ownerDocument.defaultView.getComputedStyle(a,null):{}};n.getComputedStyle=m;var l;l=h("ie")?function(a,b){if(!b)return 0;if("medium"==b)return 4;if(b.slice&&"px"==b.slice(-2))return parseFloat(b);var c=a.style,e=a.runtimeStyle,f=c.left,h=e.left;e.left=a.currentStyle.left;try{c.left=
b,b=c.pixelLeft}catch(i){b=0}c.left=f;e.left=h;return b}:function(a,b){return parseFloat(b)||0};n.toPixelValue=l;var c=function(a,b){try{return a.filters.item("DXImageTransform.Microsoft.Alpha")}catch(c){return b?{}:null}},f=9>h("ie")||h("ie")&&h("quirks")?function(a){try{return c(a).Opacity/100}catch(b){return 1}}:function(a){return m(a).opacity},o=9>h("ie")||h("ie")&&h("quirks")?function(a,b){var e=100*b,f=1==b;a.style.zoom=f?"":1;if(c(a))c(a,1).Opacity=e;else{if(f)return b;a.style.filter+=" progid:DXImageTransform.Microsoft.Alpha(Opacity="+
e+")"}c(a,1).Enabled=!f;if("tr"==a.tagName.toLowerCase())for(e=a.firstChild;e;e=e.nextSibling)"td"==e.tagName.toLowerCase()&&o(e,b);return b}:function(a,b){return a.style.opacity=b},a={left:!0,top:!0},k=/margin|padding|width|height|max|min|offset/,b=h("ie")?"styleFloat":"cssFloat",e={cssFloat:b,styleFloat:b,"float":b};n.get=function(a,b){var c=j.byId(a),h=arguments.length;if(2==h&&"opacity"==b)return f(c);var b=e[b]||b,k=n.getComputedStyle(c);return 1==h?k:i(c,b,k[b]||c.style[b])};n.set=function(a,
b,c){var f=j.byId(a),h=arguments.length,i="opacity"==b,b=e[b]||b;if(3==h)return i?o(f,c):f.style[b]=c;for(var k in b)n.set(a,k,b[k]);return n.getComputedStyle(f)};return n})},"dojo/mouse":function(){define("dojo/mouse",["./_base/kernel","./on","./has","./dom","./_base/window"],function(h,j,i,m,n){function l(c,f){var h=function(a,h){return j(a,c,function(b){if(f)return f(b,h);if(!m.isDescendant(b.relatedTarget,a))return h.call(this,b)})};h.bubble=function(a){return l(c,function(c,b){var e=a(c.target),
d=c.relatedTarget;if(e&&e!=(d&&1==d.nodeType&&a(d)))return b.call(e,c)})};return h}i.add("dom-quirks",n.doc&&"BackCompat"==n.doc.compatMode);i.add("events-mouseenter",n.doc&&"onmouseenter"in n.doc.createElement("div"));i.add("events-mousewheel",n.doc&&"onmousewheel"in n.doc);n=i("dom-quirks")&&i("ie")||!i("dom-addeventlistener")?{LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(c,f){return c.button&f},isLeft:function(c){return c.button&1},isMiddle:function(c){return c.button&4},isRight:function(c){return c.button&
2}}:{LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(c,f){return c.button==f},isLeft:function(c){return 0==c.button},isMiddle:function(c){return 1==c.button},isRight:function(c){return 2==c.button}};h.mouseButtons=n;h=i("events-mousewheel")?"mousewheel":function(c,f){return j(c,"DOMMouseScroll",function(c){c.wheelDelta=-c.detail;f.call(this,c)})};return{_eventHandler:l,enter:l("mouseover"),leave:l("mouseout"),wheel:h,isLeft:n.isLeft,isMiddle:n.isMiddle,isRight:n.isRight}})},"dojo/_base/sniff":function(){define("dojo/_base/sniff",
["./kernel","./lang","../sniff"],function(h,j,i){h._name="browser";j.mixin(h,{isBrowser:!0,isFF:i("ff"),isIE:i("ie"),isKhtml:i("khtml"),isWebKit:i("webkit"),isMozilla:i("mozilla"),isMoz:i("mozilla"),isOpera:i("opera"),isSafari:i("safari"),isChrome:i("chrome"),isMac:i("mac"),isIos:i("ios"),isAndroid:i("android"),isWii:i("wii"),isQuirks:i("quirks"),isAir:i("air")});h.locale=h.locale||(i("ie")?navigator.userLanguage:navigator.language).toLowerCase();return i})},"dojo/keys":function(){define("dojo/keys",
["./_base/kernel","./sniff"],function(h,j){return h.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:j("webkit")?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,
NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,UP_DPAD:175,DOWN_DPAD:176,LEFT_DPAD:177,RIGHT_DPAD:178,copyKey:j("mac")&&!j("air")?j("safari")?91:224:17}})}}});define("frontend/layer/event",[],1);