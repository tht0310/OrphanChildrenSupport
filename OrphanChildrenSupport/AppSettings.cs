
namespace OrphanChildrenSupport
{
    public class AppSettings
    {
        public static AppSettings Default { get; }

        public AppSettings()
        {
        }

        static AppSettings()
        {
            Default = new AppSettings();
        }

        public bool IsDevelopment => Program.EnvironmentName == "Development";
    }
}