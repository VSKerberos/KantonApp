using Microsoft.EntityFrameworkCore;

namespace API;
public class DirectorsRepository : GenericRepository<Director>, IDirectorRepository
{
    private readonly DataContext context;

    public DirectorsRepository(DataContext context) : base(context)
    {
        this.context = context;
    }

    public  async Task<List<Director>> GetDetails()
    {
        
// Get employees & departments
return await context.Directors.Include(e => e.job)
                                 .OrderBy(e => e.Name)   
                                 .ToListAsync();


    }
}
