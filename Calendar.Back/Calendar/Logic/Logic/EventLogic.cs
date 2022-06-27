using DataAccess.Models;
using DTOs;
using Repository.Repositories;

namespace Logic.Logic;

public class EventLogic : IEventLogic
{
    private readonly IEventRepository repository;

    public EventLogic(IEventRepository repository) =>
        this.repository = repository;

    public async Task<Guid> AddAsync(Event model)
    {
        if (!(await BeforeAdd(model)))
            return default;

        return await repository.AddAsync(model);
    }

    public async Task<bool> DeleteAsync(Guid id) => 
        await repository.DeleteAsync(id);

    public async Task<IReadOnlyCollection<Event>> GetAllAsyns() => 
        (await repository.GetAllAsyns()).ToList();

    public async Task<Event?> GetByIdAsync(Guid id) =>
        await repository.GetByIdAsync(id);

    public async Task<bool> UpdateAsync(Event model, Guid id)
    {
        if(!(await BeforeUpdateAsync(model, id)))
            return false;

        return await repository.UpdateAsync(model, id);
    }

    public Event ConvertDTOToEvent(EventDTO dto) =>
        new Event
        {
            Name = dto.Name,
            DateTimeFrom = dto.DateTimeFrom,
            DateTimeTo = dto.DateTimeTo,
            Description = dto.Description
        };

    private async Task<bool> BeforeAdd(Event model)
    {
        if (string.IsNullOrEmpty(model.Name) ||
            string.IsNullOrEmpty(model.Description) ||
            model.DateTimeTo < model.DateTimeFrom)
            return false;

        var events = await repository.GetAllAsyns();

        if (events.FirstOrDefault(x => x.DateTimeTo == model.DateTimeTo || x.DateTimeFrom == model.DateTimeFrom) is not null)
            return false;

        return true;
    }

    private async Task<bool> BeforeUpdateAsync(Event model, Guid id)
    {
        var @event = await this.repository.GetByIdAsync(id);

        if (@event is null)
            return false;

        if (string.IsNullOrEmpty(model.Name) ||
            string.IsNullOrEmpty(model.Description) ||
            model.DateTimeTo > model.DateTimeFrom)
            return false;

        var events = await repository.GetAllAsyns();

        if (events.FirstOrDefault(x => (x.DateTimeTo == model.DateTimeTo 
                                    || x.DateTimeFrom == model.DateTimeFrom) 
                                    && x.Id != id) is not null)
            return false;

        return true;
    }
}
