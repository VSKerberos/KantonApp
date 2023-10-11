using AutoMapper;

namespace API;
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Job,CreateJobDto>().ReverseMap();
        CreateMap<Job,GetJobDto>().ReverseMap();
        CreateMap<Director,GetDirectorDto>().ReverseMap();
        CreateMap<Director,CreateDirectorDto>().ReverseMap();
        CreateMap<UsefulLink,CreateLinkDto>().ReverseMap();
        CreateMap<UsefulLink,GetLinkDto>().ReverseMap();
        CreateMap<Contact,CreateContactFormDto>().ReverseMap();
        CreateMap<Contact,GetContactFormDto>().ReverseMap();



        

        
    }

}
