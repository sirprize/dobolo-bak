//>>built
define("dijit/focus","dojo/aspect,dojo/_base/declare,dojo/dom,dojo/dom-attr,dojo/dom-construct,dojo/Evented,dojo/_base/lang,dojo/on,dojo/domReady,dojo/sniff,dojo/Stateful,dojo/_base/unload,dojo/_base/window,dojo/window,./a11y,./registry,./main".split(","),function(m,r,n,s,o,t,i,y,u,j,v,w,p,q,x,k,l){var g=new (r([v,t],{curNode:null,activeStack:[],constructor:function(){var a=i.hitch(this,function(a){n.isDescendant(this.curNode,a)&&this.set("curNode",null);n.isDescendant(this.prevNode,a)&&this.set("prevNode",
null)});m.before(o,"empty",a);m.before(o,"destroy",a)},registerIframe:function(a){return this.registerWin(a.contentWindow,a)},registerWin:function(a,d){var c=this,e=function(a){c._justMouseDowned=!0;setTimeout(function(){c._justMouseDowned=!1},0);if(!j("ie")||!a||!(a.srcElement&&null==a.srcElement.parentNode))c._onTouchNode(d||a.target||a.srcElement,"mouse")},b=j("ie")?a.document.documentElement:a.document;if(b){if(j("ie")){a.document.body.attachEvent("onmousedown",e);var f=function(a){var b=a.srcElement.tagName.toLowerCase();
"#document"==b||"body"==b||(x.isTabNavigable(a.srcElement)?c._onFocusNode(d||a.srcElement):c._onTouchNode(d||a.srcElement))};b.attachEvent("onfocusin",f);var g=function(a){c._onBlurNode(d||a.srcElement)};b.attachEvent("onfocusout",g);return{remove:function(){a.document.detachEvent("onmousedown",e);b.detachEvent("onfocusin",f);b.detachEvent("onfocusout",g);b=null}}}b.body.addEventListener("mousedown",e,!0);b.body.addEventListener("touchstart",e,!0);var h=function(a){c._onFocusNode(d||a.target)};b.addEventListener("focus",
h,!0);var i=function(a){c._onBlurNode(d||a.target)};b.addEventListener("blur",i,!0);return{remove:function(){b.body.removeEventListener("mousedown",e,!0);b.body.removeEventListener("touchstart",e,!0);b.removeEventListener("focus",h,!0);b.removeEventListener("blur",i,!0);b=null}}}},_onBlurNode:function(){this._clearFocusTimer&&clearTimeout(this._clearFocusTimer);this._clearFocusTimer=setTimeout(i.hitch(this,function(){this.set("prevNode",this.curNode);this.set("curNode",null)}),0);if(!this._justMouseDowned)this._clearActiveWidgetsTimer&&
clearTimeout(this._clearActiveWidgetsTimer),this._clearActiveWidgetsTimer=setTimeout(i.hitch(this,function(){delete this._clearActiveWidgetsTimer;this._setStack([])}),0)},_onTouchNode:function(a,d){this._clearActiveWidgetsTimer&&(clearTimeout(this._clearActiveWidgetsTimer),delete this._clearActiveWidgetsTimer);var c=[];try{for(;a;){var e=s.get(a,"dijitPopupParent");if(e)a=k.byId(e).domNode;else if(a.tagName&&"body"==a.tagName.toLowerCase()){if(a===p.body())break;a=q.get(a.ownerDocument).frameElement}else{var b=
a.getAttribute&&a.getAttribute("widgetId"),f=b&&k.byId(b);f&&!("mouse"==d&&f.get("disabled"))&&c.unshift(b);a=a.parentNode}}}catch(g){}this._setStack(c,d)},_onFocusNode:function(a){a&&9!=a.nodeType&&(this._clearFocusTimer&&(clearTimeout(this._clearFocusTimer),delete this._clearFocusTimer),this._onTouchNode(a),a!=this.curNode&&(this.set("prevNode",this.curNode),this.set("curNode",a)))},_setStack:function(a,d){var c=this.activeStack;this.set("activeStack",a);for(var e=0;e<Math.min(c.length,a.length)&&
!(c[e]!=a[e]);e++);for(var b,f=c.length-1;f>=e;f--)if(b=k.byId(c[f]))b._hasBeenBlurred=!0,b.set("focused",!1),b._focusManager==this&&b._onBlur(d),this.emit("widget-blur",b,d);for(f=e;f<a.length;f++)if(b=k.byId(a[f]))b.set("focused",!0),b._focusManager==this&&b._onFocus(d),this.emit("widget-focus",b,d)},focus:function(a){if(a)try{a.focus()}catch(d){}}}));u(function(){var a=g.registerWin(q.get(p.doc));j("ie")&&w.addOnWindowUnload(function(){a&&(a.remove(),a=null)})});l.focus=function(a){g.focus(a)};
for(var h in g)/^_/.test(h)||(l.focus[h]="function"==typeof g[h]?i.hitch(g,h):g[h]);g.watch(function(a,d,c){l.focus[a]=c});return g});