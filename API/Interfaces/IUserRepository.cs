namespace API;
public interface IUserRepository : IGenericRepository<AppUser>
{
    Task<AppUser> SingleOrDefault(string UserName);
}
