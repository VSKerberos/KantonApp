namespace API;
public class Island
{
    public int Id { get; set; }
    public string Name { get; set; }

    public virtual IList<IslandDirector> IslandDirectors { get; set; }

}
