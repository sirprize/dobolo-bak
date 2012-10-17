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
     "dojo/_base/declare",
     "dijit/_WidgetBase",
     "dijit/_TemplatedMixin",
     "dojo/date",
     "dojo/query",
     "dojo/_base/lang",
     "dojo/on",
     "dojo/dom-class",
     "dojo/dom-attr",
     "dojo/dom-construct",
     "dojo/dom-style",
     "dojo/text!./templates/Calendar.html",
     "dojo/NodeList-dom",
     "dojo/NodeList-traverse"
 ], function (
     declare,
     _WidgetBase,
     _TemplatedMixin,
     date,
     query,
     lang,
     on,
     domClass,
     domAttr,
     domConstruct,
     domStyle,
     _template
 ) {

    var _modes = [
        { clsName: 'days', navFnc: 'Month', navStep: 1 },
        { clsName: 'months', navFnc: 'FullYear', navStep: 1 },
        { clsName: 'years', navFnc: 'FullYear', navStep: 10 }
    ];
    
    var _dates = {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
    
    var _getDaysInMonth = function (d) {
        return [31, (date.isLeapYear(d) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][d.getMonth()];
    };

    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: _template,
        weekStart: 0,
        posTop: 0,
        posLeft: 0,
        viewMode: 0,
        date: new Date(), // the selected date
        viewDate: new Date(), // the date currently paged to by the user
        
        _setPosTop: function (val) {
            this._set('posTop', val);
        },
        
        _setPosLeft: function (val) {
            this._set('posLeft', val);
        },
        
        _setDateAttr: function (val) {
            this._set('date', val);
        },
        
        _setWeekStartAttr: function (val) {
            this._set('weekStart', val || 0);
        },
        
        postCreate: function () {
            this.own(on(this.domNode, 'mousedown', lang.hitch(this, 'mousedown')));
            
            this.own(on(this.domNode, 'click', function (e) {
                e.stopPropagation();
                e.preventDefault();
            }));
            
            this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
            this.fillDow();
            this.fillMonths();
            this.update(this.date);
            this.showMode();
        },
        
        position: function () {
            domStyle.set(this.domNode, {
                left: this.posLeft,
                top: this.posTop
            });
        },
        
        show: function () {
            domStyle.set(this.domNode, 'display', 'block');
            this.emit('show', {
                bubbles: true,
                cancelable: true,
                date: this.date
            });
        },
        
        hide: function (e) {
            domStyle.set(this.domNode, 'display', 'none');
            this.viewMode = 0;
            this.showMode();
            this.emit('hide', {
                bubbles: true,
                cancelable: true,
                date: this.date
            });
        },

        update: function (d) {
            var now = new Date();
            this.date = (d && d.getFullYear) ? d : new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
            this.viewDate = new Date(this.date);
            this.fill();
        },
        
        fillDow: function () {
            var dowCnt = this.weekStart,
                html = '<tr>';
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">'+_dates.daysMin[(dowCnt++)%7]+'</th>';
            }
            html += '</tr>';
            domConstruct.place(html, query('.calendar-days thead', this.domNode)[0]);
        },
        
        fillMonths: function () {
            var html = '',
                i = 0;
            while (i < 12) {
                html += '<span class="month" data-dojo-month="'+i+'">'+_dates.monthsShort[i++]+'</span>';
            }
            domConstruct.place(html, query('.calendar-months td', this.domNode)[0]);
        },
        
        fill: function (item) {
            var clsName,
                html = [],
                d = new Date(this.viewDate),
                year = d.getFullYear(),
                month = d.getMonth(),
                currentDate = this.date.valueOf(),
                currentYear = this.date.getFullYear(),
                prevMonth = new Date(year, month-1, 28,0,0,0,0),
                day = _getDaysInMonth(prevMonth);

            query('.calendar-days th.switch', this.domNode)[0].innerHTML = _dates.months[month]+' '+year;

            prevMonth.setDate(day);
            prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);

            var nextMonth = new Date(prevMonth);
            nextMonth.setDate(nextMonth.getDate() + 42);
            nextMonth = nextMonth.valueOf();

            while(prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getDay() === this.weekStart) {
                    html.push('<tr>');
                }
                clsName = '';
                if (prevMonth.getMonth() < month) {
                    clsName += ' old';
                } else if (prevMonth.getMonth() > month) {
                    clsName += ' new';
                }
                if (prevMonth.valueOf() === currentDate) {
                    clsName += ' active';
                }
                html.push('<td class="day'+clsName+'">'+prevMonth.getDate() + '</td>');
                if (prevMonth.getDay() === this.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setDate(prevMonth.getDate()+1);
            }
            domConstruct.empty(query('.calendar-days tbody', this.domNode)[0]);
            domConstruct.place(html.join(' '), query('.calendar-days tbody', this.domNode)[0]);

            var months = query('.calendar-months', this.domNode);
            query('th.switch', months[0])[0].innerHTML = year;
            query('span', months[0]).removeClass('active');
            if (currentYear === year) {
                domClass.add(query('span', months[0])[this.date.getMonth()], 'active');
            }

            html = '';
            year = parseInt(year/10, 10) * 10;

            var yearCont = query('.calendar-years', this.domNode);
            query('th.switch', yearCont[0]).innerHTML = year + '-' + (year + 9);
            yearCont = query('td', yearCont[0]);

            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year'+(i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active' : '')+'">'+year+'</span>';
                year += 1;
            }
            yearCont[0].innerHTML = html;
        },
        
        mousedown: function (e) {
            var month, year, day;
            e.stopPropagation();
            e.preventDefault();
            var target = query(e.target).closest('span, td, th');
            if (target.length === 1) {
                switch(target[0].nodeName.toLowerCase()) {
                    case 'th':
                        switch(target[0].className) {
                            case 'switch':
                                this.showMode(1);
                                break;
                            case 'prev':
                            case 'next':
                                this.viewDate['set'+_modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get'+_modes[this.viewMode].navFnc].call(this.viewDate) +
                                        _modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1)
                                );
                                this.fill();
                                break;
                        }
                        break;
                    case 'span':
                        if (domClass.contains(target[0], 'month')) {
                            month = domAttr.get(target[0], 'data-dojo-month');
                            this.viewDate.setMonth(month);
                        } else {
                            var yearText = target[0].innerText || target[0].textContent;
                            year = parseInt(yearText, 10) || 0;
                            this.viewDate.setFullYear(year);
                        }
                        this.showMode(-1);
                        this.fill();
                        break;
                    case 'td':
                        if (domClass.contains(target[0], 'day')){
                            var dayText = target[0].innerText || target[0].textContent;
                            day = parseInt(dayText, 10) || 1;
                            month = this.viewDate.getMonth();
                            if (domClass.contains(target[0], 'old')) {
                                month -= 1;
                            } else if (domClass.contains(target[0], 'new')) {
                                month += 1;
                            }
                            year = this.viewDate.getFullYear();
                            this.set('date', new Date(year, month, day,0,0,0,0));
                            this.set('viewDate', new Date(year, month, day,0,0,0,0));
                            this.fill();
                            this.hide();
                        }
                        break;
                }
            }
        },
        
        showMode: function (dir) {
            if (dir) {
                this.viewMode = Math.max(0, Math.min(2, this.viewMode + dir));
            }
            
            query('>div', this.domNode).forEach(function (node) {
                domStyle.set(node, 'display', 'none');
            });
            
            query('>div.calendar-' + _modes[this.viewMode].clsName, this.domNode).forEach(function (node) {
                domStyle.set(node, 'display', 'block');
            });
        }
    });
});