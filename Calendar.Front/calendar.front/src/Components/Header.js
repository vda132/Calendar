import React from "react";
import styled from "styled-components";

const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
	color: #DCDDDD;
	padding: 5px;
`;

const ContentWrapper = styled('div')`
    display:flex;
`;

const TextWrapper = styled('span')`
  font-size: 30px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-left: 5px;
  margin-right:8px
`;


const ButtonsWrapper = styled('div')`
    height:40px;
    display: flex;
    align-items: center;
`;

const ButtonWrapper = styled('button')`
  border: unset;
	background-color: #565759;
	height: 40px;
    width: 50px;
	margin-right: 2px;
	border-radius: 4px;
	color: #E6E6E6;
	outline: unset;
	cursor:pointer;
`;

const TodayButton = styled(ButtonWrapper)`
    height:40px;
    width: 80px;
    padding-right: 16px;
	padding-left: 16px;
	font-weight: bold;
    font-size:15px;
    border: unset;
	background-color: #565759;
    border-radius: 4px;
`;

const SelectWrapper = styled('select')`
    height:40px;
    width: 80px;
    font-weight: bold;
    font-size:15px;
    color: #E6E6E6;
	outline: unset;
	cursor:pointer;
    border: unset;
	background-color: #565759;
    border-radius: 4px;
`;

const OptionWrapper = styled('option')`
    height:40px;
    width: 80px;
    margin-right: 30px;
    font-weight: bold;
    font-size:15px;
    color: #E6E6E6;
    outline: unset;
    cursor:pointer;
    border: unset;
    background-color: #565759;
    border-radius: 4px;
`;


const Header = ({ today, previousHandler, todayHandler, nextHandler, selectedDisplayMode, setSelectedDisplayMode }) => {
    return (
        <DivWrapper>
            <ContentWrapper>
                <ButtonsWrapper>
                    <TodayButton onClick={todayHandler}>Today</TodayButton>
                    <ButtonWrapper onClick={previousHandler}>&lt;</ButtonWrapper>
                    <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
                </ButtonsWrapper>
                <TitleWrapper>{today.format('MMMM')} {today.format('YYYY')}</TitleWrapper>
            </ContentWrapper>
            <SelectWrapper
                onChange={e => setSelectedDisplayMode(e.target.value)}
                value={selectedDisplayMode}>
                <OptionWrapper value="month">Month</OptionWrapper>
                <OptionWrapper value="week">Week</OptionWrapper>
            </SelectWrapper>
        </DivWrapper>
    )
}
export { Header }