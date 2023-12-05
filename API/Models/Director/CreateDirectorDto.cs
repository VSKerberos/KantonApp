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

        public Job job{ get; set; }
}

public class CreateBlockDirectorDto
{
        public int JobId{ get; set; }
        public int IslandId{ get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

}

public class GetBlockDirectorDto
{
        public int Id { get; set; }
         public int JobId{ get; set; }
        public int IslandId{ get; set; }

        public string JobTitle { get; set; }

        public string IslandName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

}


