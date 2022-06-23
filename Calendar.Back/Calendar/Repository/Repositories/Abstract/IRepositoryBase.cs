using DataAccess.Models;

namespace Repository.Repositories;

public interface IRepositoryBase<T> where T : ModelBase
{
    Task<Guid> AddAsync(T model);
    Task<bool> UpdateAsync(T model, Guid id);
    Task<bool> DeleteAsync(Guid id);
    Task<T?> GetByIdAsync(Guid id);
    Task<IReadOnlyCollection<T>> GetAllAsyns();
}
