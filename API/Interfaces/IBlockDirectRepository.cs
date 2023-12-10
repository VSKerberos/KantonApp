namespace API;
public interface IBlockDirectorRepository : IGenericRepository<IslandDirector>
{
  Task<IslandDirector> GetDetails(int id);

  Task<List<IslandDirector>> GetAllBlockDirectors();

  Task<List<Island>>GetAllIslands();

}
