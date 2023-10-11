namespace API;
using Microsoft.EntityFrameworkCore;
public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(opt=>
                {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                });

                services.AddCors();
                services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
                services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));  // scoped http level of request
                services.AddScoped<IJobRepository,JobsRepository>();  // scoped http level of request
                services.AddScoped<IDirectorRepository,DirectorsRepository>();
                services.AddScoped<ILinkRepository,LinksRepository>();
                services.AddScoped<IContactRepository,ContactRepository>();  


                return services;
    }

}
