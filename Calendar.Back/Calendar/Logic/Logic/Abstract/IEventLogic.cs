using DataAccess.Models;
using DTOs;

namespace Logic.Logic;

public interface IEventLogic : IBaseLogic<Event>
{
    Event ConvertDTOToEvent(EventDTO dto);
}
