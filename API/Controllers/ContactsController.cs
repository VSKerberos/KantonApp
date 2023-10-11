using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;


[ApiController]
[Route("api/[controller]")] // /api/contacts
public class ContactsController : ControllerBase
{
    private readonly IContactRepository contactRepository;
    private readonly IMapper mapper;

    public ContactsController(IContactRepository contactRepository, IMapper mapper)
    {
        this.contactRepository = contactRepository;
        this.mapper = mapper;
    }

        
// POST: api/Contacts
[HttpPost]
public async Task<ActionResult<CreateContactFormDto>> PostContact(CreateContactFormDto createContact)
{
     var contact = mapper.Map<Contact>(createContact);
     await contactRepository.AddAsync(contact);
     return CreatedAtAction("GetContact", new {id = contact.Id},createContact);
}

// GET: api/Contacts/5
[HttpGet("{id}")]
public async Task<ActionResult<GetContactFormDto>> GetContact(int id)
{
     var contactForm = await contactRepository.GetAsync(id);

     if(contactForm == null)
     {
        return NotFound();
     }

    var dtoContact = mapper.Map<GetContactFormDto>(contactForm);
     return dtoContact;
}

// GET: api/Contacts
[HttpGet]
public async Task<ActionResult<IEnumerable<GetContactFormDto>>> GetContacts(){

    var contacts =  await contactRepository.GetAllAsync();
    var records = mapper.Map<List<GetContactFormDto>>(contacts);
    return Ok(records);   
}

// Put: api/Contacts/5
[HttpPut("{id}")]
public async Task<ActionResult> PutContact(int id, GetContactFormDto updateContactFormDto)
{
    if(id != updateContactFormDto.Id)
    {
        return BadRequest("Invalid Record Id");
    }

    var updatedContact = await contactRepository.GetAsync(id);

    if(updatedContact == null)
    {
        return NotFound();
    }

        
    updatedContact.Name = updateContactFormDto.Name;
    updatedContact.Surname = updateContactFormDto.Surname;
    updatedContact.Email = updateContactFormDto.Email;
    updatedContact.Description = updateContactFormDto.Description;

   
    try
    {
        await contactRepository.UpdateAsync(updatedContact);
    }
    catch (DbUpdateConcurrencyException)
    {
        if(!await ContactFormExists(id))
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
public async Task<IActionResult> DeleteContact(int id)
{
    if(!await ContactFormExists(id))
    return NotFound();
    
    await contactRepository.DeleteAsync(id);
    return NoContent();
}



private async Task<bool> ContactFormExists(int id)
{
    return await contactRepository.Exists(id);
}


}
