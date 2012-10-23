define([
    "dojo/_base/declare",
    "dojo/Evented",
    "dojo/dom-geometry",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/dom",
    "dojo/on"
], function (
    declare,
    Evented,
    domGeom,
    lang,
    baseWin,
    dom,
    on
) {
    // https://github.com/phiggins42/plugd
    var throttle = function (cb, wait, thisObj) {
        // summary:
        //      Create a function that will only execute once per `wait` periods.
        // description:
        //      Create a function that will only execute once per `wait` periods
        //      from last execution when called repeatedly. Useful for preventing excessive
        //      calculations in rapidly firing events, such as window.resize, node.mousemove
        //      and so on.
        // cb: Function
        //      The callback to fire.
        // wait: Integer
        //      time to delay before allowing cb to call again.
        // thisObj: Object?
        //      Optional execution context
        var canrun = true;
        return function () {
            if(!canrun) return;
            canrun = false;
            cb.apply(thisObj || cb, arguments);
            setTimeout(function () {
                canrun = true;
            }, wait);
        }
    };
    
    return declare([Evented], {
        scroller: null,
        
        constructor: function (scrollingNode, offsetNodes, topOffset, wait) {console.log('asdf')
            var x,
                wait = wait || 100,
                topOffset = topOffset || 0,
                activeNode = null,
                scrollingNodeTop = (scrollingNode === baseWin.doc) ? 0 : domGeom.position(scrollingNode).y,
                getActiveNode = throttle(function (offsetNodes) {
                    for (x = offsetNodes.length - 1; x >= 0; x -= 1) {
                        if (domGeom.position(offsetNodes[x], false).y <= 0 + topOffset + scrollingNodeTop) {
                            if (activeNode === offsetNodes[x]) { return; }
                            
                            activeNode = offsetNodes[x];
                            
                            this.emit('active', {
                                bubbles: true,
                                cancelable: true,
                                node: offsetNodes[x]
                            });
                            return;
                        }
                    }
                }, wait, this);
            
            this.scroller = on(scrollingNode, 'scroll', lang.hitch(this, function (ev) {
                node = getActiveNode(offsetNodes);
            }));
        },
        
        destroy: function () {
            if (this.scroller && this.scroller.remove) {
                this.scroller.remove();
            }
        }
    });
});