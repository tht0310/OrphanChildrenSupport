using OrphanChildrenSupport.Services.Models;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenProfileResource : EngineEntity
    {
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public int Age { get; set; }
        public string GuardianPhoneNumber { get; set; }
        public string GuardianName { get; set; }
        public string DetailAddress { get; set; }
        public string PublicAddress { get; set; }
        public string Circumstance { get; set; }
        public ChildrenProfileStatus Status { get; set; }
        public ICollection<ChildrenProfileSupportCategoryResource> ChildrenProfileSupportCategories { get; set; }
    }
}
