using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Context;

public class CalendarContext : DbContext 
{
    public CalendarContext(DbContextOptions<CalendarContext> options) : base(options) { }

    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
