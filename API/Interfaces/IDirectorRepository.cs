namespace API;
public interface IDirectorRepository : IGenericRepository<Director>
{
     Task<Director> GetDetails(int id);
}
