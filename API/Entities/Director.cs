using System.ComponentModel.DataAnnotations.Schema;

namespace API;
public class Director
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Surname { get; set; }

    public virtual Job job {get;set;}

    public int JobId { get; set; }
    
}   
