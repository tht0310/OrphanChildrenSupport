using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using OrphanChildrenSupport.Services.Contracts;

namespace OrphanChildrenSupport.Services
{
    public class EmailService : IEmailService
    {
        public void Send(string to, string subject, string html, string from = null)
        {

            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(from ?? "support@forthechildren.com"));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("forthechildrenwebsite@gmail.com", "msqnzdutsnncnmru");
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
