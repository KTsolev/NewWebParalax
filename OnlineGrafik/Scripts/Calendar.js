
var temp = {};
function Calendar(date,month, year)
{
    this.days = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"];
    this.months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
    this.dayPerMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.currentDate = new Date();
    this.date = (isNaN(month) || month == null) ? this.currentDate.getDate() : date;
    this.dayOfWeek =  this.currentDate.getDay();
    this.month = (isNaN(month) || month == null) ? this.currentDate.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? this.currentDate.getFullYear() : year;
    this.currentDate = new Date(this.year, this.month, this.date);
}
//trY row year tdY td for year//
//trM row month tdM td for month//
//trLD row dya label tdLD td for label day//
//trD row day tdY tdD for day//
Calendar.prototype.EqualizeLength = function (arr,index)
{
    var desiredLength = arr[index].length;
    for (var i = 0; i < arr.length; i++)
    {
        do
        {
            arr[i] += " ";

        }while(arr[i].length <= desiredLength)
    }
}

Calendar.prototype.GenerateHTML = function (holder,month)
{
    var parent = $(holder);
    var currentMonth = (isNaN(month) || month == null) ? this.currentDate.getMonth() : month;
    var trY = document.createElement('tr');
    var tdY = document.createElement('th');
    var tdPY = document.createElement('th');
    var tdNY = document.createElement('th');
    $(tdPY).attr('id', 'prev_year');
    $(tdNY).attr('id', 'next_year');
    $(tdPY).text('<');
    $(tdNY).text('>');
    $(tdY).attr('colspan', '5');
    $(tdY).text(this.currentDate.getFullYear());
    $(tdY).addClass('years');
    $(trY).append(tdPY);
    $(trY).append(tdY);
    $(trY).append(tdNY);
    $(parent).append(trY);
    var trM = document.createElement('tr');
    var tdM = document.createElement('th');
    var tdPM = document.createElement('th');
    var tdNM = document.createElement('th');
    $(tdPM).attr('id', 'prev_month');
    $(tdNM).attr('id', 'next_month');
    $(tdPM).bind('click', function () {
        $('#calendar').empty();
        var cal1 = new Calendar();
        cal1.GenerateHTML("#calendar",currentMonth-1);
    });
    $(tdNM).bind('click', function ()
    {
        $('#calendar').empty();
        var cal1 = new Calendar();
        cal1.GenerateHTML("#calendar",currentMonth + 1);
    });
    $(tdPM).text('<');
    $(tdNM).text('>');
    $(tdM).attr('colspan', '5');
    $(tdM).addClass('months');
    $(tdM).text(this.months[currentMonth]);
    $(trM).append(tdPM);
    $(trM).append(tdM);
    $(trM).append(tdNM);
    $(parent).append(trM);
    var trLD = document.createElement('tr');
    for (var j = 0; j < this.days.length; j++)
    {
        var tdLD = document.createElement('th');
        $(tdLD).attr('class','week');
        $(tdLD).text(this.days[j]);
        $(trLD).append(tdLD);
    }

    $(parent).append(trLD);

    console.log(this.year%4+"  "+this.year % 100+" "+this.year %400);
    if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0)
    {
        this.months[1] = 29;
    }

    var firstDay = new Date(this.year,currentMonth, 1);
    var lastDay = new Date(this.year, currentMonth, this.dayPerMonths[currentMonth]);
    var startingDay = firstDay.getDay();
    var endDay = lastDay.getDay();
  //  console.log(firstDay);
  //  console.log(lastDay);
  //  console.log(startingDay);
  //  console.log(endDay);
    // fill in the days
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) 
    {
        var trD = document.createElement('tr');
        if (day > this.dayPerMonths[currentMonth])
        {
            var nextMonth = currentMonth + 1
            var firstDayNextMonth = new Date(this.year, nextMonth, 1);
            var startingDayNextMonth = firstDayNextMonth.getDay();
            var l = startingDayNextMonth, newDay = 1;
            console.log(l, nextMonth);
            do {
                var tdD = document.createElement('td');
                $(tdD).addClass('days');
                $(tdD).addClass('other');
                $(tdD).text(newDay);
                if (l == 1 )
                {
                    trD = document.createElement('tr');
                    trD.append(tdD);
                    $(parent).append(trD);
                }
                else
                {
                   $(parent).find('tr:last').append(tdD);
                }
                newDay++;
                l++;
            }
            while (l <= 7);
            $(parent).append(trD);
            break;
        }
        
        // this loop is for weekdays (cells)
        for (var j = 1; j < 8; j++) 
        {                                                                                                                             
            var tdD = document.createElement('td');
            $(tdD).addClass('days');
            //bind onclick to days//
            $(tdD).bind('click', function ()
            {
                var month = $('.months').text();
                var year = $('.years').eq(0).text();
                var index = $(this).index();
                var day = $(this).text();
                var left = $(this).position().left;
                var top = $(this).position().left;
                console.log("T:"+top+" L:"+left);
                var dayOfWeek = $('.week').eq(index).text();
                if (index != 6 && !$(this).hasClass('other'))
                {
                    var graf = new Grafik('#grafik', day, dayOfWeek, month, year, (index + 1), left, top);
                    temp = graf;
                    graf.GenerateHTML('#grafik');
                }
            });
            if (day <= this.dayPerMonths[currentMonth] && (i > 0 || j >= startingDay))
            {
                if (day == this.date)
                {
                    $(tdD).attr('id', 'today');
                }
                if (j == 6 || j == 7)
                {
                    $(tdD).addClass('weekend');
                }
                $(tdD).text(day);
                $(trD).append(tdD);
                day++;
            }
            else if (day <= this.dayPerMonths[currentMonth] && j < startingDay)
            {
                $(tdD).text(this.dayPerMonths[currentMonth] - (startingDay - j));
                $(tdD).addClass('other');
                $(trD).append(tdD);
            }

        }
        $(parent).append(trD);                  
    }
}
function Grafik(holder, day, dayOfWeek, month, year, index, left, stop)
{
    this.date = day;
    this.container = holder;
    this.dayOfWeek = dayOfWeek;
    this.index = index;
    this.month = month;
    this.elemLeft = left;
    this.elemTop = top;
    this.year = year;
    this.availableHours = {
        "Monday" : ["9:00", "10:00", "11:00", "15:00", "16:00", "17:00", "18:00"],
        "Tuesday" : ["9:00", "10:00", "11:00", "15:00", "16:00", "17:00", "18:00"],
        "Wednesday" : ["9:00", "10:00", "11:00", "12:00", "13:00"],
        "Thursday" : ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
        "Friday" : ["9:00", "10:00", "11:00", "12:00", "13:00"],
        "Saturday" : ["9:00", "10:00", "11:00", "12:00"]
        };
}


Grafik.prototype.GetHours = function (day)
{
    hours = [];
    switch(day)
    {
        case 1:
            hours = this.availableHours['Monday'];
            break;
        case 2:
            hours = this.availableHours['Tuesday'];
            break;
        case 3:
            hours = this.availableHours['Wednesday'];
            break;
        case 4:
            hours = this.availableHours['Thursday'];
            break;
        case 5:
            hours = this.availableHours['Friday'];
            break;
        case 6:
            hours = this.availableHours['Saturday'];
            break;
        default:
            break;
    }
    return hours;
}

Grafik.prototype.GenerateHTML = function (holder)
{
    var container = $(holder);
    $(container).css({
        'left': this.elemLeft,
        'top': this.elemTop
    });
    $(container).empty();
    var trHead = document.createElement('tr');
    var tdHead = document.createElement('th');
    var hoursPerDay = this.GetHours(this.index);
    $(tdHead).attr('colspan',3);
    $(tdHead).text(this.date + " " + this.dayOfWeek + " " + this.month + " " + this.year);
    $(trHead).append(tdHead);
    $(container).append(trHead);
    for (var j = 0; j < hoursPerDay.length; j++)
    {
        var trRow = document.createElement('tr');
        var tdRow = document.createElement('td');
        $(tdRow).text("Свободен");
        var tdHours = document.createElement('td');
        $(tdHours).text(hoursPerDay[j]);
        $(trRow).append(tdHours);
        var tdButton = document.createElement('input');
        $(tdButton).attr('type', 'button');
        $(tdButton).attr('value', 'Запиши се');
        $(tdButton).bind('click', function ()
        {
           temp.GenerateHTML2('#record');
        });
        $(trRow).append(tdButton);
        $(trRow).append(tdRow);
        $(container).append(trRow);
    }
    if ($(container).hasClass("animateOpacity")) {
        $(container).addClass("animateOpacityBackwards");
        $(container).removeClass("animateOpacity");
    }
    else {
        $(container).addClass("animateOpacity");
        $(container).removeClass("animateOpacityBackwards");
    }
    
}
Grafik.prototype.GenerateHTML2 = function (holder)
{
    var container = $(holder);
    $(container).empty();    
    var tdName = document.createElement('input');
    var tdFamily = document.createElement('input');
    var tdTel = document.createElement('input');
    var tdCaptcha = document.createElement('input');
    var tdButton = document.createElement('input');
    $(tdButton).attr('type', 'button');
    $(tdButton).attr('value', 'Запиши се');
    $(tdName).attr('type', 'text');
    $(tdName).attr('placeholder', 'Name:');
    $(tdFamily).attr('type', 'text');
    $(tdFamily).attr('placeholder', 'Family:');
    $(tdTel).attr('type', 'text');
    $(tdTel).attr('placeholder', 'Tel:');
    $(tdCaptcha).attr('type', 'text');
    $(tdCaptcha).attr('placeholder', 'Captcha');          
    $(container).append(tdName);
    $(container).append(tdFamily);
    $(container).append(tdTel);
    $(container).append(tdCaptcha);
    $(container).append(tdButton);
}