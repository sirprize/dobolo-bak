//>>built
define("dijit/layout/BorderContainer","dojo/_base/array,dojo/cookie,dojo/_base/declare,dojo/dom-class,dojo/dom-construct,dojo/dom-geometry,dojo/dom-style,dojo/_base/event,dojo/keys,dojo/_base/lang,dojo/on,dojo/touch,../_WidgetBase,../_Widget,../_TemplatedMixin,./_LayoutWidget,./utils".split(","),function(g,m,f,d,h,i,j,n,k,l,o,r,u,p,q,v,w){var s=f("dijit.layout._Splitter",[p,q],{live:!0,templateString:'<div class="dijitSplitter" data-dojo-attach-event="onkeypress:_onKeyPress,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse" tabIndex="0" role="separator"><div class="dijitSplitterThumb"></div></div>',
constructor:function(){this._handlers=[]},postMixInProperties:function(){this.inherited(arguments);this.horizontal=/top|bottom/.test(this.region);this._factor=/top|left/.test(this.region)?1:-1;this._cookieName=this.container.id+"_"+this.region},buildRendering:function(){this.inherited(arguments);d.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));if(this.container.persist){var a=m(this._cookieName);a&&(this.child.domNode.style[this.horizontal?"height":"width"]=a)}},_computeMaxSize:function(){var a=
this.horizontal?"h":"w",b=i.getMarginBox(this.child.domNode)[a],c=g.filter(this.container.getChildren(),function(a){return"center"==a.region})[0],a=i.getMarginBox(c.domNode)[a];return Math.min(this.child.maxSize,b+a)},_startDrag:function(a){if(!this.cover)this.cover=h.place("<div class=dijitSplitterCover></div>",this.child.domNode,"after");d.add(this.cover,"dijitSplitterCoverActive");this.fake&&h.destroy(this.fake);if(!(this._resize=this.live))(this.fake=this.domNode.cloneNode(!0)).removeAttribute("id"),
d.add(this.domNode,"dijitSplitterShadow"),h.place(this.fake,this.domNode,"after");d.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");this.fake&&d.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");var b=this._factor,c=this.horizontal,e=c?"pageY":"pageX",x=a[e],f=this.domNode.style,g=i.getMarginBox(this.child.domNode)[c?"h":"w"],j=this._computeMaxSize(),y=this.child.minSize||20,c=this.region,k="top"==c||"bottom"==c?"top":"left",
m=parseInt(f[k],10),p=this._resize,q=l.hitch(this.container,"_layoutChildren",this.child.id),c=this.ownerDocument;this._handlers=this._handlers.concat([o(c,r.move,this._drag=function(a,c){var d=a[e]-x,h=b*d+g,i=Math.max(Math.min(h,j),y);(p||c)&&q(i);f[k]=d+m+b*(i-h)+"px"}),o(c,"dragstart",n.stop),o(this.ownerDocumentBody,"selectstart",n.stop),o(c,r.release,l.hitch(this,"_stopDrag"))]);n.stop(a)},_onMouse:function(a){a="mouseover"==a.type||"mouseenter"==a.type;d.toggle(this.domNode,"dijitSplitterHover",
a);d.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",a)},_stopDrag:function(a){try{this.cover&&d.remove(this.cover,"dijitSplitterCoverActive"),this.fake&&h.destroy(this.fake),d.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow"),this._drag(a),this._drag(a,!0)}finally{this._cleanupHandlers(),delete this._drag}this.container.persist&&m(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365})},
_cleanupHandlers:function(){for(var a;a=this._handlers.pop();)a.remove()},_onKeyPress:function(a){this._resize=!0;var b=this.horizontal,c=1;switch(a.charOrCode){case b?k.UP_ARROW:k.LEFT_ARROW:c*=-1;case b?k.DOWN_ARROW:k.RIGHT_ARROW:break;default:return}b=i.getMarginSize(this.child.domNode)[b?"h":"w"]+this._factor*c;this.container._layoutChildren(this.child.id,Math.max(Math.min(b,this._computeMaxSize()),this.child.minSize));n.stop(a)},destroy:function(){this._cleanupHandlers();delete this.child;delete this.container;
delete this.cover;delete this.fake;this.inherited(arguments)}}),t=f("dijit.layout._Gutter",[p,q],{templateString:'<div class="dijitGutter" role="presentation"></div>',postMixInProperties:function(){this.inherited(arguments);this.horizontal=/top|bottom/.test(this.region)},buildRendering:function(){this.inherited(arguments);d.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"))}}),f=f("dijit.layout.BorderContainer",v,{design:"headline",gutters:!0,liveSplitters:!0,persist:!1,baseClass:"dijitBorderContainer",
_splitterClass:s,postMixInProperties:function(){this.gutters||(this.baseClass+="NoGutter");this.inherited(arguments)},startup:function(){this._started||(g.forEach(this.getChildren(),this._setupChild,this),this.inherited(arguments))},_setupChild:function(a){var b=a.region;if(b){this.inherited(arguments);d.add(a.domNode,this.baseClass+"Pane");var c=this.isLeftToRight();"leading"==b&&(b=c?"left":"right");"trailing"==b&&(b=c?"right":"left");if("center"!=b&&(a.splitter||this.gutters)&&!a._splitterWidget){var e=
a.splitter?this._splitterClass:t;l.isString(e)&&(e=l.getObject(e));e=new e({id:a.id+"_splitter",container:this,child:a,region:b,live:this.liveSplitters});e.isSplitter=!0;a._splitterWidget=e;h.place(e.domNode,a.domNode,"bottom"==b||b==(c?"right":"left")?"before":"after");e.startup()}a.region=b}},layout:function(){this._layoutChildren()},addChild:function(a,b){this.inherited(arguments);this._started&&this.layout()},removeChild:function(a){var b=a.region,c=a._splitterWidget;c&&(c.destroy(),delete a._splitterWidget);
this.inherited(arguments);this._started&&this._layoutChildren();d.remove(a.domNode,this.baseClass+"Pane");j.set(a.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});j.set(a.domNode,"top"==b||"bottom"==b?"width":"height","auto")},getChildren:function(){return g.filter(this.inherited(arguments),function(a){return!a.isSplitter})},getSplitter:function(a){return g.filter(this.getChildren(),function(b){return b.region==a})[0]._splitterWidget},resize:function(a,b){if(!this.cs||
!this.pe){var c=this.domNode;this.cs=j.getComputedStyle(c);this.pe=i.getPadExtents(c,this.cs);this.pe.r=j.toPixelValue(c,this.cs.paddingRight);this.pe.b=j.toPixelValue(c,this.cs.paddingBottom);j.set(c,"padding","0px")}this.inherited(arguments)},_layoutChildren:function(a,b){if(this._borderBox&&this._borderBox.h){var c=g.map(this.getChildren(),function(a,b){return{pane:a,weight:["center"==a.region?Infinity:0,a.layoutPriority,("sidebar"==this.design?1:-1)*(/top|bottom/.test(a.region)?1:-1),b]}},this);
c.sort(function(a,b){for(var c=a.weight,e=b.weight,d=0;d<c.length;d++)if(c[d]!=e[d])return c[d]-e[d];return 0});var e=[];g.forEach(c,function(a){a=a.pane;e.push(a);a._splitterWidget&&e.push(a._splitterWidget)});w.layoutChildren(this.domNode,{l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h},e,a,b)}},destroyRecursive:function(){g.forEach(this.getChildren(),function(a){var b=a._splitterWidget;b&&b.destroy();delete a._splitterWidget});this.inherited(arguments)}});f.ChildWidgetProperties=
{region:"",layoutPriority:0,splitter:!1,minSize:0,maxSize:Infinity};l.extend(u,f.ChildWidgetProperties);f._Splitter=s;f._Gutter=t;return f});