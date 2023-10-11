namespace API;
public class JobsRepository : GenericRepository<Job>, IJobRepository
{
    public JobsRepository(DataContext context) : base(context)
    {
    }
}
