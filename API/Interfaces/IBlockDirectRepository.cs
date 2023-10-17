namespace API;
public interface IBlockDirectorRepository : IGenericRepository<IslandDirector>
{
  Task<IslandDirector> GetDetails(int id);
}
