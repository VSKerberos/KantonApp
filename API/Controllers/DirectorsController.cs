using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/directors
public class DirectorsController : ControllerBase
{
       
    private readonly IDirectorRepository directorRepository;
    private readonly IMapper mapper;

    public DirectorsController(IDirectorRepository directorRepository, IMapper mapper)
       {
        
        this.directorRepository = directorRepository;
        this.mapper = mapper;
    }

    // POST: api/Directors

[HttpPost]
public async Task<ActionResult<CreateDirectorDto>> PostDirector(CreateDirectorDto createDirector)
{

     var director = mapper.Map<Director>(createDirector);
     await directorRepository.AddAsync(director);
     return CreatedAtAction("GetDirector", new {id = director.Id},createDirector);
}

// GET: api/Directors/5
[HttpGet("{id}")]
public async Task<ActionResult<GetDirectorDto>> GetDirector(int id)
{
     var director = await directorRepository.GetAsync(id);

     if(director == null)
     {
        return NotFound();
     }

    var dtoDirector = mapper.Map<GetDirectorDto>(director);
     return dtoDirector;

}

// GET: api/Directors
[HttpGet]
public async Task<ActionResult<IEnumerable<GetDirectorDto>>> GetDirectors(){

    var directors =  await directorRepository.GetAllAsync();
    var records = mapper.Map<List<GetDirectorDto>>(directors);
    return Ok(records);   
}

// Put: api/Directors/5
[HttpPut("{id}")]
public async Task<ActionResult> PutDirector(int id, GetDirectorDto updateDirectorDto)
{
    if(id != updateDirectorDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var updatedDirector = await directorRepository.GetAsync(id);

    if(updatedDirector == null)
    {
        return NotFound();
    }

        
    updatedDirector.Name = updateDirectorDto.Name;
    updatedDirector.Surname = updateDirectorDto.SurName;
    updatedDirector.JobId = updateDirectorDto.JobId;
   
    try
    {
        await directorRepository.UpdateAsync(updatedDirector);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await DirectorExists(id))
        {
            return NotFound();
        }
        else {
        throw;
        }
    }

    return NoContent();
}



// Delete: api/Director/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteDirector(int id)
{
    if(!await DirectorExists(id))
    return NotFound();
    
    await directorRepository.DeleteAsync(id);
    return NoContent();
}

private async Task<bool> DirectorExists(int id)
{
    return await directorRepository.Exists(id);
}


}
