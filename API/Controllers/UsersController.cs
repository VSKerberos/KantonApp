using AutoMapper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace API;


[ApiController]
[Route("api/[controller]")] // /api/users
public class UsersController : ControllerBase
{
    private readonly IUserRepository userRepository;
    private readonly IMapper mapper;

    public UsersController(IUserRepository userRepository,IMapper mapper)
{
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

[HttpGet]
public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
{
    var users = await userRepository.GetAllAsync();

    return users;
}

[HttpGet("{id}")]
public async Task<ActionResult<AppUser>> GetUser(int id)
{
    return await userRepository.GetAsync(id);

}

// POST: api/Contacts
[HttpPost]
public async Task<ActionResult<AppUserDto>> PostContact(AppUserDto createUser)
{
    var validator = new CreateAppUserValidator();
    var results = validator.Validate(createUser);

    if(!results.IsValid) {
        var error = new List<string>();
    foreach (var failure in results.Errors)
            {
                        error.Add($" {failure.ErrorMessage} ");
                       
            }

            return BadRequest(error);
    }

     var user = mapper.Map<AppUser>(createUser);
     await userRepository.AddAsync(user);
     return CreatedAtAction("GetUser", new {id = user.Id},user);
}

// Put: api/Jobs/5
[HttpPut("{id}")]
public async Task<ActionResult> PutJob(int id, AppUserDto createUserDto)
{
    if(id != createUserDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var user = await userRepository.GetAsync(id);

    if(user == null)
    {
        return NotFound();
    }

    mapper.Map(createUserDto,user);
    try
    {
        await userRepository.UpdateAsync(user);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await UserExists(id))
        {
            return NotFound();
        }
        else {
        throw;
        }
    }

    return NoContent();
}

// Delete: api/User/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteJob(int id)
{
    if(!await UserExists(id))
    return NotFound();
    
    await userRepository.DeleteAsync(id);
    return NoContent();
}

private async Task<bool> UserExists(int id)
{
    return await userRepository.Exists(id);
}



}
