using System;
using System.ComponentModel.DataAnnotations;
using OrphanChildrenSupport.Services.Models;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class CreateRequest
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public bool Gender { get; set; }
        [Required]
        public DateTime DOB { get; set; }
        [Required]
        public string GuardianPhoneNumber { get; set; }
        [Required]
        public string DetailAddress { get; set; }
        [Required]
        public string PublicAddress { get; set; }
        [Required]
        [EnumDataType(typeof(Role))]
        public string Role { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}