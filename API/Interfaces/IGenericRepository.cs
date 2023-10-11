namespace API;
public interface IGenericRepository<T> where T: class
{
    Task<T> GetAsync(int? id);

    Task<List<T>> GetAllAsync();

    Task<T> AddAsync(T entitiy);

    Task DeleteAsync(int id);
    Task UpdateAsync(T entitiy);
    Task<bool> Exists(int id);

}
