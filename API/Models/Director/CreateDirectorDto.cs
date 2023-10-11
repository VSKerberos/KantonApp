namespace API;
public class CreateDirectorDto
{
        public string Name { get; set; }

        public string SurName { get; set; }

        public int JobId { get; set; }
}

public class GetDirectorDto
{
        public int Id { get; set; }

        public string Name { get; set; }

        public string SurName { get; set; }

        public string JobTitle { get; set; }

        public int JobId { get; set; }
}


/*

 public int Id { get; set; }

    public string Name { get; set; }

    public string Surname { get; set; }

    [ForeignKey(nameof(JobId))]
    public int JobId{ get; set; }
    public Job Job { get; set; }

*/