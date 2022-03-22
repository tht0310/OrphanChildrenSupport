using OrphanChildrenSupport.Services.Models;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenProfileResponse : EngineEntity
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
        public string ImagePath { get; set; }
        public ChildrenProfileStatus Status { get; set; }
        public ICollection<ChildrenProfileSupportCategoryResponse> ChildrenProfileSupportCategories { get; set; }
    }
}
