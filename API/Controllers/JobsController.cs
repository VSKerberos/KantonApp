using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;


[ApiController]
[Route("api/[controller]")] // /api/users
public class JobsController : ControllerBase
{
    private readonly IJobRepository jobRepository;
    private readonly IMapper mapper;

    public JobsController(IJobRepository jobRepository, IMapper mapper)
{
        
        this.jobRepository = jobRepository;
        this.mapper = mapper;
    }

// POST: api/Jobs
[Authorize]
[HttpPost]
public async Task<ActionResult<Job>> PostJob(CreateJobDto createJob)
{
    var validator = new CreateJobValidator();
    var results = validator.Validate(createJob);
      if(!results.IsValid) {
        var error = new List<string>();
    foreach (var failure in results.Errors)
            {
                        error.Add($" {failure.ErrorMessage} ");
                       
            }

            return BadRequest(error);
    }

    var job = mapper.Map<Job>(createJob);
    await jobRepository.AddAsync(job);
    return CreatedAtAction("GetJob", new {id = job.Id},job);
}

// GET: api/Jobs
[HttpGet]
public async Task<ActionResult<IEnumerable<GetJobDto>>> GetJobs(){

    var jobs =  await jobRepository.GetAllAsync();
    var records = mapper.Map<List<GetJobDto>>(jobs);
    return Ok(records);

    
}

// GET: api/JOBS/5
[HttpGet("{id}")]
public async Task<ActionResult<Job>> GetJob(int id)
{
     var job = await jobRepository.GetAsync(id);

     if(job == null)
     {
        return NotFound();
     }

     return job;

}

// Put: api/Jobs/5
[Authorize]
[HttpPut("{id}")]
public async Task<ActionResult> PutJob(int id, GetJobDto updateJobDto)
{
    if(id != updateJobDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var job = await jobRepository.GetAsync(id);

    if(job == null)
    {
        return NotFound();
    }

    mapper.Map(updateJobDto,job);
    try
    {
        await jobRepository.UpdateAsync(job);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await JobExists(id))
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
[Authorize]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteJob(int id)
{
    if(!await JobExists(id))
    return NotFound();
    
    await jobRepository.DeleteAsync(id);
    return NoContent();
}

private async Task<bool> JobExists(int id)
{
    return await jobRepository.Exists(id);
}

}
