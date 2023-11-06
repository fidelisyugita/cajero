import dayjs from 'dayjs';
import React from 'react';
import {CalendarList, Calendar as NativeCalendar} from 'react-native-calendars';

function Calendar(): JSX.Element {
  return (
    <NativeCalendar
      markingType="period"
      maxDate={dayjs().format('YYYY-MM-DD')}
      markedDates={{
        '2023-11-06': {color: 'green', startingDay: true},
        '2023-11-07': {color: 'green'},
        '2023-11-08': {
          color: 'green',
          endingDay: true,
        },
      }}
    />
  );
}

export default Calendar;
