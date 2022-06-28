import moment from 'moment';
import styled from 'styled-components';

const EventListWrapper = styled('ul')`
    min-width:140px;
	margin: unset;
`;

const EventItemWrapper = styled('div')`
    min-width:140px;
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

const EventsList = ({ events, deleteEventHadler, showFormForUpdateHandler, showFormForAlEventsHandler }) => {
    return (
        events ? (
            events.length > 2 ? (
                <div>
                    <EventListWrapper>
                        {events.slice(0, 2).map((item) => (
                            <EventItemWrapper>
                                {
                                    item.name.length > 7 ? (
                                        <EventTitle onClick={() => showFormForUpdateHandler(item)}>
                                            {item.name.slice(0,8)}...
                                        </EventTitle>
                                    ) : 
                                    (
                                        <EventTitle onClick={() => showFormForUpdateHandler(item)}>
                                            {item.name}
                                        </EventTitle>
                                    )

                                }
                                <EventButton onClick={() => deleteEventHadler(item.id)}>X</EventButton>
                            </EventItemWrapper>
                        ))}
                    </EventListWrapper>
                    <button style={{ marginTop: "5px", zIndex: 1000 }} onClick={() => showFormForAlEventsHandler(events)}>Look all</button>
                </div>
            )
                : (
                    events.map((item) => (
                        <EventListWrapper>
                            <EventItemWrapper>
                            {
                                    item.name.length > 7 ? (
                                        <EventTitle onClick={() => showFormForUpdateHandler(item)}>
                                            {item.name.slice(0,8)}...
                                        </EventTitle>
                                    ) : 
                                    (
                                        <EventTitle onClick={() => showFormForUpdateHandler(item)}>
                                            {item.name}
                                        </EventTitle>
                                    )

                                }
                                <EventButton onClick={() => deleteEventHadler(item.id)}>X</EventButton>
                            </EventItemWrapper>
                        </EventListWrapper>
                    ))
                )
        ) : null)
}

export { EventsList }