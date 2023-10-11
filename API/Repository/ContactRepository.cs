namespace API;
public class ContactRepository : GenericRepository<Contact>, IContactRepository
{
    public ContactRepository(DataContext context) : base(context)
    {
    }
}
