using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repositories;

public class EventRepository : IEventRepository
{
    private readonly CalendarContext context;

    public EventRepository(CalendarContext context) =>
        this.context = context;

    public async Task<Guid> AddAsync(Event model)
    {
        var id = Guid.NewGuid();

        model.Id = id;

        await context.Events.AddAsync(model);
        await context.SaveChangesAsync();

        return id;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var @event = await GetEvent(context, id);

        if(@event is null)
            return false;

        context.Events.Remove(@event!);
        await context.SaveChangesAsync();
        
        return true;
    }

    public async Task<IReadOnlyCollection<Event>> GetAllAsyns() =>
        await context.Events.ToListAsync();

    public async Task<Event?> GetByIdAsync(Guid id) => 
        await GetEvent(context, id);

    public async Task<bool> UpdateAsync(Event model, Guid id)
    {
        var @event = await GetEvent(context, id);

        if (@event is null)
            return false;

        @event.Name = model.Name;
        @event.DateTimeTo = model.DateTimeTo;
        @event.DateTimeFrom = model.DateTimeFrom;
        @event.Description = model.Description;

        await context.SaveChangesAsync();

        return true;
    }

    private static async Task<Event?> GetEvent(CalendarContext context, Guid id) =>
        await context.Events.FindAsync(id);
}
