namespace API;
public class ShowRoomRepository : GenericRepository<ShowRoom>, IShowRoomRepository
{
    public ShowRoomRepository(DataContext context) : base(context)
    {
    }
}
