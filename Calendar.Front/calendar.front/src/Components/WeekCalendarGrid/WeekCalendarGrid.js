import React from "react";
import moment from 'moment';
import styled from 'styled-components';
import { EventsList } from "../EventList/EventsList";

const GridWrapperHeader = styled.div`
    margin-left:67px;
    margin-top:5px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
`;

const CellWrapperHeader = styled.div`
    height: 55px;
    min-width: 140px;
    background-color: '#fff';
    color: '#555759';
    border: #dadce0 1px solid;
`;

const DayWrapper = styled.div`
    height: 31px;
    width: 31px;
    display: flex;
    align-items: center;
    margin: auto;
    justify-content: center;
    background: ${props => props.isCurrentDay ? '#0000FF' : ''};
    border-radius: 50%;
    color:  ${props => props.isCurrentDay ? '#FFFFFF' : ''};
    display: flex;
`;

const TimeWrapper = styled.div`
    margin-top:3px;
    widht:50px;
`;

const Time = styled.div`
    height:82px;
    magrin-right:5px;
`;

const ContentWrapper = styled.div`
    display:flex;
`;

const GridWrapper = styled.div`
    margin-top:5px;
    display: grid;
    grid-template-rows: repeat(24, 1fr);
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
`;

const CellWrapper = styled.div`
    z-index:1;
    height: 80px;
    min-width: 140px;
    background-color: '#fff';
    color: '#555759';
    border: #dadce0 1px solid;
`;

const Cell = styled.div`
    z-index:0;
    height: 80px;
    width: 140px;
    cursor: pointer;
`;

const EventSlot = styled.div`
    display: flex;
    position:absolute;
    width:60;
    background:blue;
    border-radius: 3px;
    z-index:2;
    width:140px;
    justify-content: space-between;
    grid-row:1;
    margin-top:${props => props.marginTop ? props.marginTop : ""}
`;

const EventTitle = styled.div`
    color:white;
    cursor: pointer;
    font-size:15px;
`

const WeekCalendarGrid = ({ today, deleteEventHadler, events, showFormForAddingWeekHandler, showFormForUpdateHandler, showFormForAlEventsHandler }) => {
    const startDay = today.clone().startOf("week").startOf("day").subtract(1, 'day');
    const daysMap = [...Array(7)].map(() => startDay.add(1, 'day').clone());
    
    const hours = [...Array(24)].map(() => startDay.add(1, "hour").clone());

    const cells = [...Array(24)].map(() => [...Array(7)].map(() => 0));
   
    const isCurrentDay = (day) => moment().isSame(day, 'day');


    const getEvents = (dateIndex, timeIndex) => {
        return events.filter((elem) => new Date(elem.dateTimeFrom).toDateString() == daysMap[dateIndex].format("ddd MMM D YYYY") && new Date(elem.dateTimeFrom).getHours() == hours[timeIndex].format("H"));
    }

    return (
        <div>
            <GridWrapperHeader>
                {daysMap.map((dayItem) => (
                    <CellWrapperHeader>
                        {dayItem.format('dddd')}
                        {
                            isCurrentDay(dayItem) ?
                                <DayWrapper isCurrentDay>
                                    {dayItem.format('D')}
                                </DayWrapper> :
                                <DayWrapper>
                                    {dayItem.format('D')}
                                </DayWrapper>
                        }
                    </CellWrapperHeader>
                ))}
            </GridWrapperHeader>
            <ContentWrapper>
                <TimeWrapper>
                    {
                        hours.map((hour) => (
                            <Time>
                                {hour.format("LT")}
                            </Time>
                        ))
                    }
                </TimeWrapper>
                <GridWrapper>
                    {
                        cells.map((cell, i) => (
                            cell.map((row, j) => {
                                return (
                                    <CellWrapper>
                                        <EventsList events={getEvents(j, i)} deleteEventHadler={deleteEventHadler} showFormForUpdateHandler={showFormForUpdateHandler} showFormForAlEventsHandler={showFormForAlEventsHandler}/>
                                        <Cell onClick={() => showFormForAddingWeekHandler(daysMap[j], hours[i], hours[parseInt(i+1)])}></Cell>
                                    </CellWrapper>
                                )
                            })))}
                </GridWrapper>
            </ContentWrapper>

        </div>
    )

}
export { WeekCalendarGrid }