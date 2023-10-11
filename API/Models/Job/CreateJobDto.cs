using System.ComponentModel.DataAnnotations;

namespace API;

public class CreateJobDto
{
        [Required]
        public string Title { get; set; }

}
