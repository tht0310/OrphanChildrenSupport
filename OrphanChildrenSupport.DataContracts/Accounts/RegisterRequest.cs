using System;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class RegisterRequest
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public bool Gender { get; set; }
        [Required]
        public DateTime DOB { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        [Required]
        public string DetailAddress { get; set; }
        [Required]
        public string PublicAddress { get; set; }
        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        [Range(typeof(bool), "true", "true")]
        public bool AcceptTerms { get; set; }
    }
}