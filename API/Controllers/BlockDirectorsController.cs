using System.Drawing;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/contacts
public class BlockDirectorsController :ControllerBase
{
    private readonly IBlockDirectorRepository blockDirectorRepository;
    private readonly IMapper mapper;

    public BlockDirectorsController(IBlockDirectorRepository blockDirectorRepository, IMapper mapper)
    {
        this.blockDirectorRepository = blockDirectorRepository;
        this.mapper = mapper;
    }

    // POST: api/BlockDirectors
[HttpPost]
public async Task<ActionResult<CreateBlockDirectorDto>> PostContact(CreateBlockDirectorDto createBlockDirector)
{
     var blockDirector = mapper.Map<IslandDirector>(createBlockDirector);
     await blockDirectorRepository.AddAsync(blockDirector);
     return CreatedAtAction("GetBlockDirectors", new {id = blockDirector.Id},blockDirector);
}

// GET: api/BlockDirectors/5
[HttpGet("{id}")]
public async Task<ActionResult<GetBlockDirectorDto>> GetBlockDirector(int id)
{
     var blockDirector = await blockDirectorRepository.GetDetails(id);

     if(blockDirector == null)
     {
        return NotFound();
     }

    var dtoBlockDirector = mapper.Map<GetBlockDirectorDto>(blockDirector);
     return dtoBlockDirector;
}


// GET: api/BlockDirectors
[HttpGet]
public async Task<ActionResult<IEnumerable<GetBlockDirectorDto>>> GetBlockDirectors(){

    var blockDirectors =  await blockDirectorRepository.GetAllAsync();
    var records = mapper.Map<List<GetBlockDirectorDto>>(blockDirectors);
    return Ok(records);   
}

// GET: api/Islands
[HttpGet]
public async Task<ActionResult<IEnumerable<GetIslandDto>>> GetIslands(){

    var islands = await blockDirectorRepository.GetAllIslands();
    var records = mapper.Map<List<GetIslandDto>>(islands);
    return Ok(records);
}

// Put: api/BlockDirectors/5
[HttpPut("{id}")]
public async Task<ActionResult> PutBlockDirector(int id, GetBlockDirectorDto updateBlockDirectorDto)
{
    if(id != updateBlockDirectorDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var updatedBlockDirector = await blockDirectorRepository.GetAsync(id);

    if(updatedBlockDirector == null)
    {
        return NotFound();
    }

        
    updatedBlockDirector.Name = updateBlockDirectorDto.Name;
    updatedBlockDirector.Surname = updateBlockDirectorDto.Surname;
    updatedBlockDirector.IslandId = updateBlockDirectorDto.IslandId;
    updatedBlockDirector.JobId = updateBlockDirectorDto.JobId;

   
    try
    {
        await blockDirectorRepository.UpdateAsync(updatedBlockDirector);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await BlockDirectorExists(id))
        {
            return NotFound();
        }
        else {
        throw;
        }
    }

    return NoContent();
}

// Delete: api/Contacts/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteBlockDirector(int id)
{
    if(!await BlockDirectorExists(id))
    return NotFound();
    
    await blockDirectorRepository.DeleteAsync(id);
    return NoContent();
}


private async Task<bool> BlockDirectorExists(int id)
{
    return await blockDirectorRepository.Exists(id);
}

}
