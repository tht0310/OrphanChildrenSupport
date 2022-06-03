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
        public DbSet<ChildrenProfile> ChildrenProfiles { get; set; }
        public DbSet<SupportCategory> SupportCategories { get; set; }
        public DbSet<ChildrenProfileSupportCategory> ChildrenProfileSupportCategories { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<DonationDetail> DonationDetails { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportDetail> ReportDetails { get; set; }
        public DbSet<ReportFieldCategory> ReportFieldCategories { get; set; }
        public DbSet<Notification> ChildrenProfileImages { get; set; }
        public DbSet<Changelog> Changelogs { get; set; }
        public DbSet<Account> Accounts { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                    => optionsBuilder.LogTo(Console.WriteLine);
        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            builder.Entity<ChildrenProfile>().ToTable("ChildrenProfile");
            builder.Entity<SupportCategory>().ToTable("SupportCategory");
            builder.Entity<ChildrenProfileSupportCategory>().ToTable("ChildrenProfileSupportCategory");
            builder.Entity<Donation>().ToTable("Donation");
            builder.Entity<DonationDetail>().ToTable("DonationDetail");
            builder.Entity<ChildrenProfileImage>().ToTable("ChildrenProfileImage");
            builder.Entity<Favorite>().ToTable("Favorite");
            builder.Entity<Report>().ToTable("Report");
            builder.Entity<ReportDetail>().ToTable("ReportDetail");
            builder.Entity<ReportFieldCategory>().ToTable("ReportFieldCategory");
            builder.Entity<Notification>().ToTable("Notification");
            builder.Entity<Changelog>().ToTable("Changelog");
            builder.Entity<Account>().ToTable("Account");
        }
    }
}
