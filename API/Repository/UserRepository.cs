using Microsoft.EntityFrameworkCore;

namespace API;
public class UserRepository : GenericRepository<AppUser>, IUserRepository
{
    private readonly DataContext context;

    public UserRepository(DataContext context) : base(context)
    {
        this.context = context;
    }
  

          public  async Task<AppUser> SingleOrDefault(string UserName)
    {
        
            // Get employees & departments
        return await context.Users.SingleOrDefaultAsync(x=>x.UserName == UserName);


    }
    
}
