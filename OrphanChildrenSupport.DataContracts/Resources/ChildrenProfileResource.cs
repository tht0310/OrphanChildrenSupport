using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenProfileResource : EngineEntity
    {
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public string Circumstance { get; set; }
        public string ImagePath { get; set; }
        public ICollection<SupportCategory> SupportCategories { get; set; }
    }
}
