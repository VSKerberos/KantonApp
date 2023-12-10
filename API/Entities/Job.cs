namespace API;
public class Job
{
    public int Id { get; set; }

    public string Title { get; set; }

    public ICollection<Director> Directors {get;set;}


}
