using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            catch (Exception e)
            {
                await Task.CompletedTask;
            }
        }
    }
}
