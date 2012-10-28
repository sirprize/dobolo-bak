//>>built
require({cache:{"dobolo/Affix":function(){define("dobolo/Affix","dojo/_base/declare,dojo/_base/lang,dojo/_base/window,dojo/on,dojo/dom-class,dojo/dom-style,dojo/dom-geometry".split(","),function(b,h,f,k,a,d,e){return b([],{offsetTop:0,offsetBottom:0,affixed:null,unpin:null,scroller:null,constructor:function(a,e){a=a||{};this.node=e;this.offsetTop=a.offsetTop||0;this.offsetBottom=a.offsetBottom||0;this.scroller=k(f.doc,"scroll",h.hitch(this,"checkPosition"));this.checkPosition()},checkPosition:function(){if("none"!==
d.get(this.node,"display")){var g=e.position(this.node,!1),i=f.doc.height,l=f.global.scrollY,b,o;b="function"===typeof this.offsetTop?this.offsetTop():this.offsetTop;o="function"===typeof this.offsetBottom?this.offsetBottom():this.offsetBottom;i=null!==this.unpin&&l+this.unpin<=g.y?!1:null!==o&&g.y+g.h>=i-o?"bottom":null!==b&&l<=b?"top":!1;if(this.affixed!==i)this.affixed=i,this.unpin="bottom"===i?g.y-l:null,a.remove(this.node,"affix affix-top affix-bottom"),a.add(this.node,"affix"+(i?"-"+i:""))}},
destroy:function(){this.scroller&&this.scroller.remove&&this.scroller.remove()}})})},"dobolo/Alert":function(){require({cache:{"url:dobolo/templates/Alert.html":'<div class="alert" data-dojo-attach-point="containerNode">\n    <button data-dojo-attach-point="closeNode" class="close">&times;</button>\n    <div data-dojo-attach-point="contentNode"></div>\n</div>'}});define("dobolo/Alert","./Util,dojo/_base/declare,dijit/_WidgetBase,dijit/_TemplatedMixin,dojo/query,dojo/_base/lang,dojo/on,dojo/dom-attr,dojo/dom-class,dojo/dom-style,dojo/text!./templates/Alert.html".split(","),
function(b,h,f,k,a,d,e,g,i,l,n){return h([f,k],{templateString:n,closable:!0,postCreate:function(){this.inherited(arguments);g.get(this.srcNodeRef,"data-dojo-type")&&(l.set(this.closeNode,"display","none"),l.set(this.contentNode,"display","none"));a("> *",this.domNode).forEach(d.hitch(this,function(a){i.contains(a,"close")&&this.own(e(a,"click",d.hitch(this,function(a){a.preventDefault();this.close()})))}))},close:function(){var a={bubbles:!0,cancelable:!0},l=b.transition&&i.contains(this.domNode,
"fade"),g=function(){this.emit("closed",a);this.destroyRecursive()};this.emit("close",a);i.remove(this.domNode,"in");l?e(this.domNode,b.transition.end,d.hitch(this,g)):d.hitch(this,g)()},_setContentAttr:function(a){this.contentNode.innerHTML=a},_setClassAttr:function(a){i.add(this.domNode,a)},_setClosableAttr:function(a){l.set(this.closeNode,"display",a?"block":"none")}})})},"dobolo/Util":function(){define("dobolo/Util",[],function(){return{transition:function(){var b;a:{b=document.createElement("bootstrap");
var h={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},f;for(f in h)if(void 0!==b.style[f]){console.log(f);b=h[f];break a}b=void 0}return b&&{end:b}}(),throttle:function(b,h,f){var k=!0;return function(){k&&(k=!1,b.apply(f||b,arguments),setTimeout(function(){k=!0},h))}}}})},"url:dobolo/templates/Alert.html":'<div class="alert" data-dojo-attach-point="containerNode">\n    <button data-dojo-attach-point="closeNode" class="close">&times;</button>\n    <div data-dojo-attach-point="contentNode"></div>\n</div>',
"dobolo/Button":function(){define("dobolo/Button","dojo/_base/declare,dijit/form/_FormWidget,dijit/form/_ButtonMixin,dijit/registry,dojo/_base/array,dojo/_base/lang,dojo/dom-class,dojo/dom-attr,dojo/domReady!".split(","),function(b,h,f,k,a,d,e,g){return b([h,f],{templateString:'<button ${!nameAttrSetting} type="${type}" value="${value}" data-dojo-attach-point="containerNode,focusNode,valueNode,labelNode" data-dojo-attach-event="onclick:_onClick"></button>',loadingText:"Loading...",resetText:"Loaded",
mode:null,group:null,postCreate:function(){this.inherited(arguments);("radio"===this.mode||"checkbox"===this.mode)&&this.own(this.on("click",d.hitch(this,function(){this.toggle()})))},loading:function(){this.domNode.innerHTML=this.loadingText;e.add(this.domNode,"disabled");g.set(this.domNode,"disabled","disabled")},reset:function(){this.domNode.innerHTML=this.resetText;e.remove(this.domNode,"disabled");g.remove(this.domNode,"disabled")},toggle:function(){"radio"===this.mode&&this.deactivateGroup();
e.toggle(this.domNode,"active")},deactivateGroup:function(){a.forEach(k.toArray(),d.hitch(this,function(a){"radio"===a.get("mode")&&a.get("group")===this.group&&e.remove(a.domNode,"active")}))}})})},"dobolo/Calendar":function(){require({cache:{"url:dobolo/templates/Calendar.html":'<div class="calendar dropdown-menu">\n    <div class="calendar-days">\n        <table class="table-condensed">\n            <thead>\n                <tr>\n                    <th class="prev"><i class="icon-arrow-left"/></th>\n                    <th colspan="5" class="switch"></th>\n                    <th class="next"><i class="icon-arrow-right"/></th>\n                </tr>\n            </thead>\n            <tbody></tbody>\n        </table>\n    </div>\n    <div class="calendar-months">\n        <table class="table-condensed">\n            <thead>\n                <tr>\n                    <th class="prev"><i class="icon-arrow-left"/></th>\n                    <th colspan="5" class="switch"></th>\n                    <th class="next"><i class="icon-arrow-right"/></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td colspan="7"></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <div class="calendar-years">\n        <table class="table-condensed">\n            <thead>\n                <tr>\n                    <th class="prev"><i class="icon-arrow-left"/></th>\n                    <th colspan="5" class="switch"></th>\n                    <th class="next"><i class="icon-arrow-right"/></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td colspan="7"></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>'}});
define("dobolo/Calendar","dojo/_base/declare,dijit/_WidgetBase,dijit/_TemplatedMixin,dojo/date,dojo/query,dojo/_base/lang,dojo/on,dojo/dom-class,dojo/dom-attr,dojo/dom-construct,dojo/dom-style,dojo/text!./templates/Calendar.html,dojo/i18n!dojo/cldr/nls/gregorian,dojo/NodeList-dom,dojo/NodeList-traverse".split(","),function(b,h,f,k,a,d,e,g,i,l,n,o,m){var p=[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}];return b([h,
f],{templateString:o,weekStart:0,posTop:0,posLeft:0,viewMode:0,date:new Date,viewDate:new Date,_setPosTop:function(a){this._set("posTop",a)},_setPosLeft:function(a){this._set("posLeft",a)},_setDateAttr:function(a){this._set("date",a)},_setWeekStartAttr:function(a){this._set("weekStart",a||0)},postCreate:function(){this.own(e(this.domNode,"mousedown",d.hitch(this,"mousedown")));this.own(e(this.domNode,"click",function(a){a.stopPropagation();a.preventDefault()}));this.weekEnd=0===this.weekStart?6:this.weekStart-
1;this.fillDow();this.fillMonths();this.update(this.date);this.showMode()},position:function(){n.set(this.domNode,{left:this.posLeft,top:this.posTop})},show:function(){n.set(this.domNode,"display","block");this.emit("show",{bubbles:!0,cancelable:!0,date:this.date})},hide:function(){n.set(this.domNode,"display","none");this.viewMode=0;this.showMode();this.emit("hide",{bubbles:!0,cancelable:!0,date:this.date})},update:function(a){var c=new Date;this.date=a instanceof Date?new Date(a.getFullYear(),a.getMonth(),
a.getDate(),0,0,0):new Date(c.getFullYear(),c.getMonth(),c.getDate(),0,0,0);this.viewDate=new Date(this.date);this.fill()},fillDow:function(){for(var j=this.weekStart,c="<tr>";j<this.weekStart+7;)c+='<th class="dow">'+m["days-standAlone-narrow"][j++%7]+"</th>";l.place(c+"</tr>",a(".calendar-days thead",this.domNode)[0])},fillMonths:function(){for(var j="",c=0;12>c;)j+='<span class="month" data-dojo-month="'+c+'">'+m["months-standAlone-abbr"][c++]+"</span>";l.place(j,a(".calendar-months td",this.domNode)[0])},
fill:function(){var j,c=[],e=new Date(this.viewDate),b=e.getFullYear(),f=e.getMonth(),i=this.date.valueOf(),e=this.date.getFullYear(),d=new Date(b,f-1,28,0,0,0,0);j=k.getDaysInMonth(d);a(".calendar-days th.switch",this.domNode)[0].innerHTML=m["months-standAlone-wide"][f]+" "+b;d.setDate(j);d.setDate(j-(d.getDay()-this.weekStart+7)%7);var h=new Date(d);h.setDate(h.getDate()+42);for(h=h.valueOf();d.valueOf()<h;)d.getDay()===this.weekStart&&c.push("<tr>"),j="",d.getMonth()<f?j+=" old":d.getMonth()>f&&
(j+=" new"),d.valueOf()===i&&(j+=" active"),c.push('<td class="day'+j+'">'+d.getDate()+"</td>"),d.getDay()===this.weekEnd&&c.push("</tr>"),d.setDate(d.getDate()+1);l.empty(a(".calendar-days tbody",this.domNode)[0]);l.place(c.join(" "),a(".calendar-days tbody",this.domNode)[0]);c=a(".calendar-months",this.domNode);a("th.switch",c[0])[0].innerHTML=b;a("span",c[0]).removeClass("active");e===b&&g.add(a("span",c[0])[this.date.getMonth()],"active");c="";b=10*parseInt(b/10,10);f=a(".calendar-years",this.domNode);
a("th.switch",f[0]).innerHTML=b+"-"+(b+9);f=a("td",f[0]);b-=1;for(i=-1;11>i;i++)c+='<span class="year'+(-1===i||10===i?" old":"")+(e===b?" active":"")+'">'+b+"</span>",b+=1;f[0].innerHTML=c},mousedown:function(b){var c,e;b.stopPropagation();b.preventDefault();c=a(b.target).closest("span, td, th");if(1===c.length)switch(c[0].nodeName.toLowerCase()){case "th":switch(c[0].className){case "switch":this.showMode(1);break;case "prev":case "next":this.viewDate["set"+p[this.viewMode].navFnc].call(this.viewDate,
this.viewDate["get"+p[this.viewMode].navFnc].call(this.viewDate)+p[this.viewMode].navStep*("prev"===c[0].className?-1:1)),this.fill()}break;case "span":g.contains(c[0],"month")?(b=i.get(c[0],"data-dojo-month"),this.viewDate.setMonth(b)):(c=parseInt(c[0].innerText||c[0].textContent,10)||0,this.viewDate.setFullYear(c));this.showMode(-1);this.fill();break;case "td":g.contains(c[0],"day")&&(e=parseInt(c[0].innerText||c[0].textContent,10)||1,b=this.viewDate.getMonth(),g.contains(c[0],"old")?b-=1:g.contains(c[0],
"new")&&(b+=1),c=this.viewDate.getFullYear(),this.set("date",new Date(c,b,e,0,0,0,0)),this.set("viewDate",new Date(c,b,e,0,0,0,0)),this.fill(),this.hide())}},showMode:function(b){if(b)this.viewMode=Math.max(0,Math.min(2,this.viewMode+b));a(">div",this.domNode).forEach(function(a){n.set(a,"display","none")});a(">div.calendar-"+p[this.viewMode].clsName,this.domNode).forEach(function(a){n.set(a,"display","block")})}})})},"url:dobolo/templates/Calendar.html":'<div class="calendar dropdown-menu">\n    <div class="calendar-days">\n        <table class="table-condensed">\n            <thead>\n                <tr>\n                    <th class="prev"><i class="icon-arrow-left"/></th>\n                    <th colspan="5" class="switch"></th>\n                    <th class="next"><i class="icon-arrow-right"/></th>\n                </tr>\n            </thead>\n            <tbody></tbody>\n        </table>\n    </div>\n    <div class="calendar-months">\n        <table class="table-condensed">\n            <thead>\n                <tr>\n                    <th class="prev"><i class="icon-arrow-left"/></th>\n                    <th colspan="5" class="switch"></th>\n                    <th class="next"><i class="icon-arrow-right"/></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td colspan="7"></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <div class="calendar-years">\n        <table class="table-condensed">\n            <thead>\n                <tr>\n                    <th class="prev"><i class="icon-arrow-left"/></th>\n                    <th colspan="5" class="switch"></th>\n                    <th class="next"><i class="icon-arrow-right"/></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td colspan="7"></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>',
"dobolo/DatepickerInput":function(){define("dobolo/DatepickerInput","dojo/_base/declare,dijit/_WidgetBase,dijit/_TemplatedMixin,dojo/_base/window,dojo/_base/lang,dojo/date/locale,dojo/on,dojo/dom-geometry,./Calendar".split(","),function(b,h,f,k,a,d,e,g,i){return b([h,f],{templateString:'<input type="text" data-dojo-attach-point="containerNode"/>',format:"full",date:null,weekStart:0,_setFormatAttr:function(a){this._set("format","long"===a||"short"===a||"medium"===a||"full"===a?a:"long")},_setWeekStartAttr:function(a){this._set("weekStart",
a)},_setDateAttr:function(a){this._set("date",a instanceof Date?a:new Date);this.domNode.value=d.format(this.get("date"),{selector:"date",formatLength:this.get("format")})},positionCalendar:function(a){var b=g.position(a,!0);this.calendar.set("posTop",b.y+a.offsetHeight+"px");this.calendar.set("posLeft",b.x+"px");this.calendar.position()},showCalendar:function(){this.calendar.placeAt(document.body,"last");this.calendar.show()},updateCalendar:function(){this.calendar.update()},hideCalendar:function(){this.calendar.hide()},
postCreate:function(){this.inherited(arguments);if(this.get("date")instanceof Date)this.domNode.value=d.format(this.get("date"),{selector:"date",formatLength:this.get("format")});this.own(this.calendar=new i({weekStart:this.weekStart,date:this.date}));this.calendar.watch("date",a.hitch(this,function(a,b,e){this.domNode.value=d.format(e,{selector:"date",formatLength:this.get("format")});this.set("date",e)}));this.calendar.on("show",a.hitch(this,function(){this.emit("show-calendar",{bubbles:!0,cancelable:!0})}));
this.calendar.on("hide",a.hitch(this,function(){this.emit("hide-calendar",{bubbles:!0,cancelable:!0})}));this.calendar.startup();a.hitch(this,"positionCalendar",this.domNode)();this.own(e(k.global,"resize",a.hitch(this,"positionCalendar",this.domNode)));this.own(e(this.domNode,"focus",a.hitch(this,"showCalendar")));this.own(e(this.domNode,"click",a.hitch(this,"showCalendar")));this.own(e(this.domNode,"blur",a.hitch(this,"hideCalendar")));this.own(e(this.domNode,"keyup",a.hitch(this,"updateCalendar")));
this.own(e(this.domNode,"keydown",a.hitch(this,function(a){(9===a.keyCode||13===a.keyCode)&&this.calendar.hide()})))}})})},"dobolo/ScrollSpy":function(){define("dobolo/ScrollSpy","dojo/_base/declare,./ScrollTopSpyHelper,dojo/_base/window,dojo/dom-class,dojo/dom-attr,dojo/query,dojo/on".split(","),function(b,h,f,k,a,d){return b([],{helper:null,handle:null,constructor:function(b,g){var b=b||{},g=!g||g&&"BODY"===g.tagName?f.doc:g,i=b.offsetsSelector?d(b.offsetsSelector,g):[],l=b.targetSelector?b.targetSelector:
null;this.helper=new h(g,i,b.offsetTop||0,b.wait||100);this.handle=this.helper.on("active",function(b){d(l+" li").forEach(function(e){d("> a",e).forEach(function(d){d=(a.get(d,"href")||"").replace(/^#/,"");k[d===b.node.id?"add":"remove"](e,"active")})})})},destroy:function(){this.helper.destroy();this.handle&&this.handle.remove&&this.handle.remove()}})})},"dobolo/ScrollTopSpyHelper":function(){define("dobolo/ScrollTopSpyHelper","dojo/_base/declare,dojo/Evented,dojo/dom-geometry,dojo/_base/lang,dojo/_base/window,dojo/dom,dojo/on,./Util".split(","),
function(b,h,f,k,a,d,e,g){return b([h],{scroller:null,constructor:function(b,d,h,o){var m,h=h||0,p=null,j=g.throttle(function(c){var d=b===a.doc?0:f.position(b).y;for(m=c.length-1;0<=m;m-=1)if(f.position(c[m],!1).y<=0+h+d){if(p===c[m])break;p=c[m];this.emit("active",{bubbles:!0,cancelable:!0,node:c[m]});break}},o||100,this);this.scroller=e(b,"scroll",k.hitch(this,function(){node=j(d)}))},destroy:function(){this.scroller&&this.scroller.remove&&this.scroller.remove()}})})}}});
require(["dojo/parser","dojo/domReady!"],function(){window.prettyPrint&&prettyPrint()});