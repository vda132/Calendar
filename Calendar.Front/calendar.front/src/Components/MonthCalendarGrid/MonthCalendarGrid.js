import React from "react";
import moment from 'moment';
import styled from 'styled-components';

const ContentWrapper = styled.div`  
    width:80%;
`;

const GridWrapper = styled.div`
    margin-top:5px;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
    text-align: center;
`;

const CellWrapper = styled.div`
	min-height: 120px;
	min-width: 100px;
	background-color: '#fff';
	color: ${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
    border: #dadce0 1px solid;
`;

const CellWrapperHeader = styled.div`
	min-height: 24px;
	min-width: 140px;
	background-color: '#fff';
	color: '#555759';
    border: #dadce0 1px solid;
`;


const RowInCell = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
	${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const ShowDayWrapper = styled('div')`
	display: flex;
	justify-content: center;
`;

const DayWrapper = styled.div`
	height: 31px;
	width: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
	cursor: pointer;
    background: ${props => props.isCurrentDay ? '#0000FF' : ''};
    border-radius: 50%;
    color:  ${props => props.isCurrentDay ? '#FFFFFF' : ''};
    display: flex;
    align-items: center;
    justify-content: center;

;`

const EventListWrapper = styled('ul')`
	margin: unset;
`;

const EventItemWrapper = styled('button')`
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

`;


const MonthCalendarGrid = ({ startDay, today, totalDays, events, deleteEventHadler }) => {
    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
    const isCurrentDay = (day) => moment().isSame(day, 'day');

    return (
        <ContentWrapper>
            <GridWrapper>
                {
                    [...Array(7)].map((_, i) => (
                        <CellWrapperHeader key={i}>
                            <RowInCell pr={1}>
                                {moment().day(i).format('ddd')}
                            </RowInCell>
                        </CellWrapperHeader>
                    ))
                }
            </GridWrapper>
            <GridWrapper>
                {
                    daysMap.map((dayItem) => {
                        let filteredEvents = events.filter(event => new Date(event.dateTimeFrom).toDateString() == dayItem.format("ddd MMM D YYYY"));
                        console.log(filteredEvents.length);
                        return (
                            <CellWrapper>
                                <RowInCell justifyContent={'flex-end'}>
                                    <ShowDayWrapper>
                                        {
                                            isCurrentDay(dayItem) ?
                                                (
                                                    <DayWrapper isCurrentDay onClick={() => { console.log(dayItem) }}>
                                                        {dayItem.format('D')}
                                                    </DayWrapper>
                                                ) : (<DayWrapper onClick={() => { console.log(dayItem) }}>
                                                    {dayItem.format('D')}
                                                </DayWrapper>
                                                )
                                        }
                                    </ShowDayWrapper>

                                    {filteredEvents.length > 2 ? (
                                        <>
                                        <EventListWrapper>
                                            {filteredEvents.slice(0, 2).map((item) => (
                                                <EventItemWrapper>
                                                    {item.name}
                                                    <EventButton onClick={()=> deleteEventHadler(item.id)}>X</EventButton>

                                                </EventItemWrapper>
                                            ))}
                                        </EventListWrapper>
                                            <button style={{marginTop:"5px"}} onClick={() => { console.log(filteredEvents) }}>Look all</button>
                                        </>
                                    )
                                        : (
                                            filteredEvents.map((item) => (
                                                <EventListWrapper>
                                                    <EventItemWrapper>
                                                        {item.name}
                                                        <EventButton onClick={()=>  deleteEventHadler(item.id)}>X</EventButton>
                                                    </EventItemWrapper>
                                                </EventListWrapper>
                                        )))}


                                                    </RowInCell>
                                                </CellWrapper>
                                            )
                    })
                }
                                </GridWrapper>
                            </ContentWrapper >
                        )
                    }

export {MonthCalendarGrid}