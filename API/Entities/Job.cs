namespace API;
public class Job
{
    public int Id { get; set; }

    public string Title { get; set; }

    public virtual IList<Director> Directors { get; set; }



}
