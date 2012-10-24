//>>built
require({cache:{"url:dijit/form/templates/ValidationTextBox.html":'<div class="dijit dijitReset dijitInline dijitLeft"\n\tid="widget_${id}" role="presentation"\n\t><div class=\'dijitReset dijitValidationContainer\'\n\t\t><input class="dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value="&#935; " type="text" tabIndex="-1" readonly="readonly" role="presentation"\n\t/></div\n\t><div class="dijitReset dijitInputField dijitInputContainer"\n\t\t><input class="dijitReset dijitInputInner" data-dojo-attach-point=\'textbox,focusNode\' autocomplete="off"\n\t\t\t${!nameAttrSetting} type=\'${type}\'\n\t/></div\n></div>\n'}});
define("dijit/form/ValidationTextBox","dojo/_base/declare,dojo/_base/kernel,dojo/i18n,./TextBox,../Tooltip,dojo/text!./templates/ValidationTextBox.html,dojo/i18n!./nls/validate".split(","),function(h,i,j,k,f,l){var g;return g=h("dijit.form.ValidationTextBox",k,{templateString:l,required:!1,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){},state:"",tooltipPosition:[],_deprecateRegExp:function(a,b){b!=g.prototype[a]&&
(i.deprecated("ValidationTextBox id="+this.id+", set('"+a+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0"),this.set("pattern",b))},_setRegExpGenAttr:function(a){this._deprecateRegExp("regExpGen",a);this.regExpGen=this._getPatternAttr},_setRegExpAttr:function(a){this._deprecateRegExp("regExp",a)},_setValueAttr:function(){this.inherited(arguments);this.validate(this.focused)},validator:function(a,b){return RegExp("^(?:"+this._getPatternAttr(b)+")"+(this.required?"":"?")+"$").test(a)&&
(!this.required||!this._isEmpty(a))&&(this._isEmpty(a)||void 0!==this.parse(a,b))},_isValidSubset:function(){return 0==this.textbox.value.search(this._partialre)},isValid:function(){return this.validator(this.textbox.value,this.constraints)},_isEmpty:function(a){return(this.trim?/^\s*$/:/^$/).test(a)},getErrorMessage:function(){var a="$_unset_$"==this.invalidMessage?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage,b="$_unset_$"==this.missingMessage?this.messages.missingMessage:
!this.missingMessage?a:this.missingMessage;return this.required&&this._isEmpty(this.textbox.value)?b:a},getPromptMessage:function(){return this.promptMessage},_maskValidSubsetError:!0,validate:function(a){var b="",c=this.disabled||this.isValid(a);if(c)this._maskValidSubsetError=!0;var d=this._isEmpty(this.textbox.value),e=!c&&a&&this._isValidSubset();this._set("state",c?"":((!this._hasBeenBlurred||a)&&d||e)&&(this._maskValidSubsetError||e&&!this._hasBeenBlurred&&a)?"Incomplete":"Error");this.focusNode.setAttribute("aria-invalid",
c?"false":"true");"Error"==this.state?(this._maskValidSubsetError=a&&e,b=this.getErrorMessage(a)):"Incomplete"==this.state?(b=this.getPromptMessage(a),this._maskValidSubsetError=!this._hasBeenBlurred||a):d&&(b=this.getPromptMessage(a));this.set("message",b);return c},displayMessage:function(a){a&&this.focused?f.show(a,this.domNode,this.tooltipPosition,!this.isLeftToRight()):f.hide(this.domNode)},_refreshState:function(){this._created&&this.validate(this.focused);this.inherited(arguments)},constructor:function(){this.constraints=
{};this.baseClass+=" dijitValidationTextBox"},startup:function(){this.inherited(arguments);this._refreshState()},_setConstraintsAttr:function(a){if(!a.locale&&this.lang)a.locale=this.lang;this._set("constraints",a);this._refreshState()},_setPatternAttr:function(a){this._set("pattern",a)},_getPatternAttr:function(a){var b=this.pattern;"function"==(typeof b).toLowerCase()&&(b=this.pattern(a||this.constraints));if(b!=this._lastRegExp){var c="";this._lastRegExp=b;".*"!=b&&b.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,
function(a){switch(a.charAt(0)){case "{":case "+":case "?":case "*":case "^":case "$":case "|":case "(":c+=a;break;case ")":c+="|$)";break;default:c+="(?:"+a+"|$)"}});try{"".search(c)}catch(d){c=this.pattern,console.warn("RegExp error in "+this.declaredClass+": "+this.pattern)}this._partialre="^(?:"+c+")$"}return b},postMixInProperties:function(){this.inherited(arguments);this.messages=j.getLocalization("dijit.form","validate",this.lang);this._setConstraintsAttr(this.constraints)},_setDisabledAttr:function(a){this.inherited(arguments);
this._refreshState()},_setRequiredAttr:function(a){this._set("required",a);this.focusNode.setAttribute("aria-required",a);this._refreshState()},_setMessageAttr:function(a){this._set("message",a);this.displayMessage(a)},reset:function(){this._maskValidSubsetError=!0;this.inherited(arguments)},_onBlur:function(){this.displayMessage("");this.inherited(arguments)}})});