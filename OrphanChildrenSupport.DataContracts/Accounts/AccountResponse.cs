using OrphanChildrenSupport.Services.Models;
using System;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class AccountResponse : EngineEntity
    {
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public bool IsVerified { get; set; }
    }
}