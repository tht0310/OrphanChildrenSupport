using OrphanChildrenSupport.Services.Models;
using System;
using System.ComponentModel.DataAnnotations;

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
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
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
        public bool IsActive { get; set; }
    }
}