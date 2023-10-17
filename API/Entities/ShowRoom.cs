using System.ComponentModel.DataAnnotations.Schema;

namespace API;
public class ShowRoom
{
    public int Id { get; set; }
    public string Header { get; set; }
    public string Desc { get; set; }
    public string Path { get; set; }
    public int Status { get; set; }
    [Column(TypeName ="Date")]
    public DateTime CreatedDate { get; set; }
    [Column(TypeName ="Date")]
    public DateTime ModifyDate { get; set; }

}
