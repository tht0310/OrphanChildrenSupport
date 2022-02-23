using OrphanChildrenSupport.Services.Models;
using System;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenProfileResource : EngineEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime? DOB { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public bool IsNeedToBeAdopted { get; set; }
    }
}
