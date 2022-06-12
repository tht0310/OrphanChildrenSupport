using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrphanChildrenSupport.Infrastructure.Data;
using OrphanChildrenSupport.Services;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Tools;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System.Reflection;

namespace OrphanChildrenSupport.IoC.Configuration.DI
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureBusinessServices(this IServiceCollection services, IConfiguration configuration)
        {
            if (services != null)
            {
                services.AddTransient<IChildrenProfileService, ChildrenProfileService>();
                services.AddTransient<ISupportCategoryService, SupportCategoryService>();
                services.AddTransient<IChildrenProfileSupportCategoryService, ChildrenProfileSupportCategoryService>();
                services.AddTransient<IDonationService, DonationService>();
                services.AddTransient<IDonationDetailService, DonationDetailService>();
                services.AddTransient<IFavoriteService, FavoriteService>();
                services.AddTransient<IReportService, ReportService>();
                services.AddTransient<IReportDetailService, ReportDetailService>();
                services.AddTransient<IReportFieldCategoryService, ReportFieldCategoryService>();
                services.AddTransient<INotificationService, NotificationService>();
                services.AddTransient<IChangelogService, ChangelogService>();
                services.AddTransient<IChildrenProfileImageService, ChildrenProfileImageService>();
            }
        }

        public static void ConfigureHelperServices(this IServiceCollection services, IConfiguration configuration)
        {
            if (services != null)
            {
                services.AddScoped<IHttpContextHelper, HttpContextHelper>();
            }
        }

        public static void ConfigureRepositoryServices(this IServiceCollection services)
        {
            if (services != null)
            {
            }
        }

        public static void ConfigureMappings(this IServiceCollection services)
        {
            if (services != null)
            {
                //Automap settings
                services.AddAutoMapper(Assembly.GetExecutingAssembly());
            }
        }

        public static void ConfigureDbContexts(this IServiceCollection services, IConfiguration configuration)
        {
            if (services != null)
            {
                //DbContext settings
                services.AddControllersWithViews();
                services.AddDbContext<OrphanChildrenSupportDbContext>(options =>
                {
                    options.UseSqlServer(configuration.GetConnectionString("OrphanChildrenSupportConnection"));
                    options.EnableSensitiveDataLogging();
                }
                       , ServiceLifetime.Transient);
            }
        }
    }
}
