using System;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Infrastructure.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(OrphanChildrenSupportDbContext context)
        {
            try
            {
                context.Database.EnsureCreated();
                await context.SaveChangesAsync();
                await Task.CompletedTask;
            }
            catch (Exception)
            {
                await Task.CompletedTask;
            }
        }
    }
}
