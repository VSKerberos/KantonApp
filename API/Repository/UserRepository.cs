namespace API;
public class UserRepository : GenericRepository<AppUser>, IUserRepository
{
    public UserRepository(DataContext context) : base(context)
    {
    }
}
