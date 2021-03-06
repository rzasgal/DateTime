$.prototype.datetime = function () {
    var master = create(this);
    var ELEMENT = this;
    var inputClasses = this.attr('input-class');
    var inputId = this.attr('input-id');
    var inputName = this.attr('input-name');
    var MODES ={'DATE_TIME':0, 'DATE':1, 'TIME':2};
    var defaultMode = MODES.DATE_TIME;
    this.setDateTime = function (dateTime) {
        YEAR = dateTime.getYear() + 1900;
        MONTH = dateTime.getMonth();
        DAY = dateTime.getDate();
        DRAWN_YEAR = YEAR;
        DRAWN_MONTH = MONTH;
        HOUR = dateTime.getHours();
        MINUTE = dateTime.getMinutes();
        SECOND = dateTime.getSeconds();
        drawDaysOfMonth();
        formatString();
    };
    this.getDateTime = function () {
        return new Date(YEAR, MONTH, DAY, HOUR, MINUTE, SECOND);
    };
    $('.datetime-input', this).on('blur', function (e) {
        var input = e.target;
        var text = input.value;
        var day = text.substr(0,2);
        var month = text.substr(3,2);
        var year = text.substr(6,4);
        var hour = text.substr(11,2);
        var minute = text.substr(14,2);
        var second = text.substr(17,2);
        var lastDateTime = ELEMENT.getDateTime();

        var newDate = new Date(year, parseInt(month)-1, day, hour, minute, second);
        //if(newDate.getTime){
            ELEMENT.setDateTime(newDate);
            fireChangedEvent();
        //}
        //else
        //    ELEMENT.setDateTime(lastDateTime);

    });
    $('.datetime-input', this).on('keydown', function (e) {
        var key = e.keyCode;
        var input = e.target;
        var pos = input.selectionStart;
        var text = input.value;
        var pre = "";
        var next = "";
        var fillerChar = " ";
        if (text && pos > 0)
            pre = text.substr(pos - 1, 1);
        if (text && text.length > pos)
            next = text.substr(pos, 1);

        if(e.altKey || e.ctrlKey || e.shiftKey || key == 37 || key ==39)
            return;

        if (key == 8 || key == 46) {
            var backspace = e.keyCode == 8;
            var targetChar = backspace ? pre : next;
            if (key == 8)
                console.info("BackSpace, Position:" + pos + " " + pre + " " + next);
            if (key == 46)
                console.info("Delete, Position:" + pos + " " + pre + " " + next);
            if (targetChar.length > 0) {
                e.preventDefault();
                var targetCharCode = targetChar.charCodeAt(0);
                var found = findInputSpecChar(targetCharCode);
                if (found) {
                    var incr = backspace ? -1:1;
                    //if (backspace) {
                        while (pos > 1 && pos < text.length) {
                            pos += incr;
                            pre = text.substr(pos +incr, 1);
                            targetCharCode = pre.charCodeAt(0);
                            if(!findInputSpecChar(targetCharCode))
                            {
                                input.setSelectionRange(pos, pos);
                                pos = 0;
                            }
                        }
                    //}
                }else{
                    var split = backspace ? pos -1 : pos;
                    var start = text.substr(0, split);
                    var end = text.substr(split+1);
                    input.value = start+fillerChar+end;
                    pos = backspace ? pos -1 : pos+1;
                    input.setSelectionRange(pos, pos);
                }
            }
        }
        else{
            e.preventDefault();
            var nextSpecialChar = findInputSpecChar(next.charCodeAt(0));
            if(nextSpecialChar){
                do{
                    pos++;
                    if (text && text.length > pos)
                        next = text.substr(pos, 1);

                }while(findInputSpecChar(next.charCodeAt(0)));
            }
            if(pos < text.length) {
                var char = String.fromCharCode(e.which);
                var start = text.substr(0, pos);
                var end = text.substr(pos+1);
                text = start+char+end;
                input.value = text;
                do{
                    pos++;
                    if (text && text.length > pos)
                        next = text.substr(pos, 1);

                }while(findInputSpecChar(next.charCodeAt(0)));
                input.setSelectionRange(pos, pos);
            }
        }


    });
    $(this).on('click', function (e) {
        e.stopPropagation();
    });
    $(document.body).on('click', function (e) {
        master.hide();
    });
    $('.datetime-input', this).on('click', function (e) {
        var input = e.target;
        var text = $('.datetime-input').val();
        if(text == null || text.length == 0)
            formatString();
        e.stopImmediatePropagation();
        e.preventDefault();
    });
    $('.btn-calendar', this).on('click', function (e) {
        $('.datetime-time', master).hide();
        $('.datetime-date', master).show();
        master.css('display', 'inline-block');
        DRAWN_YEAR = YEAR;
        DRAWN_MONTH = MONTH;
        drawDaysOfMonth();
        e.stopImmediatePropagation();
        e.preventDefault();
    });
    var currentDate = new Date();
    var YEAR = currentDate.getYear() + 1900;
    var MONTH = currentDate.getMonth();
    var DAY = currentDate.getDate();
    var DRAWN_YEAR = YEAR;
    var DRAWN_MONTH = MONTH;
    var HOUR = currentDate.getHours();
    var MINUTE = currentDate.getMinutes();
    var SECOND = currentDate.getSeconds();
    $('.hour', master).val(HOUR);
    $('.minute', master).val(MINUTE);
    $('.second', master).val(SECOND);
    var monthsDrawn = false;
    var MONTHS =
    {
        0: 'Ocak',
        1: 'Subat',
        2: 'Mart',
        3: 'Nisan',
        4: 'Mayis',
        5: 'Haziran',
        6: 'Temmuz',
        7: 'Agustos',
        8: 'Eylul',
        9: 'Ekim',
        10: 'Kasim',
        11: 'Aralik'
    };

    function create(element) {
        createInput(element);
        return createCalender(element);
    }

    function createInput(element) {
        var input = $('<div class="input-group"><input type="text" class="form-control datetime-input"/><span class="input-group-btn"><button class="btn btn-default btn-calendar" style="height: 34px"><span class="glyphicon glyphicon-calendar"/></button></span></div>');
        if (inputClasses) {
            input.addClass(inputClasses);
        }
        else if (inputId) {
            input.prop('id', inputId);
        }
        else if (inputName) {
            input.prop('name', inputName);
        }
        element.append(input);
    }

    function createCalender(element) {
        var calenderMaster = $('<div class="datetime-div"></div>');
        createDatePanel(calenderMaster);
        createTimePanel(calenderMaster);
        element.append(calenderMaster);
        return calenderMaster;
    }

    function createDatePanel(master) {
        var datePanel = $('<div class="datetime-date"></div>');
        createDaysPanel(datePanel);
        createMonthsPanel(datePanel);
        createYearsPanel(datePanel);
        var timeButton = $('<div style="text-align: center"><div class="btn btn-default time-button"><span class="glyphicon glyphicon-time"></span></div></div>');
        datePanel.append(timeButton);
        master.append(datePanel);
    }

    function createTimePanel(master) {
        var timePanel = $('<div class="datetime-time"></div>');
        var content = $('<div style="height: 40px"></div>');
        var hour = $('<div class="col-md-3"><input class="form-control hour" max="23" min="0"/></div>');
        var minute = $('<div class="col-md-3"><input class="form-control minute" max="59" min="0"/></div>');
        var second = $('<div class="col-md-3"><input class="form-control second" max="59" min="0"/></div>');
        var calendarButton = $('<div style="text-align: center"><div class="btn btn-default date-button"><span class="glyphicon glyphicon-calendar"></span></div></div>');
        timePanel.append(content);
        content.append(hour);
        content.append(minute);
        content.append(second);
        timePanel.append(calendarButton);
        master.append(timePanel);
    }

    function createDaysPanel(datePanel) {
        var days = $('<div class="days"></div>');
        var header = $('<div class="days-header"></div>');
        var headerLeftButton = $('<button type="button" class="btn btn-default pre-month pull-left"><span class="glyphicon glyphicon-arrow-left"></span></button>');
        var headerRightButtn = $('<button type="button" class="btn btn-default next-month pull-right"><span class="glyphicon glyphicon-arrow-right"></span></button>');
        var headerLabel = $('<span class="days-label"></span>');
        var content = $('<div class="days-content"></div>');
        header.append(headerLeftButton);
        header.append(headerLabel);
        header.append(headerRightButtn);
        days.append(header);
        days.append(content);
        datePanel.append(days);
    }

    function createYearsPanel(datePanel) {
        var years = $('<div class="years"></div>');
        var header = $('<div class="years-header"></div>');
        var headerLeftButton = $('<button type="button" class="btn btn-default pre-years pull-left"><span class="glyphicon glyphicon-arrow-left"></span></button>');
        var headerLabel = $('<span class="years-label"></span>');
        var headerRightButton = $('<button type="button" class="btn btn-default next-years pull-right"><span class="glyphicon glyphicon-arrow-right"></span></button>');
        var content = $('<div class="years-content"></div>');
        header.append(headerLeftButton);
        header.append(headerLabel);
        header.append(headerRightButton);
        years.append(header);
        years.append(content);
        datePanel.append(years);
    }

    function createMonthsPanel(datePanel) {
        var months = $('<div class="months"></div>');
        var header = $('<div class="months-header"></div>');
        var headerLeftButton = $('<button type="button" class="btn btn-default pull-left pre-year"><span class="glyphicon glyphicon-arrow-left"></span></button>');
        var headerLabel = $('<span class="months-label"></span>');
        var headerRightButton = $('<button type="button" class="btn btn-default pull-right next-year"><span class="glyphicon glyphicon-arrow-right"></span></button>');
        var content = $('<div class="months-content"></div>');
        header.append(headerLeftButton);
        header.append(headerLabel);
        header.append(headerRightButton);
        months.append(header);
        months.append(content);
        datePanel.append(months);
    }

    function syncMonthsLabel() {
        $('.months-label', master).text(DRAWN_YEAR);
    }

    function syncYearsLabel(bot, top) {
        $('.years-label', master).text(bot + ' - ' + top);
    }

    function syncDaysLabel() {
        $('.days-label', master).text(DRAWN_YEAR + ' ' + MONTHS[DRAWN_MONTH]);
    }

    function drawMonthsOfYear() {
        if (monthsDrawn)
            return;
        $('.months-content', master).empty();
        var div = null;
        for (prop in MONTHS) {
            if ((parseInt(prop) % 4) == 0) {
                div = $('<div class="datetime-row"></div>');
                $('.months-content', master).append(div);
            }

            var month = $('<span class="month datetime-cell" data-month="' + prop + '">' + MONTHS[prop] + '</span>');
            div.append(month);
        }
        for (var i = 0; i < MONTHS.length; i++) {

        }
        monthsDrawn = true;
    }

    drawMonthsOfYear();
    function drawYearPane(bot, top) {
        $('.years-content', master).empty();
        var div = null;
        for (i = bot; i < top; i++) {
            if (i % 5 == 0) {
                div = $('<div class="datetime-row"></div>')
                $('.years-content', master).append(div);
            }

            var span = $('<span class="year datetime-cell" data-year="' + i + '">' + i + '</span>');
            div.append(span);
        }
    }

    function formatPart(part) {
        return part.toString().length > 1 ? part.toString() : '0' + part.toString();
    }

    function formatString() {
        var dayLabel = formatPart(DAY);
        var monthLabel = formatPart(MONTH + 1);
        var hourLabel = formatPart(HOUR);
        var minuteLabel = formatPart(MINUTE);
        var secondLabel = formatPart(SECOND);
        $('.datetime-input').val(dayLabel + '/' + monthLabel + '/' + YEAR + '-' + hourLabel + ':' + minuteLabel + ':' + secondLabel);
    }

    function drawDaysOfMonth() {
        var maxDay = (32 - new Date(DRAWN_YEAR, DRAWN_MONTH, 32).getDate());
        var preMaxDay = (32 - new Date(DRAWN_YEAR, DRAWN_MONTH - 1, 32).getDate());
        var firstDay = new Date(DRAWN_YEAR, DRAWN_MONTH, 1).getDay();
        var lastDay = new Date(DRAWN_YEAR, DRAWN_MONTH, maxDay).getDay();
        if (firstDay == 0)
            firstDay = 6;
        else
            firstDay--;

        preMaxDay -= firstDay;
        $('.days-content', master).empty();
        var k = 0;
        var div = $('<div class="datetime-row"></div>');
        for (var i = 1; i <= maxDay; i++) {
            if ((k % 7) == 0)
                div = $('<div class="datetime-row"></div>');
            var span = null;
            if (i == 1) {
                var month = DRAWN_MONTH == 0 ? 11 : parseInt(DRAWN_MONTH) - 1
                var year = DRAWN_MONTH == 0 ? parseInt(DRAWN_YEAR) - 1 : DRAWN_YEAR;
                for (var l = 0; l < firstDay; l++) {
                    ++preMaxDay;
                    span = $('<span class="day datetime-cell" data-date="' + preMaxDay + ':' + month + ':' + year + '">' + (preMaxDay) + '</span>');
                    div.append(span);
                    k++;
                }

            }
            if (DAY == i && DRAWN_MONTH == MONTH && DRAWN_YEAR == YEAR)
                span = $('<span class="day current-month-day day-selected datetime-cell" data-date="' + i + ':' + (DRAWN_MONTH) + ':' + DRAWN_YEAR + '">' + i + '</span>');
            else
                span = $('<span class="day current-month-day datetime-cell" data-date="' + i + ':' + (DRAWN_MONTH) + ':' + DRAWN_YEAR + '">' + i + '</span>');
            div.append(span);
            $('.days-content', master).append(div);
            if (i == maxDay && lastDay != 0) {
                var t = 1;
                var month = DRAWN_MONTH == 11 ? 0 : parseInt(DRAWN_MONTH) + 1
                var year = DRAWN_MONTH == 11 ? parseInt(DRAWN_YEAR) + 1 : DRAWN_YEAR
                for (var l = 7; l > lastDay; l--) {
                    span = $('<span class="day datetime-cell" data-date="' + t + ':' + month + ':' + year + '">' + t + '</span>');
                    div.append(span);
                    t++
                }
            }
            k++;
        }
        $('.days', master).show();
        $('.months', master).hide();
        $('.years', master).hide();
        syncDaysLabel();
    };
    drawDaysOfMonth();
    function monthSelect(selectedMonth) {
        DRAWN_MONTH = selectedMonth;
        drawDaysOfMonth();
    };

    function fireChangedEvent() {
        ELEMENT.trigger({type: 'datetimechanged', datetime: ELEMENT.getDateTime()});
    };
    $(master).on('click', '.day', function (e) {
        var val = $(e.target).attr('data-date');
        var parts = val.split(':');
        DAY = parseInt(parts[0]);
        MONTH = parseInt(parts[1]);
        YEAR = parseInt(parts[2]);
        $(master).hide();
        drawDaysOfMonth();
        formatString();
        fireChangedEvent();
    });
    $('.days-label', master).on('click', function (e) {
        $('.days', master).hide();
        syncMonthsLabel();
        $('.months', master).show();
    });
    $(master).on('click', '.month', function (e) {
        var target = e.target;
        var val = $(target).attr('data-month');
        monthSelect(val);
    });
    $('.pre-month', master).on('click', function () {

        if (DRAWN_MONTH == 0) {
            DRAWN_MONTH = 11;
            DRAWN_YEAR--;
        }
        else
            DRAWN_MONTH--;

        monthSelect(DRAWN_MONTH);
    });
    $('.next-month', master).on('click', function () {

        if (DRAWN_MONTH == 11) {
            DRAWN_MONTH = 0;
            DRAWN_YEAR++;
        }
        else
            DRAWN_MONTH++;
        monthSelect(DRAWN_MONTH);
    });
    $('.pre-year', master).on('click', function () {
        DRAWN_YEAR--;
        syncMonthsLabel();
    });
    $('.next-year', master).on('click', function () {
        DRAWN_YEAR--;
        syncMonthsLabel();
    });
    $('.months-label', master).on('click', function () {
        $('.months', master).hide();
        var origin = parseInt(DRAWN_YEAR);
        var bot = origin % 20;
        var top = 20 - bot;
        var bot = origin - bot;
        top = origin + top;
        drawYearPane(bot, top);
        syncYearsLabel(bot, top);
        $('.years', master).show();
    });
    $('.next-years', master).on('click', function () {
        DRAWN_YEAR = DRAWN_YEAR + 20;
        var bot = DRAWN_YEAR % 20;
        var top = 20 - bot;
        var bot = DRAWN_YEAR - bot;
        top = DRAWN_YEAR + top;
        drawYearPane(bot, top);
        syncYearsLabel(bot, top);
    });
    $('.pre-years', master).on('click', function () {
        DRAWN_YEAR = DRAWN_YEAR - 20;
        var bot = DRAWN_YEAR % 20;
        var top = 20 - bot;
        var bot = DRAWN_YEAR - bot;
        top = DRAWN_YEAR + top;
        drawYearPane(bot, top);
        syncYearsLabel(bot, top);
    });
    $(master).on('click', '.year', function (e) {
        var year = $(e.target).attr('data-year');
        DRAWN_YEAR = parseInt(year);
        syncMonthsLabel();
        $('.years', master).hide();
        $('.months', master).show();
    });
    $('.time-button', master).on('click', function () {
        $('.datetime-date', master).hide();
        $('.datetime-time', master).show();
        $('.hour', master).val(HOUR);
        $('.minute', master).val(MINUTE);
        $('.second', master).val(SECOND);
    });
    $('.date-button', master).on('click', function () {
        $('.datetime-time', master).hide();
        $('.datetime-date', master).show();
    });

    function keypressTime(e) {
        var key = '0123456789';
        if (key.indexOf(String.fromCharCode(e.which)) < 0)
            e.preventDefault();
    }

    function blurReset(e) {
        var max = parseInt($(e.target).attr('max'));
        var min = parseInt($(e.target).attr('min'));
        var val = parseInt($(e.target).val());
        if (val > max)
            $(e.target).val(max);

        if (val < min)
            $(e.target).val(min);
        HOUR = parseInt($('.hour', master).val());
        MINUTE = parseInt($('.minute', master).val());
        SECOND = parseInt($('.second', master).val());
        formatString();
        fireChangedEvent();
    }

    $('.hour', master).on('keypress', keypressTime);
    $('.hour', master).on('blur', blurReset);
    $('.minute', master).on('keypress', keypressTime);
    $('.minute', master).on('blur', blurReset);
    $('.second', master).on('keypress', keypressTime);
    $('.second', master).on('blur', blurReset);
    function findInputSpecChar(keycode) {
        var specialChars = [58, 47, 45];
        for (var i = 0; i < specialChars.length; i++) {
            var sc = specialChars[i];
            if (sc == keycode)
                return true;
        }
        return false;
    }
}