using DataAccess.Models;

namespace Logic.Logic;

public interface IBaseLogic<T> where T : ModelBase
{
    Task<Guid> AddAsync(T model);
    Task<bool> UpdateAsync(T model, Guid id);
    Task<bool> DeleteAsync(Guid id);
    Task<T?> GetByIdAsync(Guid id);
    Task<IReadOnlyCollection<T>> GetAllAsyns();
}
