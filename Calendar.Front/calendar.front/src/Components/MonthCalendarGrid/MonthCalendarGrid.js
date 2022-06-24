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
    color:  ${props => props.isCurrentDay ?'#FFFFFF':''};
    display: flex;
    align-items: center;
    justify-content: center;

;`


const MonthCalendarGrid = ({ startDay, today, totalDays }) => {
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
                    daysMap.map((dayItem) => (
                        <CellWrapper>
                            <RowInCell justifyContent={'flex-end'}>
                                <ShowDayWrapper>
                                    {
                                        isCurrentDay(dayItem) ?
                                            (
                                                <DayWrapper isCurrentDay>
                                                    {dayItem.format('D')}
                                                </DayWrapper>
                                            ) : (<DayWrapper onClick={()=>{console.log(dayItem)}}>
                                                {dayItem.format('D')}
                                            </DayWrapper>
                                            )
                                    }
                                </ShowDayWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
        </ContentWrapper>
    )
}

export { MonthCalendarGrid }