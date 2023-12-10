
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace API;
public class BlockDirectorRepository : GenericRepository<IslandDirector>, IBlockDirectorRepository
{
    private readonly DataContext context;

    public BlockDirectorRepository(DataContext context) : base(context)
    {
        this.context = context;
    }

    public Task<List<IslandDirector>> GetAllBlockDirectors()
    {
        return context.IslandDirectors
        .Include(i=>i.Island)
        .ThenInclude(x=>x.IslandDirectors)
        .ThenInclude(y=>y.Job)
        .ToListAsync();
    }

    public async Task<List<Island>> GetAllIslands()
    {
       return await context.Islands.ToListAsync();
    }

    public Task<IslandDirector> GetDetails(int id)
    {
      
      return context.IslandDirectors
      .Where(d=>d.Id == id)
      .Include(s=>s.Island)
      .ThenInclude(x=>x.IslandDirectors)
      .ThenInclude(y=>y.Job)
      .FirstOrDefaultAsync();
    }
}
