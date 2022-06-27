import './App.css';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { MonthCalendarGrid } from './Components/MonthCalendarGrid/MonthCalendarGrid';
import { Header } from './Components/Header/Header';
import { SmallCalendar } from './Components/SmallCalendar/SmallCalendar';
import { WeekCalendarGrid } from './Components/WeekCalendarGrid/WeekCalendarGrid';

function App() {
  const [today, setToday] = useState(moment());
  const [todaySmallCalendar, setTodaySmallCalendar] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const startDaySmallCalendar = todaySmallCalendar.clone().startOf('month').startOf('week');
  const [selectedDisplayMode, setSelectedDisplayMode] = useState("month");
  const [isDeleted, setIsDeleted] = useState(false);
  const [events, setEvents] = useState([]);


  const prevHandler = () => {
    if (selectedDisplayMode === "month") {
      setToday(prev => prev.clone().subtract(1, 'month'));
      setTodaySmallCalendar(prev => prev.clone().subtract(1, 'month'));
    } else {
      setToday(prev => prev.clone().subtract(1, 'week'));
      setTodaySmallCalendar(prev => prev.clone().subtract(1, 'week'));
    }
  }

  const todayHandler = () => {
    setToday(moment());
    setTodaySmallCalendar(moment());
  }

  const nextHandler = () => {
    if (selectedDisplayMode === "month") {
      setToday(prev => prev.clone().add(1, 'month'));
      setTodaySmallCalendar(prev => prev.clone().add(1, 'month'));
    } else {
      setToday(prev => prev.clone().add(1, 'week'));
      setTodaySmallCalendar(prev => prev.clone().add(1, 'week'));
    }
  }

  const prevSmallCalendarHandler = () => {
    setTodaySmallCalendar(prev => prev.clone().subtract(1, 'month'));
  }

  const nextSmallCalendarHandler = () => {
    setTodaySmallCalendar(prev => prev.clone().add(1, 'month'));
  }

  const selectedDisplayModeHandler = (selectedMode) => {
    setSelectedDisplayMode(selectedMode);
  }

  const selectedDateSmallCalendar = (date) => {
    setToday(date);
    setTodaySmallCalendar(date);
  }

  const getData = () => {
    fetch(`https://localhost:7216/api/Events`)
      .then(res => res.json())
      .then(res => setEvents(res));
  }

  const deleteEventHadler = async (id) => {
    await fetch(`https://localhost:7216/api/Events/${id}`, {
            method: "Delete"
        })
    setIsDeleted(true);
  }

  useEffect(() => {
    setIsDeleted(false);
    getData();
  }, [isDeleted])

  return (
    <>
      <Header today={today} previousHandler={prevHandler} todayHandler={todayHandler} nextHandler={nextHandler} selectedDisplayMode={selectedDisplayMode} selectedDisplayModeHandler={selectedDisplayModeHandler} />
      <div style={{ display: "flex" }}>
        <SmallCalendar todaySmallCalendar={todaySmallCalendar} startDaySmallCalendar={startDaySmallCalendar} totalDays={42} prevSmallCalendarHandler={prevSmallCalendarHandler} nextSmallCalendarHandler={nextSmallCalendarHandler} selectedDateSmallCalendar={selectedDateSmallCalendar} />
        {
          selectedDisplayMode === "month" ?
            <MonthCalendarGrid startDay={startDay} today={today} totalDays={42} events={events} deleteEventHadler={deleteEventHadler} /> :
            <WeekCalendarGrid today={today} deleteEventHadler={deleteEventHadler} events={events} />
        }
      </div>
    </>
  );
}

export default App;
