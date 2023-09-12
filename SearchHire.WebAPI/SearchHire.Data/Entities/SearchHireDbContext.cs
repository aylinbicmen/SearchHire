using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Entities
{
    public class SearchHireDbContext : DbContext
    {
        public SearchHireDbContext(DbContextOptions<SearchHireDbContext> options) : base(options) 
        {
            
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<User> Users  { get; set; }
        public DbSet<Post> Posts  { get; set; }
        public DbSet<Province> Province  { get; set; }
        public DbSet<Specialty> Specialties  { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
