using Microsoft.EntityFrameworkCore;

namespace API;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }
   // public DbSet<AppUser> Users { get; set; }
    public DbSet<Job> Jobs { get; set; }
     public DbSet<Director> Directors { get; set; }
     public DbSet<UsefulLink> UsefulLinks { get; set; }
     public DbSet<Contact> Contacts { get; set; }
    // public DbSet<ShowRoom> ShowRooms { get; set; }
     public DbSet<Island> Islands { get; set; }
     public DbSet<IslandDirector> IslandDirectors { get; set; }



    

}
