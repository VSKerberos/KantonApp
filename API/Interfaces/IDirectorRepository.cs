namespace API;
public interface IDirectorRepository : IGenericRepository<Director>
{
     Task<List<Director>> GetDetails();
}
