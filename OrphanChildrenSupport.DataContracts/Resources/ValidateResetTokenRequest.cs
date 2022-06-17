using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class ValidateResetTokenRequest
    {
        [Required]
        public string Token { get; set; }
    }
}