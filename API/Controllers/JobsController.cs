using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;


[ApiController]
[Route("api/[controller]")] // /api/users
public class JobsController : ControllerBase
{
        private readonly DataContext _context;
public JobsController(DataContext context)
{
        _context = context;
}

// POST: api/Jobs

[HttpPost]
public async Task<ActionResult<Job>> PostJob(Job job)
{
    _context.Jobs.Add(job);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetJob", new {id = job.Id},job);
}

// GET: api/Jobs
[HttpGet]
public async Task<ActionResult<IEnumerable<Job>>> GetJobs(){

    return await _context.Jobs.ToListAsync();
}

// GET: api/JOBS/5
[HttpGet("{id}")]
public async Task<ActionResult<Job>> GetJob(int id)
{
     var job = await _context.Jobs.FindAsync(id);

     if(job == null)
     {
        return NotFound();
     }

     return job;

}

// Put: api/Jobs/5
[HttpPut("{id}")]
public async Task<ActionResult> PutJob(int id, Job job)
{
    if(id != job.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    _context.Entry(job).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!JobExists(id))
        {
            return NotFound();
        }
        else {
        throw;
        }
    }

    return NoContent();
}

// Delete: api/Job/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteJob(int id)
{
    if(!JobExists(id))
    return NotFound();

    var job = await _context.Jobs.FindAsync(id);
    _context.Jobs.Remove(job);
    await _context.SaveChangesAsync();
    return NoContent();
}

private bool JobExists(int id)
{
    return _context.Jobs.Any(e=>e.Id == id);
}

}
