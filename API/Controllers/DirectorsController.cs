using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/directors
public class DirectorsController : ControllerBase
{
       private readonly DataContext _context;


       public DirectorsController(DataContext context)
       {
        _context = context;
    }

}
