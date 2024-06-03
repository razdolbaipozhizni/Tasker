import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerComponent({ date, setDate }) {
  return (
    <div className="date-picker">
      <p>Выбранная дата: {date && date.toLocaleDateString('ru-RU')}</p>
      <DatePicker selected={date} onChange={date => setDate(date)} />
    </div>
  );
}

export default DatePickerComponent;
