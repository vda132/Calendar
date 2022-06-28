import './App.css';
import moment from 'moment';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { MonthCalendarGrid } from './Components/MonthCalendarGrid/MonthCalendarGrid';
import { Header } from './Components/Header/Header';
import { SmallCalendar } from './Components/SmallCalendar/SmallCalendar';
import { WeekCalendarGrid } from './Components/WeekCalendarGrid/WeekCalendarGrid';

const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;


const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  min-width: 200px;

  background-color: white;
  color: black;
  box-shadow:unset;
`;

const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const ErrorWrapper = styled.span`
  margin:auto;
  padding:0px;
  color:red;
  text-align:center;
  align-items:center;
`;

const EventListWrapper = styled('ul')`
	margin: unset;
`;

const EventItemWrapper = styled('div')`
    min-width:100px;
    display:flex;
	  position: relative;
	  left: -14px;
	  text-overflow: ellipsis;
	  overflow: hidden;
	  white-space: nowrap;
	  width: 114px;
	  border: unset;
	  background:blue;
    border-radius: 3px;
	  color:white;
	  cursor: pointer;
	  margin-top:1px;
	  padding: 0;
	  text-align: left;
    justify-content: space-between;
`;

const EventButton = styled.button`
    background-color: blue;
    color: white;
`;

const EventTitle = styled.div`
    min-widht:140px;
`;

function App() {
  const [today, setToday] = useState(moment());
  const [todaySmallCalendar, setTodaySmallCalendar] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  const startDaySmallCalendar = todaySmallCalendar.clone().startOf('month').startOf('week');
  const [selectedDisplayMode, setSelectedDisplayMode] = useState("month");
  const [isShowForAddOrUpdateForm, setIsShowForAddOrUpdateForm] = useState(false);
  const [isShowForAllEventsForm, setIsShowForAllEventsForm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAddedOrUpdated, setIsAddedOrUpdated] = useState(false);
  const [events, setEvents] = useState([]);
  const [allEventsToDisplay, setAllEventsToDisplay] = useState([]);
  const [eventName, setEventName] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [event, setEvent] = useState();
  const [error, setError] = useState();
  const [method, setMethod] = useState();

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

  const cancelButtonHandler = () => {
    setIsShowForAddOrUpdateForm(false);
  }

  const cancelAllEventsButtonHandler = () => {
    setIsShowForAllEventsForm(false);
    setAllEventsToDisplay([]);
  }

  const showFormForAddingMonthHandler = (dateFromCalendar) => {
    setMethod("Add");
    setError('');
    setEventName('');
    setEventDescription('');
    setTimeFrom('');
    setTimeTo('');
    setDateFrom(dateFromCalendar.format("YYYY-MM-DD"));
    setDateTo(dateFromCalendar.format("YYYY-MM-DD"))
    setIsShowForAddOrUpdateForm(true);
  }

  const showFormForAddingWeekHandler = (date, timeFromCalendar, timeToCalendar) => {
    setMethod("Add");
    setError('');
    setEventName('');
    setEventDescription('');
    setTimeFrom(timeFromCalendar.format("HH:mm"));
    setTimeTo(timeToCalendar.format("HH:mm"));
    setDateFrom(date.format("YYYY-MM-DD"));
    setDateTo(date.format("YYYY-MM-DD"))
    setIsShowForAddOrUpdateForm(true);
  }

  const showFormForUpdateHandler = (eventForUpdate) => {
    setMethod("Update");
    setError('');
    setEvent(eventForUpdate);
    setEventName(eventForUpdate.name);
    setEventDescription(eventForUpdate.description);
    setTimeFrom(moment(eventForUpdate.dateTimeFrom).format("HH:mm"));
    setTimeTo(moment(eventForUpdate.dateTimeTo).format("HH:mm"));
    setDateFrom(moment(eventForUpdate.dateTimeFrom).format("YYYY-MM-DD"));
    setDateTo(moment(eventForUpdate.dateTimeTo).format("YYYY-MM-DD"))
    setIsShowForAddOrUpdateForm(true);
  }

  const showFormForAlEventsHandler = (allEvents) => {
    setAllEventsToDisplay(allEvents);
    setIsShowForAllEventsForm(true);
  }

  const addOrUpdateEventHandler = async () => {
    if (method === "Add") {
      const response = await fetch(`https://localhost:7216/api/Events`, {
        method: "Post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name": eventName,
          "description": eventDescription,
          "dateTimeFrom": moment(dateFrom).format("YYYY-MM-DD" + "T" + timeFrom + ":00"),
          "dateTimeTo": moment(dateTo).format("YYYY-MM-DD" + "T" + timeTo + ":00")
        })
      })
      if (!response.ok) {
        setError('Wrong data');
      } else {
        setError('');
        setIsShowForAddOrUpdateForm(false);
        setIsAddedOrUpdated(true);
      }
    } else {
      const response = await fetch(`https://localhost:7216/api/Events/${event.id}`, {
        method: "Put",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name": eventName,
          "description": eventDescription,
          "dateTimeFrom": moment(dateFrom).format("YYYY-MM-DD" + "T" + timeFrom + ":00"),
          "dateTimeTo": moment(dateTo).format("YYYY-MM-DD" + "T" + timeTo + ":00")
        })
      })
      if (!response.ok) {
        setError('Wrong data');
      } else {
        setError('');
        setEvent(null);
        setIsShowForAddOrUpdateForm(false);
        setIsAddedOrUpdated(true);
      }
    }
  }

  const getData = () => {
    fetch(`https://localhost:7216/api/Events`)
      .then(res => res.json())
      .then(res => setEvents(res));
  }

  const deleteFromAllEventsHandler = async (id) => {
    let newEvents = allEventsToDisplay.filter((element) => element.id != id);
    deleteEventHadler(id);
    console.log(newEvents);
    setAllEventsToDisplay(newEvents);
    setIsShowForAllEventsForm(false);
  }

  const deleteEventHadler = async (id) => {
    await fetch(`https://localhost:7216/api/Events/${id}`, {
      method: "Delete"
    })
    setIsDeleted(true);
  }

  useEffect(() => {
    setIsAddedOrUpdated(false);
    setIsDeleted(false);
    setAllEventsToDisplay([]);
    getData();
  }, [isDeleted, isAddedOrUpdated])

  return (
    <>
      {
        isShowForAllEventsForm ? (
          <FormPositionWrapper onClick={cancelAllEventsButtonHandler}>
            <FormWrapper onClick={e => e.stopPropagation()}>
              <EventListWrapper>
                {allEventsToDisplay.map((eventToDisplay) => (
                  <EventItemWrapper>
                    {
                      eventToDisplay.name.length > 7 ? (
                        <EventTitle onClick={() => showFormForUpdateHandler(eventToDisplay)}>
                          {eventToDisplay.name.slice(0, 8)}...
                        </EventTitle>
                      ) :
                        (
                          <EventTitle onClick={() => showFormForUpdateHandler(eventToDisplay)}>
                            {eventToDisplay.name}
                          </EventTitle>
                        )

                    }
                    <EventButton onClick={() => deleteFromAllEventsHandler(eventToDisplay.id)}>X</EventButton>
                  </EventItemWrapper>
                ))}
              </EventListWrapper>
              <ButtonsWrapper>
                <button onClick={cancelAllEventsButtonHandler}>Cancel</button>
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
        ) : null
      }
      {
        isShowForAddOrUpdateForm ? (
          <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={e => e.stopPropagation()}>
              <div>
                <label>Title</label>
                <div>
                  <input placeholder='Input titile' value={eventName} onChange={(e) => setEventName(e.target.value)}></input>
                </div>
              </div>
              <div>
                <label>Description</label>
                <div>
                  <textarea placeholder='Input description' value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}></textarea>
                </div>
              </div>
              <div>
                <label>Date from</label>
                <div>
                  <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}></input>
                </div>
              </div>
              <div>
                <label>Date to</label>
                <div>
                  <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}></input>
                </div>
              </div>
              <div>
                <label>Time from</label>
                <div>
                  <input placeholder='Input time from' value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)}></input>
                </div>
              </div>
              <div>
                <label>Time to</label>
                <div>
                  <input placeholder='Input time to' value={timeTo} onChange={(e) => setTimeTo(e.target.value)}></input>
                </div>
              </div>
              <ButtonsWrapper>
                <button onClick={addOrUpdateEventHandler}>{method}</button>
                <button onClick={cancelButtonHandler}>Cancel</button>
              </ButtonsWrapper>
              <ErrorWrapper>
                {error}
              </ErrorWrapper>
            </FormWrapper>
          </FormPositionWrapper>
        ) : null
      }

      <Header today={today} previousHandler={prevHandler} todayHandler={todayHandler} nextHandler={nextHandler} selectedDisplayMode={selectedDisplayMode} selectedDisplayModeHandler={selectedDisplayModeHandler} />
      <div style={{ display: "flex" }}>
        <SmallCalendar todaySmallCalendar={todaySmallCalendar} startDaySmallCalendar={startDaySmallCalendar} totalDays={42} prevSmallCalendarHandler={prevSmallCalendarHandler} nextSmallCalendarHandler={nextSmallCalendarHandler} selectedDateSmallCalendar={selectedDateSmallCalendar} />
        {
          selectedDisplayMode === "month" ?
            <MonthCalendarGrid startDay={startDay} today={today} totalDays={42} events={events} deleteEventHadler={deleteEventHadler} showFormForAddingMonthHandler={showFormForAddingMonthHandler} showFormForUpdateHandler={showFormForUpdateHandler} showFormForAlEventsHandler={showFormForAlEventsHandler} />
            :
            <WeekCalendarGrid today={today} deleteEventHadler={deleteEventHadler} events={events} showFormForAddingWeekHandler={showFormForAddingWeekHandler} showFormForUpdateHandler={showFormForUpdateHandler} showFormForAlEventsHandler={showFormForAlEventsHandler} />
        }
      </div>
    </>
  );
}

export default App;
