namespace API;
public class CreateLinkDto
{
    public string Title { get; set; }
    
    public string Url { get; set; }

    public string Description { get; set; }
}


public class GetLinkDto 
{
    public int Id { get; set; }
    public string Title { get; set; }
    
    public string Url { get; set; }

    public string Description { get; set; }
}
