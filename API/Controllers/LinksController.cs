using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/links
public class LinksController : ControllerBase
{
    private readonly ILinkRepository linkRepository;
    private readonly IMapper mapper;

    public LinksController(ILinkRepository linkRepository, IMapper mapper)
    {
        this.linkRepository = linkRepository;
        this.mapper = mapper;
    }

    // POST: api/Links
    [Authorize]
    [HttpPost]
public async Task<ActionResult<GetLinkDto>> PostLink(CreateLinkDto createLinkDto)
{
    var usefulLink = mapper.Map<UsefulLink>(createLinkDto);
    await linkRepository.AddAsync(usefulLink);
    return CreatedAtAction("GetLink", new {id = usefulLink.Id},usefulLink);
}

// GET: api/Links/5
[HttpGet("{id}")]
public async Task<ActionResult<GetLinkDto>> GetLink(int id)
{
     var usefulLink = await linkRepository.GetAsync(id);

     if(usefulLink == null)
     {
        return NotFound();
     }

    var dtoUsefulLink = mapper.Map<GetLinkDto>(usefulLink);
     return dtoUsefulLink;

}

// GET: api/Links
[HttpGet]
public async Task<ActionResult<IEnumerable<GetLinkDto>>> GetLinks(){

    var usefulLinks =  await linkRepository.GetAllAsync();
    var records = mapper.Map<List<GetLinkDto>>(usefulLinks);
    return Ok(records);   
}

// Put: api/Link/5
[Authorize]
[HttpPut("{id}")]
public async Task<ActionResult> PutLink(int id, GetLinkDto updateLinkDto)
{
    if(id != updateLinkDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var usefulLink = await linkRepository.GetAsync(id);

    if(usefulLink == null)
    {
        return NotFound();
    }

    mapper.Map(updateLinkDto,usefulLink);
    try
    {
        await linkRepository.UpdateAsync(usefulLink);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await LinkExists(id))
        {
            return NotFound();
        }
        else {
        throw;
        }
    }

    return NoContent();
}

// Delete: api/Link/5
[Authorize]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteLink(int id)
{
    if(!await LinkExists(id))
    return NotFound();
    
    await linkRepository.DeleteAsync(id);
    return NoContent();
}

private async Task<bool> LinkExists(int id)
{
    return await linkRepository.Exists(id);
}


}
