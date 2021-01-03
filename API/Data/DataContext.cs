
using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AppUser> Users { get; set; }

//        public DbSet<Attribute> Attributes { get; set; }
//         public DbSet<CacheMarker> CacheMarkers { get; set; }
//         public DbSet<ContactUs> ContactUss { get; set; }
//         public DbSet<Individual> Individuals { get; set; }
//         public DbSet<Log> Logs { get; set; }
//         public DbSet<OperationalProfile> OperationalProfiles { get; set; }
//         public DbSet<Population> Populations { get; set; }
//         public DbSet<Project> Projects { get; set; }
//         public DbSet<ProjectProfile> ProjectProfiles { get; set; }
//         public DbSet<ProjectTeam> ProjectsTeams { get; set; }
// //         public DbSet<RandomCache> RandomCaches { get; set; }
//         public DbSet<TeamMember> TeamMembers { get; set; }
//         public DbSet<User> Users { get; set; }
//         public DbSet<Value> Values { get; set; }
    }
}