/* ==========================================================
 * Copyright 2012 xsokev
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

define([
    'dojo/_base/declare',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    'dojo/query',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-geometry'
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    query,
    lang,
    win,
    on,
    domClass,
    domStyle,
    domGeom
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: '<div data-dojo-attach-point="containerNode"></div>',
        offsetTop: null,
        offsetBottom: null,
        affixed: null,
        unpin: null,
        
        postCreate: function () {
            this.inherited(arguments);
            this.own(on(win.global, 'scroll', lang.hitch(this, 'checkPosition')));
            this.checkPosition();
        },
        
        checkPosition: function () {
            if (domStyle.get(this.domNode, 'display') === 'none') { return; }

            var pos = domGeom.position(this.domNode, false),
                scrollHeight = win.doc.height,
                scrollTop = win.global.scrollY,
                reset = 'affix affix-top affix-bottom',
                affix,
                offsetTop, 
                offsetBottom;
            
            if (typeof this.offsetTop === 'function') { 
                offsetTop = this.offsetTop(); 
            } else {
                offsetTop = this.offsetTop || 0;
            }
            
            if (typeof this.offsetBottom === 'function') { 
                offsetBottom = this.offsetBottom(); 
            } else {
                offsetBottom = this.offsetBottom || 0;
            }

            affix = this.unpin !== null && (scrollTop + this.unpin <= pos.y) ?
                false    : offsetBottom !== null && (pos.y + pos.h >= scrollHeight - offsetBottom) ?
                'bottom' : offsetTop !== null && scrollTop <= offsetTop ?
                'top'    : false;

            if (this.affixed === affix) { return; }

            this.affixed = affix;
            this.unpin = affix === 'bottom' ? pos.y - scrollTop : null;
            domClass.remove(this.domNode, reset);
            domClass.add(this.domNode, 'affix' + (affix ? '-' + affix : ''));
        }
    });
});