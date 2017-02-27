import Ember from 'ember';
import Component from 'ember-component';
import computed from 'ember-computed';
import moment from 'moment';

export default Ember.Component.extend ({
  currentDate: moment(),
  monthLabel: '',
  yearLabel: '',
  month: '',
  calendar: [],

  didReceiveAttrs() {
    this._createCalendar();
  },

  actions: {
    nextMonth: function(e){
        e.preventDefault();
        if (this.get('month') === 11){
            this.set('mon')
            year = this.state.year + 1;
          }
          else{
            month = this.state.month + 1;
            year = this.state.year;
          }
      },
      previousMonth: function(e){
          e.preventDefault();
          if (this.state.month == 0){
            month = 11;
            year = this.state.year - 1;
          }
          else {
            month = this.state.month - 1;
            year = this.state.year;
          }
      }
  },

  _createCalendar(){

        let date = this.get('currentDate');
        let currentMonth = date.month();
        let monthLabel = date.format('MMMM');
        let yearLabel = date.format('YYYY');
        let startMonthDate = date.startOf('month');
        let endMonthDate = moment(date).add(1,'month').startOf('month');
        let range = moment.range(startMonthDate, endMonthDate);
        let weeks = [];
        let tempCal = [];

        this.set('monthLabel', monthLabel);
        this.set('yearLabel', yearLabel);
        this.set('month', currentMonth);
        console.log(this.get('monthLabel'));
        console.log(date);
        console.log(startMonthDate);
        console.log(endMonthDate);

        range.by('weeks', function(moment){
            weeks.push(moment.week());
        })
        console.log(weeks);

        for (let i = 0, len = weeks.length; i < len; i++) {
         let week = weeks[i];
         let firstWeekDay = '';
         let lastWeekDay = '';
         let weekRange = '';

         if (i > 0 && week < weeks[i-1]){
           // We have switched to the next year

           firstWeekDay = moment(date).add(1, "year").week(week).day(0);
           lastWeekDay = moment(date).add(1, "year").week(week).day(8);
         }
         else{
           firstWeekDay = moment(date).week(week).day(0);
           lastWeekDay = moment(date).week(week).day(8);
         }
         weekRange = moment.range(firstWeekDay, lastWeekDay);
         tempCal.push(this._enumerateDaysBetweenDates(firstWeekDay, lastWeekDay));
        }
        console.log(tempCal);
        this.set('calendar', tempCal);
  },

  _enumerateDaysBetweenDates(startDate, endDate) {
    let dates = [];
    let isInCurrentMonth = false;
    let isToday = false;
    let isFree = false;
    let day = {};

    let month = this.get('month');
    startDate = startDate.add('days', 1);

    while(startDate.format('M/D/YYYY') !== endDate.format('M/D/YYYY')) {
      console.log(startDate.toDate());
      dates.push(startDate.toDate());
      //if()
      startDate = startDate.add('days', 1);
    }

    return dates;
  }
});
