import './App.css';
import moment from 'moment';
import { useState } from 'react';

import { MonthCalendarGrid } from './Components/MonthCalendarGrid/MonthCalendarGrid';
import { Header } from './Components/Header';
import { SmallCalendar } from './Components/SmallCalendar';

function App() {
  const [today, setToday] = useState(moment());
  const [todaySmallCalendar, setTodaySmallCalendar] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const startDaySmallCalendar = todaySmallCalendar.clone().startOf('month').startOf('week');

  const prevHandler = () => {
    setToday(prev => prev.clone().subtract(1, 'month'));
    setTodaySmallCalendar(prev => prev.clone().subtract(1, 'month'));
  }
  const todayHandler = () => {
    setToday(moment());
    setTodaySmallCalendar(moment());
  } 
  const nextHandler = () => {
    setToday(prev => prev.clone().add(1, 'month'));
    setTodaySmallCalendar(prev => prev.clone().add(1, 'month'));
  }
  
  const prevSmallCalendarHandler = () => {
    setTodaySmallCalendar(prev => prev.clone().subtract(1, 'month'));
  }
  
  const nextSmallCalendarHandler = () => {
    setTodaySmallCalendar(prev => prev.clone().add(1, 'month'));
  }

  const selectedDateSmallCalendar = (date) => {
    setToday(date);
    setTodaySmallCalendar(date);
  }

  const [selectedDisplayMode, setSelectedDisplayMode] = useState("month");

  return (
    <>
      <Header today={today} previousHandler={prevHandler} todayHandler={todayHandler} nextHandler={nextHandler} selectedDisplayMode={selectedDisplayMode} setSelectedDisplayMode={setSelectedDisplayMode} />
      <div style={{ display: "flex"}}>
        <SmallCalendar todaySmallCalendar={todaySmallCalendar} startDaySmallCalendar={startDaySmallCalendar} totalDays={42} prevSmallCalendarHandler={prevSmallCalendarHandler} nextSmallCalendarHandler={nextSmallCalendarHandler} selectedDateSmallCalendar={selectedDateSmallCalendar}/>
        <MonthCalendarGrid startDay={startDay} today={today} totalDays={42} />
      </div>
    </>
  );
}

export default App;
