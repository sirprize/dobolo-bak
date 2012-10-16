define([
    './Support',
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/query",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/text!./templates/Alert.html"
], function (
    Support,
    declare,
    _WidgetBase,
    _TemplatedMixin,
    query,
    lang,
    on,
    domClass,
    domStyle,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: template,
        
        postCreate: function () {
            // summary:
            //      Attach event to dismiss this alert if an immediate child-node
            //      has a data-dojo-dismiss="alert" attribute
            var dataAttr = null;
            this.inherited(arguments);
            
            if (this.srcNodeRef.getAttribute('data-dojo-type')) {
                // declarative instantiation assumed > hide template stuff
                domStyle.set(this.dismissNode, 'display', 'none');
                domStyle.set(this.messageNode, 'display', 'none');
            }
            
            query("> *", this.domNode).forEach(lang.hitch(this, function (node) {
                dataAttr = node.getAttribute('data-dojo-dismiss');
                
                if (dataAttr && dataAttr.trim().toLowerCase() === 'alert') {
                    this.own(on(node, 'click', lang.hitch(this, function (ev) {
                        ev.preventDefault();
                        this.close();
                    })));
                }
            }));
        },
        
        close: function () {
            // summary:
            //      Destroy itself after an optional fade transition
            var eventObj = {
                    bubbles: true,
                    cancelable: true
                },
                transition = Support.transition && domClass.contains(this.domNode, 'fade'),
                remove = function () {
                    this.emit('closed', eventObj);
                    this.destroyRecursive();
                };

            this.emit('close', eventObj);
            domClass.remove(this.domNode, 'in');
            
            if (transition) {
                on(this.domNode, Support.transition.end, lang.hitch(this, remove));
            } else {
                lang.hitch(this, remove)();
            }
        },
        
        _setMessageAttr: function (val) {
            this.messageNode.innerHTML = val;
        },
        
        _setClassAttr: function (val) {
            domClass.add(this.domNode, val);
        },
        
        _setDismissableAttr: function (val) {
            domStyle.set(this.dismissNode, 'display', (val) ? 'block' : 'none');
        }
    });
});