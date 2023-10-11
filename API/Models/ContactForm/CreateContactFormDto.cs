namespace API;
public class CreateContactFormDto
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Description { get; set; }
}

public class GetContactFormDto
{
     public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Description { get; set; }
}

