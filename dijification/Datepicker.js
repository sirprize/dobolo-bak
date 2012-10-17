define([
     "dojo/_base/declare",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin",
     "dojo/_base/window",
     "dojo/_base/lang",
     "dojo/on",
     "dojo/dom-geometry",
     "./Calendar"
 ], function (
     declare,
     _WidgetBase,
     _TemplatedMixin,
     win,
     lang,
     on,
     domGeom,
     Calendar
) {
    var _parseFormat = function(format) {
        var separator = format.match(/[.\/-].*?/),
            parts = format.split(/\W+/);
        if (!separator || !parts || parts.length === 0){
            throw new Error("Invalid date format.");
        }
        return {separator: separator, parts: parts};
    };
    
    var _parseDate = function(date, format) {
        var today=new Date();
        if (!date) { date = ""; }
        var parts = date.split(format.separator),
            val;
        date = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0);

        if (parts.length === format.parts.length) {
            for (var i=0, cnt = format.parts.length; i < cnt; i++) {
                val = parseInt(parts[i], 10)||1;
                switch(format.parts[i]) {
                    case 'dd':
                    case 'd':
                        date.setDate(val);
                        break;
                    case 'mm':
                    case 'm':
                        date.setMonth(val - 1);
                        break;
                    case 'yy':
                        date.setFullYear(2000 + val);
                        break;
                    case 'yyyy':
                        date.setFullYear(val);
                        break;
                }
            }
        }
        return date;
    };
    
    var _formatDate = function(date, format){
        var val = {
            d: date.getDate(),
            m: date.getMonth() + 1,
            yy: date.getFullYear().toString().substring(2),
            yyyy: date.getFullYear()
        };
        val.dd = (val.d < 10 ? '0' : '') + val.d;
        val.mm = (val.m < 10 ? '0' : '') + val.m;
        date = [];

        for (var i=0, cnt = format.parts.length; i < cnt; i++) {
            date.push(val[format.parts[i]]);
        }
        return date.join(format.separator);
    };
    
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: '<input data-dojo-attach-point="containerNode"/>',
        format: null,
        weekStart: 0,
        
        _setFormatAttr: function (val) {
            this._set('format', _parseFormat(val || 'mm/dd/yyyy'));
        },
        
        _setWeekStartAttr: function (val) {
            this._set('weekStart', val || 0);
        },
        
        postCreate: function () {
            var position = function () {
                    var pos = domGeom.position(this.domNode, true);
                    this.calendar.set('posTop', (pos.y + this.domNode.offsetHeight) + 'px');
                    this.calendar.set('posLeft', pos.x + 'px');
                    this.calendar.position();
                },
                show = function () {
                    this.calendar.placeAt(document.body, 'last');
                    this.calendar.show();
                },
                update = function () {
                    this.calendar.update();
                },
                blur = function () {
                    this.calendar.hide();
                },
                keydown = function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 9 || keyCode === 13) { this.calendar.hide(); }
                };
            
            this.own(this.calendar = new Calendar({
                weekStart: this.weekStart,
                date: _parseDate(this.domNode.value, this.format)
            }));
            
            this.calendar.watch('date', lang.hitch(this, function (prop, oldVal, val) {
                this.domNode.value = _formatDate(val, this.format);
                this.set('date', val);
            }));
            
            this.calendar.on('show', function (ev) {
                this.emit('show', ev);
            });
            
            this.calendar.on('hide', function (ev) {
                this.emit('hide', ev);
            });
            
            this.calendar.startup();
            lang.hitch(this, position)();
            this.own(on(this.domNode, 'focus', lang.hitch(this, show)));
            this.own(on(this.domNode, 'click', lang.hitch(this, show)));
            this.own(on(this.domNode, 'blur', lang.hitch(this, blur)));
            this.own(on(this.domNode, 'keyup', lang.hitch(this, update)));
            this.own(on(this.domNode, 'keydown', lang.hitch(this, keydown)));
            this.own(on(win.global, 'resize', lang.hitch(this, position)));
        }
    });
});