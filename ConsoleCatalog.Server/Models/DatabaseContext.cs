using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Server.Models
{
    public class DatabaseContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<SubObjective> SubObjectives { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }
    }
}
