using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.Services.Models
{
    public class ChildrenProfile : EngineEntity
    {
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string GuardianPhoneNumber { get; set; }
        public string GuardianName { get; set; }
        public string DetailAddress { get; set; }
        public string PublicAddress { get; set; }
        public string Circumstance { get; set; }
        public string ImagePath { get; set; }
        public ICollection<ChildrenSupportCategory> ChildrenSupportCategories { get; set; }
    }
}
