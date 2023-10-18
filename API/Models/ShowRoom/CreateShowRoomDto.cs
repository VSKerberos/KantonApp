namespace API;
public class CreateShowRoomDto
{
    public string Header { get; set; }
    public string Desc { get; set; }
    public string Path { get; set; }
    public int Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifyDate { get; set; }

}

public class GetShowRoomDto {

    public int Id { get; set; }
    public string Header { get; set; }
    public string Desc { get; set; }
    public string Path { get; set; }
    public int Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifyDate { get; set; }

}
