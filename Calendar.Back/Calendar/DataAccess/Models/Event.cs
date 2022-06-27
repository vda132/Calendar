namespace DataAccess.Models;

public class Event : ModelBase
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime DateTimeFrom { get; set; }
    public DateTime? DateTimeTo { get; set; }
}
