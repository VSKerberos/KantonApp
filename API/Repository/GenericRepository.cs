
using Microsoft.EntityFrameworkCore;

namespace API;
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly DataContext _context;

    public GenericRepository(DataContext context)
    {
        this._context = context;
    }
    public async Task<T> AddAsync(T entitiy)
    {
        await _context.AddAsync(entitiy);
        await _context.SaveChangesAsync();
        return entitiy;
    }

    public async Task DeleteAsync(int id)
    {
        var entitiy = await GetAsync(id);
        _context.Set<T>().Remove(entitiy);
        await _context.SaveChangesAsync();

    }

    public async Task<bool> Exists(int id)
    {
        var entitiy = await GetAsync(id);
        return entitiy != null;
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetAsync(int? id)
    {
        if(id == null)
        {
            return null;
        }

        return await _context.Set<T>().FindAsync(id);
    }

    public async Task UpdateAsync(T entitiy)
    {
        _context.Entry(entitiy).State = EntityState.Modified;
        
        await _context.SaveChangesAsync();

;
        
    }
}
