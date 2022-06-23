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
        public int Age { get; set; }
        public string GuardianPhoneNumber { get; set; }
        public string GuardianName { get; set; }
        public string DetailAddress { get; set; }
        public string PublicAddress { get; set; }
        public string Circumstance { get; set; }
        public ChildrenProfileStatus Status { get; set; }
        public ICollection<ChildrenProfileSupportCategory> ChildrenProfileSupportCategories { get; set; }
        public ICollection<Favorite> Favorites { get; set; }
        public ICollection<ChildrenProfileImage> ChildrenProfileImages { get; set; }
        public ICollection<Donation> Donations { get; set; }

    }
}
