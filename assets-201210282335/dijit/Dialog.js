//>>built
require({cache:{"url:dijit/templates/Dialog.html":'<div class="dijitDialog" role="dialog" aria-labelledby="${id}_title">\n\t<div data-dojo-attach-point="titleBar" class="dijitDialogTitleBar">\n\t\t<span data-dojo-attach-point="titleNode" class="dijitDialogTitle" id="${id}_title"\n\t\t\t\trole="heading" level="1"></span>\n\t\t<span data-dojo-attach-point="closeButtonNode" class="dijitDialogCloseIcon" data-dojo-attach-event="ondijitclick: onCancel" title="${buttonCancel}" role="button" tabIndex="-1">\n\t\t\t<span data-dojo-attach-point="closeText" class="closeText" title="${buttonCancel}">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point="containerNode" class="dijitDialogPaneContent"></div>\n</div>\n'}});
define("dijit/Dialog","require,dojo/_base/array,dojo/_base/connect,dojo/_base/declare,dojo/_base/Deferred,dojo/dom,dojo/dom-class,dojo/dom-geometry,dojo/dom-style,dojo/_base/event,dojo/_base/fx,dojo/i18n,dojo/keys,dojo/_base/lang,dojo/on,dojo/ready,dojo/sniff,dojo/window,dojo/dnd/Moveable,dojo/dnd/TimedMoveable,./focus,./_base/manager,./_Widget,./_TemplatedMixin,./_CssStateMixin,./form/_FormMixin,./_DialogMixin,./DialogUnderlay,./layout/ContentPane,dojo/text!./templates/Dialog.html,./main,dojo/i18n!./nls/common".split(","),
function(w,o,x,t,u,y,p,l,g,q,v,z,j,d,r,A,s,m,B,C,i,n,K,D,E,F,G,e,H,I,J){var n=t("dijit._DialogBase",[D,F,G,E],{templateString:I,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:function(a){this._set("title",a);this.titleNode.innerHTML=a;this.textDir&&(this.applyTextDir(this.titleNode),this.enforceTextDirWithUcc&&(a=this.enforceTextDirWithUcc(null,a)));this.titleBar.title=a},_setTextDirAttr:function(a){this._created&&this.textDir!=a&&(this._set("textDir",
a),this.set("title",this.title))},open:!1,duration:n.defaultDuration,refocus:!0,autofocus:!0,_firstFocusItem:null,_lastFocusItem:null,doLayout:!1,draggable:!0,_setDraggableAttr:function(a){this._set("draggable",a)},"aria-describedby":"",maxRatio:0.9,postMixInProperties:function(){var a=z.getLocalization("dijit","common");d.mixin(this,a);this.inherited(arguments)},postCreate:function(){g.set(this.domNode,{display:"none",position:"absolute"});this.ownerDocumentBody.appendChild(this.domNode);this.inherited(arguments);
this.connect(this,"onExecute","hide");this.connect(this,"onCancel","hide");this._modalconnects=[]},onLoad:function(){this._position();this.autofocus&&h.isTop(this)&&(this._getFocusItems(this.domNode),i.focus(this._firstFocusItem));this.inherited(arguments)},_onBlur:function(a){this.inherited(arguments);var b=d.hitch(this,function(){this.open&&!this._destroyed&&h.isTop(this)&&(this._getFocusItems(this.domNode),i.focus(this._firstFocusItem))});if("mouse"==a)r.once(this.ownerDocument,"mouseup",b);else b()},
_endDrag:function(){var a=l.position(this.domNode),b=m.getBox(this.ownerDocument);a.y=Math.min(Math.max(a.y,0),b.h-a.h);a.x=Math.min(Math.max(a.x,0),b.w-a.w);this._relativePosition=a;this._position()},_setup:function(){var a=this.domNode;this.titleBar&&this.draggable?(this._moveable=new (6==s("ie")?C:B)(a,{handle:this.titleBar}),this.connect(this._moveable,"onMoveStop","_endDrag")):p.add(a,"dijitDialogFixed");this.underlayAttrs={dialogId:this.id,"class":o.map(this["class"].split(/\s/),function(a){return a+
"_underlay"}).join(" "),ownerDocument:this.ownerDocument}},_size:function(){this._checkIfSingleChild();if(this._singleChild){if("undefined"!=typeof this._singleChildOriginalStyle)this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle,delete this._singleChildOriginalStyle}else g.set(this.containerNode,{width:"auto",height:"auto"});var a=l.position(this.domNode),b=m.getBox(this.ownerDocument);b.w*=this.maxRatio;b.h*=this.maxRatio;if(a.w>=b.w||a.h>=b.h){var c=l.position(this.containerNode),
f=Math.min(a.w,b.w)-(a.w-c.w),a=Math.min(a.h,b.h)-(a.h-c.h);if(this._singleChild&&this._singleChild.resize){if("undefined"==typeof this._singleChildOriginalStyle)this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;this._singleChild.resize({w:f,h:a})}else g.set(this.containerNode,{width:f+"px",height:a+"px",overflow:"auto",position:"relative"})}else this._singleChild&&this._singleChild.resize&&this._singleChild.resize()},_position:function(){if(!p.contains(this.ownerDocumentBody,
"dojoMove")){var a=this.domNode,b=m.getBox(this.ownerDocument),c=this._relativePosition,f=c?null:l.position(a);g.set(a,{left:Math.floor(b.l+(c?c.x:(b.w-f.w)/2))+"px",top:Math.floor(b.t+(c?c.y:(b.h-f.h)/2))+"px"})}},_onKey:function(a){if(a.charOrCode){var b=a.target;a.charOrCode===j.TAB&&this._getFocusItems(this.domNode);var c=this._firstFocusItem==this._lastFocusItem;if(b==this._firstFocusItem&&a.shiftKey&&a.charOrCode===j.TAB)c||i.focus(this._lastFocusItem),q.stop(a);else if(b==this._lastFocusItem&&
a.charOrCode===j.TAB&&!a.shiftKey)c||i.focus(this._firstFocusItem),q.stop(a);else{for(;b;){if(b==this.domNode||p.contains(b,"dijitPopup"))if(a.charOrCode==j.ESCAPE)this.onCancel();else return;b=b.parentNode}if(a.charOrCode!==j.TAB)q.stop(a);else if(!s("opera"))try{this._firstFocusItem.focus()}catch(f){}}}},show:function(){if(!this.open){this._started||this.startup();if(!this._alreadyInitialized)this._setup(),this._alreadyInitialized=!0;this._fadeOutDeferred&&(this._fadeOutDeferred.cancel(),h.hide(this));
var a=m.get(this.ownerDocument);this._modalconnects.push(r(a,"scroll",d.hitch(this,"resize")));this._modalconnects.push(r(this.domNode,x._keypress,d.hitch(this,"_onKey")));g.set(this.domNode,{opacity:0,display:""});this._set("open",!0);this._onShow();this._size();this._position();var b;this._fadeInDeferred=new u(d.hitch(this,function(){b.stop();delete this._fadeInDeferred}));b=v.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:d.hitch(this,function(){h.show(this,this.underlayAttrs)}),
onEnd:d.hitch(this,function(){this.autofocus&&h.isTop(this)&&(this._getFocusItems(this.domNode),i.focus(this._firstFocusItem));this._fadeInDeferred.resolve(!0);delete this._fadeInDeferred})}).play();return this._fadeInDeferred}},hide:function(){if(this._alreadyInitialized&&this.open){this._fadeInDeferred&&this._fadeInDeferred.cancel();var a;this._fadeOutDeferred=new u(d.hitch(this,function(){a.stop();delete this._fadeOutDeferred}));this._fadeOutDeferred.then(d.hitch(this,"onHide"));a=v.fadeOut({node:this.domNode,
duration:this.duration,onEnd:d.hitch(this,function(){this.domNode.style.display="none";h.hide(this);this._fadeOutDeferred.resolve(!0);delete this._fadeOutDeferred})}).play();if(this._scrollConnected)this._scrollConnected=!1;for(var b;b=this._modalconnects.pop();)b.remove();this._relativePosition&&delete this._relativePosition;this._set("open",!1);return this._fadeOutDeferred}},resize:function(){"none"!=this.domNode.style.display&&(e._singleton&&e._singleton.layout(),this._size(),this._position())},
destroy:function(){this._fadeInDeferred&&this._fadeInDeferred.cancel();this._fadeOutDeferred&&this._fadeOutDeferred.cancel();this._moveable&&this._moveable.destroy();for(var a;a=this._modalconnects.pop();)a.remove();h.hide(this);this.inherited(arguments)}}),k=t("dijit.Dialog",[H,n],{});k._DialogBase=n;var h=k._DialogLevelManager={_beginZIndex:950,show:function(a,b){c[c.length-1].focus=i.curNode;var d=e._singleton;!d||d._destroyed?d=J._underlay=e._singleton=new e(b):d.set(a.underlayAttrs);var f=c[c.length-
1].dialog?c[c.length-1].zIndex+2:k._DialogLevelManager._beginZIndex;1==c.length&&d.show();g.set(e._singleton.domNode,"zIndex",f-1);g.set(a.domNode,"zIndex",f);c.push({dialog:a,underlayAttrs:b,zIndex:f})},hide:function(a){if(c[c.length-1].dialog==a){c.pop();var b=c[c.length-1];e._singleton._destroyed||(1==c.length?e._singleton.hide():(g.set(e._singleton.domNode,"zIndex",b.zIndex-1),e._singleton.set(b.underlayAttrs)));if(a.refocus){a=b.focus;if(b.dialog&&(!a||!y.isDescendant(a,b.dialog.domNode)))b.dialog._getFocusItems(b.dialog.domNode),
a=b.dialog._firstFocusItem;if(a)try{a.focus()}catch(d){}}}else b=o.indexOf(o.map(c,function(a){return a.dialog}),a),-1!=b&&c.splice(b,1)},isTop:function(a){return c[c.length-1].dialog==a}},c=k._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];s("dijit-legacy-requires")&&A(0,function(){w(["dijit/TooltipDialog"])});return k});