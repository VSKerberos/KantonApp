using System.ComponentModel.DataAnnotations.Schema;

namespace API;
public class IslandDirector
{
    public int Id { get; set; }
    
     [ForeignKey(nameof(JobId))]
    public int JobId{ get; set; }
    public Job Job { get; set; }

    [ForeignKey(nameof(IslandId))]
    public int IslandId{ get; set; }
    public Island   Island { get; set; }

    public string Name { get; set; }
    public string Surname { get; set; }

}
