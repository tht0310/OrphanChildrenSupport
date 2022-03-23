using Microsoft.EntityFrameworkCore;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Linq;

namespace OrphanChildrenSupport.Infrastructure.Data
{
    public class OrphanChildrenSupportDbContext : DbContext
    {
        public OrphanChildrenSupportDbContext()
        {
        }

        public OrphanChildrenSupportDbContext(DbContextOptions options) : base(options)
        { }
        public DbSet<PersonalProfile> PersonalProfiles { get; set; }
        public DbSet<ChildrenProfile> ChildrenProfiles { get; set; }
        public DbSet<SupportCategory> SupportCategories { get; set; }
        public DbSet<Support> Supports { get; set; }
        public DbSet<SupportDetail> SupportDetails { get; set; }
        public DbSet<Account> Accounts { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                    => optionsBuilder.LogTo(Console.WriteLine);
        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            builder.Entity<PersonalProfile>().ToTable("PersonalProfile");
            builder.Entity<ChildrenProfile>().ToTable("ChildrenProfile");
            builder.Entity<SupportCategory>().ToTable("SupportCategory");
            builder.Entity<Support>().ToTable("Support");
            builder.Entity<SupportDetail>().ToTable("SupportDetail");
            builder.Entity<Account>().ToTable("Account");
        }
    }
}
