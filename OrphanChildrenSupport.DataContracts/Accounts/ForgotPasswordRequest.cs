using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}