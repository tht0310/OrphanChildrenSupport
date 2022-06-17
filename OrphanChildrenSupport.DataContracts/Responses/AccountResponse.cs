using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts.Responses
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
        public bool IsActive { get; set; }
        public ICollection<Favorite> Favorites { get; set; }
    }
}