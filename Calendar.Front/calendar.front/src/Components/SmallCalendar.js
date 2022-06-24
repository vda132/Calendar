import React from "react";
import { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ContentWrapper = styled.div`  
    margin-top:10px;
    margin-right:20px;
    margin-left:10px;
`;

const HeaderWrapper = styled.div`
    display:flex;
    margin-bottom:5px;
    justify-content: space-between;
    margin-right: 10px;
`;

const TitleWrapper = styled.div`
    font-weight: bold;
    margin-left: 5px;
    margin-right:8px
`;

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-right:10px;
`;

const CellWrapper = styled.div`
    height:40px;
	width: 40px;
	background-color: '#fff';
	color: '#555759';
    border: #dadce0 1px solid;
`;

const CellWrapperHeader = styled.div`
	min-width: 30px;
	background-color: '#fff';
	color: '#555759';
    border: #dadce0 1px solid;
    margin-bottom:2px;
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
	cursor: pointer;
    background: ${props => props.isCurrentDay ? '#0000FF' : ''};
    border-radius: 50%;
    color:  ${props => props.isCurrentDay ? '#FFFFFF' : ''};
    display: flex;
    align-items: center;
    justify-content: center;
;`

const ButtonsWrapper = styled('div')`
    height:20px;
    display: flex;
    align-items: center;
`;

const ButtonWrapper = styled('button')`
    border: unset;
    background-color: #565759;
    height: 20px;
    width: 25px;
    margin-right: 2px;
    border-radius: 4px;
    color: #E6E6E6;
    outline: unset;
    cursor:pointer;
`;

const SmallCalendar = ({ todaySmallCalendar, startDaySmallCalendar, totalDays, prevSmallCalendarHandler, nextSmallCalendarHandler, selectedDateSmallCalendar }) => {
    const day = startDaySmallCalendar.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

    const isCurrentDay = (day) => moment().isSame(day, 'day');

    return (
        <>
            <ContentWrapper>
                <HeaderWrapper>
                    <TitleWrapper>
                        {todaySmallCalendar.format('MMMM')} {todaySmallCalendar.format('YYYY')}
                    </TitleWrapper>
                    <ButtonsWrapper>
                        <ButtonWrapper onClick={prevSmallCalendarHandler}>&lt;</ButtonWrapper>
                        <ButtonWrapper onClick={nextSmallCalendarHandler}>&gt;</ButtonWrapper>
                    </ButtonsWrapper>
                </HeaderWrapper>
                <GridWrapper>
                    {
                        [...Array(7)].map((_, i) => (
                            <CellWrapperHeader>
                                <RowInCell pr={1}>
                                    {moment().day(i).format('ddd')}
                                </RowInCell>
                            </CellWrapperHeader>
                        ))
                    }
                </GridWrapper>
                <GridWrapper>
                    {
                        daysMap.map((dayItem) => (
                            <CellWrapper>
                                <RowInCell justifyContent={'flex-end'}>
                                    <ShowDayWrapper>
                                        {isCurrentDay(dayItem) ?
                                            (
                                                <DayWrapper isCurrentDay onClick={() => selectedDateSmallCalendar(dayItem)}>
                                                    {dayItem.format('D')}
                                                </DayWrapper>
                                            ) : (<DayWrapper onClick={() => selectedDateSmallCalendar(dayItem)}>
                                                {dayItem.format('D')}
                                            </DayWrapper>
                                            )}
                                    </ShowDayWrapper>
                                </RowInCell>
                            </CellWrapper>
                        ))
                    }
                </GridWrapper>
            </ContentWrapper>
        </>
    )
}

export { SmallCalendar }