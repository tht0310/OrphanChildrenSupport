using System;
using OrphanChildrenSupport.Services.Models;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class AccountResponse : EngineEntity
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool IsVerified { get; set; }
    }
}