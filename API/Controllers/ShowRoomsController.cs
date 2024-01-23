using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;


[ApiController]
[Route("api/[controller]")] // /api/showrooms
public class ShowRoomsController : ControllerBase
{
    private readonly IShowRoomRepository showRoomRepository;
    private readonly IMapper mapper;

    public ShowRoomsController(IShowRoomRepository showRoomRepository,IMapper mapper)
    {
        this.showRoomRepository = showRoomRepository;
        this.mapper = mapper;
    }


// POST: api/ShowRooms
[Authorize]
[HttpPost]
public async Task<ActionResult<GetShowRoomDto>> PostLink(CreateShowRoomDto createShowRoomDto)
{
    var showRoom = mapper.Map<ShowRoom>(createShowRoomDto);
    showRoom.CreatedDate = showRoom.CreatedDate = DateTime.Now;
    await showRoomRepository.AddAsync(showRoom);
    return CreatedAtAction("GetShowRoom", new {id = showRoom.Id},showRoom);
}

// GET: api/ShowRooms/5
[HttpGet("{id}")]
public async Task<ActionResult<GetShowRoomDto>> GetShowRoom(int id)
{
     var showRoom = await showRoomRepository.GetAsync(id);

     if(showRoom == null)
     {
        return NotFound();
     }

    var dtoShowRoom = mapper.Map<GetShowRoomDto>(showRoom);
     return dtoShowRoom;

}

// GET: api/ShowRooms
[HttpGet]
public async Task<ActionResult<IEnumerable<GetShowRoomDto>>> GetShowRooms(){

    var showRooms =  await showRoomRepository.GetAllAsync();
    var records = mapper.Map<List<GetShowRoomDto>>(showRooms);
    return Ok(records);   
}

// Put: api/ShowRooms/5
[HttpPut("{id}")]
public async Task<ActionResult> PutShowRoom(int id, GetShowRoomDto updateShowRoomDto)
{
    if(id != updateShowRoomDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var showRoom = await showRoomRepository.GetAsync(id);

    if(showRoom == null)
    {
        return NotFound();
    }

    mapper.Map(updateShowRoomDto,showRoom);
    try
    {
        await showRoomRepository.UpdateAsync(showRoom);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await ShowRoomExists(id))
        {
            return NotFound();
        }
        else {
        throw;
        }
    }

    return NoContent();
}

// Delete: api/ShowRoom/5
[Authorize]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteShowRoom(int id)
{
    if(!await ShowRoomExists(id))
    return NotFound();
    
    await showRoomRepository.DeleteAsync(id);
    return NoContent();
}

private async Task<bool> ShowRoomExists(int id)
{
    return await showRoomRepository.Exists(id);
}


}
