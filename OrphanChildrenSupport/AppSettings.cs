
namespace OrphanChildrenSupport
{
    public class AppSettings
    {
        public static AppSettings Default { get; }

        public AppSettings()
        {
            Secret = "1f093131-2cea-4f87-a32e-d1f2cfb98f30";
            RefreshTokenTTL = 2;
            EmailFrom = "info@dotnet-signup-verification-api.com";
            SmtpHost = "smtp.ethereal.email";
            SmtpPort = 587;
            SmtpUser = "alvis.mayer26@ethereal.email";
            SmtpPass = "VYXXH12D5CJ2xPqdUw";
        }

        static AppSettings()
        {
            Default = new AppSettings();
        }

        // refresh token time to live (in days); inactive tokens are
        // automatically deleted from the database after this time
        public string Secret { get; set; }
        public int RefreshTokenTTL { get; set; }
        public string EmailFrom { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
        public bool IsDevelopment => Program.EnvironmentName == "Development";
    }
}