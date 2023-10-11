namespace API;
public class LinksRepository : GenericRepository<UsefulLink>, ILinkRepository
{
    public LinksRepository(DataContext context) : base(context)
    {
    }
}
