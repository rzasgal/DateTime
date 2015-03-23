$.prototype.datetime = function()
{
    var master = create(this);
    var ELEMENT = this;
    this.setDateTime=function(dateTime){
        YEAR = dateTime.getYear() + 1900;
        MONTH = dateTime.getMonth();
        DAY = dateTime.getDate();
        DRAWN_YEAR = YEAR;
        DRAWN_MONTH = MONTH;
        HOUR = dateTime.getHours();
        MINUTE = dateTime.getMinutes();
        SECOND = dateTime.getSeconds();
        formatString();
    };
    this.getDateTime=function(){
        return new Date(YEAR, MONTH, DAY, HOUR, MINUTE, SECOND);
    };
    $('.datetime-input', this).on('keypress', function (e) {
        e.preventDefault();
    });
    $(this).on('click', function (e) {
        e.stopPropagation();
    });
    $(document.body).on('click', function (e) {
        master.hide();
    });
    $('.datetime-input', this).on('click', function(e){
        master.css('display', 'inline-block');
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
    function create(element)
    {
        createInput(element);
        return createCalender(element);
    }
    function createInput(element)
    {
        var input =$('<input type="text" class="form-control datetime-input"/>');
        element.append(input);
    }

    function createCalender(element)
    {
        var calenderMaster = $('<div class="datetime-div"></div>');
        createDatePanel(calenderMaster);
        createTimePanel(calenderMaster);
        element.append(calenderMaster);
        return calenderMaster;
    }
    function createDatePanel(master)
    {
        var datePanel = $('<div class="datetime-date"></div>');
        createDaysPanel(datePanel);
        createMonthsPanel(datePanel);
        createYearsPanel(datePanel);
        var timeButton = $('<div style="text-align: center"><div class="btn btn-default time-button"><span class="glyphicon glyphicon-time"></span></div></div>');
        datePanel.append(timeButton);
        master.append(datePanel);
    }
    function createTimePanel(master)
    {
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
    function createDaysPanel(datePanel)
    {
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
    function createYearsPanel(datePanel)
    {
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
    function createMonthsPanel(datePanel)
    {
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
    function formatPart(part)
    {
        return part.toString().length > 1 ? part.toString() : '0'+part.toString();
    }
    function formatString()
    {
        var dayLabel = formatPart(DAY);
        var monthLabel = formatPart(MONTH);
        var hourLabel = formatPart(HOUR);
        var minuteLabel = formatPart(MINUTE);
        var secondLabel = formatPart(SECOND);
        $('.datetime-input').val(dayLabel + ' / ' + monthLabel + ' / ' + YEAR+ ' '+hourLabel+':'+minuteLabel+':'+secondLabel);
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
        syncDaysLabel();
    };
    drawDaysOfMonth();
    function monthSelect(selectedMonth) {
        DRAWN_MONTH = selectedMonth;
        drawDaysOfMonth();
    };

    function fireChangedEvent()
    {
        ELEMENT.trigger({type:'datetimechanged', datetime:ELEMENT.getDateTime()});
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

}