using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Identity.Client;

namespace API;


[ApiController]
[Route("api/[controller]")] // /api/directors
public class FilesController : ControllerBase
{
    private readonly IConfiguration iConfig;
    private readonly IShowRoomRepository showRoomRepository;

    public FilesController(IConfiguration iConfig,IShowRoomRepository showRoomRepository)
    {
        this.iConfig = iConfig;
         this.showRoomRepository = showRoomRepository;
    }

[Authorize]
[HttpPost]
[Route("UploadFile")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(typeof(string),StatusCodes.Status400BadRequest)]

public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationToken)
{
    if(file==null)
    return BadRequest("File is null");

    var result = await WriteFile(file);
    if(!result.Equals(string.Empty))
    return Ok(result);
    else
    return NoContent();
}

    private async Task<string> WriteFile(IFormFile file)
    {
            //get the list of strings as an object
        var section = this.iConfig.GetSection("AllowedExtensions");

        //the Get<T> method attempts to bind any value with the given type 
        //to the new property, in this case 'values' 
        string[] permittedExtensions = section.Get<string[]>();
            string filename = string.Empty;
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length -1];

                 if(!permittedExtensions.Contains(extension))
                    return string.Empty;

                filename = DateTime.Now.Ticks.ToString() + extension;

                var filepath = Path.Combine(Directory.GetCurrentDirectory(),"Upload\\Files");

                if(!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exacpath = Path.Combine(Directory.GetCurrentDirectory(),"Upload\\Files",filename);
                filename = exacpath;
                using (var stream = new FileStream(exacpath,FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    
                }
            }
            catch (Exception ex)
            {

            throw ex;
        }

            return filename;

    }


    [HttpGet("downloadfile/{filename}")]
    public async Task<IActionResult> DownloadFile(string filename)
    {
                        var filepath = Path.Combine(Directory.GetCurrentDirectory(),"Upload\\Files",filename);

                        var provider = new FileExtensionContentTypeProvider();
                        if(!provider.TryGetContentType(filepath,out var contentType))
                        {
                            contentType ="application/octet-stream";
                        }

                        var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
                        return File(bytes,contentType,Path.GetFileName(filepath));


    }

// Delete: api/file/5
[Authorize]
[HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFile(int id)
    {
             var showRoom = await showRoomRepository.GetAsync(id);

     if(showRoom == null)
     {
        return NotFound();
     }

     if(showRoom.Path != null) {
        try
        {
         string ExitingFile = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", showRoom.Path);
                System.IO.File.Delete(ExitingFile);   
        }
        catch (Exception ex)
        {
            
            throw ex;
        }

        await showRoomRepository.DeleteAsync(id);
        return NoContent();

     }

     return NoContent();

    }

}
